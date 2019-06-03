'use strict';

const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./genre');

const Movie = mongoose.model('Movies', new mongoose.Schema({ // this is the movie Schema
  // each below is a complex object
  title: {
    type: String,
    required: true,
    trim: true, // this removes any padding around the strings, like the title of the movie
    minlength: 5,
    maxlength: 255
  },
  genre: { 
    type: genreSchema,  
    required: true
  },
  numberInStock: { 
    type: Number, 
    required: true,
    min: 0, // this is set so that there can be no negative numbers 
    max: 255
  },
  dailyRentalRate: { 
    type: Number, 
    required: true,
    min: 0,
    max: 255
  }
}));

function validateMovie(movie) {
  const schema = { //this is what the client sends us (it is the input to the api)
    title: Joi.string().min(5).max(50).required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required()
  };

  return Joi.validate(movie, schema);
}

exports.Movie = Movie; 
exports.validate = validateMovie;