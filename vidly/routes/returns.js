'use strict';

const {Rental} = require('../models/rentals.js');
const auth = require('../middleware/auth.js');
const express = require('express');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  if(!req.body.customerId) return res.status(400).send('customer id not provided');
  if(!req.body.movieId) return res.status(400).send('movie id not provided');

  const rental = await Rental.findOne({
    'cutomer._id': req.body.cutomerId,
    'movie._id': req.body.movieId
  });
  if(!rental) return res.status(404).send('rental not found');

  if(rental.dateReturned) return res.status(400).send('return already processed');

  rental.dateReturned = new Date();
  await rental.save();

  return res.status(200).send('');
});

module.exports = router;