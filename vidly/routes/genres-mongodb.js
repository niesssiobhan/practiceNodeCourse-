'use strict';

const auth = require('../middleware/auth.js');
const admin = require('../middleware/admin.js');
const {Genre, validate}= require('../models/genre.js');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    // throw new Error('could not get the genres');
    const genres = await Genre.find().sort('name'); // this is going to find all of the genres and then sort them by name
    res.send(genres);
});

router.get('/:id',validateObjectId, async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if(!genre) return res.status(404).send('The genre was not found');
  res.send(genre);
});

// we are passing auth to be one of the arguments because it refers to the middleware function
// async (req, res) is a route handler 
router.post('/', auth, async (req, res) => { 
  const {error} = validate(req.body); 
  if(error) return res.status(400).send(error.details[0].message);

  let genre = new Genre ({name: req.body.name}); 
  genre = await genre.save(); // this is going to save it to the database

  res.send(genre); // this is returning the object in the body of the response 
});

router.put('/:id', [auth, validateObjectId], async (req, res) => {
  const {error} = validate(req.body); //this is like getting result.error
  if(error) return res.status(400).send(error.details[0].message); // validating 

  const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, {
    new: true // this is to get the updated object from the database
  });
  // if not exsiting then need to return 404
  if(!genre) return res.status(404).send('The genre with that ID was not found');  

  //return the updated genre 
  res.send(genre);
});

// only the admin can delete a documnet in the database
router.delete('/:id', [auth, admin], async (req, res) => { // here we are passing in both the auth and admon middleware functions and they will happen in sequence (first auth and then admin)
  const genre = await Genre.findByIdAndRemove(req.params.id)

  if(!genre) return res.status(404).send('The genre with that ID was not found');

  // return the same genre 
  res.send(genre);
});

module.exports = router;