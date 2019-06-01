'use strict';

const {Rental, validate} = require('../models/rental'); 
const {Movie} = require('../models/movie'); 
const {Customer} = require('../models/customers'); 
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();

Fawn.init(mongoose);

// rememner that this is the end point to get the list of rentals
router.get('/', async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut'); // this is being sorted by the date the rental went out in a decending order
  res.send(rentals);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId); // making sure that the customer is valid
  if (!customer) return res.status(400).send('Invalid customer.');

  const movie = await Movie.findById(req.body.movieId); // validating the movie
  if (!movie) return res.status(400).send('Invalid movie.');

  if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.'); 

  let rental = new Rental({ 
    customer: {
      _id: customer._id,
      name: customer.name, 
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });

  try {
    // new Fawn.Task uses a collection to make two face commits, so this collection will show up oin the database
    new Fawn.Task() // all of the following operations will be treated as a unit (transaction)
      .save('rentals', rental) // we are passing in the name of the collection and then the name of the new object
      .update('movies', {_id: movie._id}, {
        $inc: {numberInStock: -1}
      })
      .run(); // if you dont call run then none of the above operations will be performed (this represents the transaction)
      // after .save has been done then .update will happen. after they have successfully been done then the collection from new Fawn.Task will be delted from the database
  
    res.send(rental); // this is sent to the client
  }
  catch(ex) {
    res.status(500).send('something failed') // the 500 error means that there was an internal server error
  }
});

router.get('/:id', async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental) return res.status(404).send('The rental with the given ID was not found.');

  res.send(rental);
});

module.exports = router; 