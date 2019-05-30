'use strict';

const express = require('express');
const router = express.Router();
const Joi = require('joi');

const genres = [
  {id: 1, name: 'Action'}, // you can more than 2 properties 
  {id: 2, name: 'Horror'},
  {id: 3, name: 'Romance'} 
];

router.get('/', (req, res) => {
  res.send(gnres);
});

router.get('/api/genres/:id', (req, res) => {
  
});

router.post('/api/genres', (req, res) => {
  const {error} = validateGenre(req.body); 
  if(error) return res.status(400).send(result.error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };

  genres.push(genre); // this is pushing it into the courses array
  res.send(genre); // this is returning the object in the body of the response 
});

router.put('/api/genres/:id', (req, res) => {

});

router.delete('/api/genres/:id', (req, res) => {
 
});

function validateGenre(genre) {
  const schema = {
    name = Joi.string().min(3).require()
  };
  return Joi.validate (genre, schema);
}

module.exports = router;