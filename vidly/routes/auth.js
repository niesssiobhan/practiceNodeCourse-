'use strict';

const bcrypt = require('bcrypt');
const _ = require('lodash'); // the _ is by convetion but you could still call it lodash
const Joi = require('joi');
const {User}= require('../models/user.js');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const {error} = validate(req.body); 
  if(error) return res.status(400).send(error.details[0].message);

  // here we have the user object
  let user = await User.findOne({email: req.body.email});
  if (user) return res.status(400).send('Invalid email or password');

  const validPassword = await bcrypt.compare(req.body.password, user.password); // the compare method is being called because the salt from hashing the password (user.password) is going to be used again to rehash the plain text password (req.body.password) and then compare the two to see if they are equal 
  if(!validPassword) return res.status(400).send('Invalid email or password');

  const token = user.generateAuthToken();
  res.send(token);
});



function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(), // we call the email method to make sure it is a valid email
    password: Joi.string().min(5).max(255).required() // this is 255 because that is the max for the password in plain text
  };
  return Joi.validate (user, schema);
}

module.exports = router;
module.exports.validate = validate;