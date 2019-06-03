'use strict';

const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  if(!req.body.customerId) return res.status(400).send('customer id not provided');
  if(!req.body.movieId) return res.status(400).send('movie id not provided');

  res.status(401).send('Unauthorized');
});

module.exports = router;