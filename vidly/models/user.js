'use strict';

const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({ 
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true // this is so that there cant be two users with the same email that is stored in mongodb
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024 // this is longer because we are going to want to hash the password
  },
  isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey')); // this line is how you generate a token
  return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(), // we call the email method to make sure it is a valid email
    password: Joi.string().min(5).max(255).required() // this is 255 because that is the max for the password in plain text
  };
  return Joi.validate (user, schema);
}

module.exports.User = User;
module.exports.validate = validateUser;