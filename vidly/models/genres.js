'use strict';

const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({ // this was created so that it can be used in multiple places, for intsance in the movies module
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
})

const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  };
  return Joi.validate (genre, schema);
}

module.exports.genreSchema = genreSchema;
module.exports.Genre = Genre;
module.exports.validate = validateGenre;