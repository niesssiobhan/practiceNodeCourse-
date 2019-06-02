'use strict';

const bcrypt = require('bcrypt');
const _ = require('lodash'); // the _ is by convetion but you could still call it lodash
const {User, validate}= require('../models/user.js');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const {error} = validate(req.body); 
  if(error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({email: req.body.email});
  if (user) return res.status(400).send('User already registered');

  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10); // in your terminal ythis will show you what the salt is 
  user.password = await bcrypt.hash(user.password, salt); // in your termial this will show you the password but with the salt included
  await user.save();
  
  const token = user.generateAuthToken();
  // what is in the array is what will be returned, nothing else and it will give you a new object as well
  // here will now have a header for the token and we are prefixing it with a x- with a name of auth-token (this is the first argument)
  // the second argument is the value which is the token
  res.header('x-auth-token', token.send(_.pick(user, ['_id', 'name', 'email']))); // this is returning the object in the body of the response 
});

module.exports = router;