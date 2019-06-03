'use strict';

const joi = require('Joi');
const validate = require('../middleware/validate.js');
const {Rental} = require('../models/rentals.js');
const {Movie} = require('../models/movies.js');
const auth = require('../middleware/auth.js');
const express = require('express');
const router = express.Router();

router.post('/', [auth, validate(validateReturn)], async (req, res) => {
  const rental = await Rental.lookup(req.body.cutomerId, req.body.movieId);

  if(!rental) return res.status(404).send('rental not found');

  if(rental.dateReturned) return res.status(400).send('return already processed');

  rental.return();
  await rental.save();

  await Movie.update({_id: rental.movie._id}, {
    $inc: {numerInStock: 1}
  });

  return res.send(rental);
});

function validateReturn(req) {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  };

  return Joi.validate (genre, schema);
}

module.exports = router;