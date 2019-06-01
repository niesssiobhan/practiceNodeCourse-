'use strict';

const Joi = require('joi');
const mongoose = require('mongoose');

const Rental = mongoose.model('Rental', new mongoose.Schema({ // a new Schema is being used instead of reusing the customer Schema because it could have many properties to it that and we probably wouldnt need all of them
  customer: { 
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      },
      isGold: {
        type: Boolean,
        default: false
      },
      phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      }      
    }),  
    required: true
  },
  movie: {
    type: new mongoose.Schema({ // this is a custom Schema, again we arent reusing the movies Schema because it can have many properties that in here we wouldnt need
      title: {
        type: String,
        required: true,
        trim: true, 
        minlength: 5,
        maxlength: 255
      },
      dailyRentalRate: { // this is going to be used to help calculate the rental fee
        type: Number, 
        required: true,
        min: 0,
        max: 255
      }   
    }),
    required: true
  },
  dateOut: { 
    type: Date, 
    required: true,
    default: Date.now
  },
  dateReturned: { 
    type: Date // the value for this would be set when the customer returns the movie
  },
  rentalFee: { 
    type: Number, 
    min: 0 // this is set to 0 so that it cant be a negative number
  }
}));

function validateRental(rental) {
  const schema = {
    // these are the properties that the client sends to the server
    customerId: Joi.string().required(),
    movieId: Joi.string().required()
  };

  return Joi.validate(rental, schema);
}

exports.Rental = Rental; 
exports.validate = validateRental;