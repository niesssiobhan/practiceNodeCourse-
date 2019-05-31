'use strict';

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

const Genre = mongoose.model('Genre', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
}));

router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name'); // this is going to find all of the genres and then sort them by name
  res.send(genres);
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if(!genre) return res.status(404).send('The genre was not found');
  res.send(genre);
});

router.post('/', async (req, res) => {
  const {error} = validateGenre(req.body); 
  if(error) return res.status(400).send(error.details[0].message);

  let genre = new Genre ({name: req.body.name}); 
  genre = await genre.save(); // this is going to save it to the database
  res.send(genre); // this is returning the object in the body of the response 
});

router.put('/:id', async (req, res) => {
  const {error} = validateGenre(req.body); //this is like getting result.error
  if(error) return res.status(400).send(error.details[0].message); // validating 

  const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, {
    new: true // this is to get the updated object from the database
  });
  // if not exsiting then need to return 404
  if(!genre) return res.status(404).send('The cousre with that ID was not found');  

  //return the updated genre 
  res.send(genre);
});

router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id)

  if(!genre) return res.status(404).send('The cousre with that ID was not found');

  // return the same genre 
  res.send(genre);
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  };
  return Joi.validate (genre, schema);
}

module.exports = router;