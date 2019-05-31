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
  res.send(genres);
});

router.get('/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id)); // this is a booloean answer to if the response is the correct couse that we are looking for. The return will be parsed into an integer
  if(!genre) return res.status(404).send('The genre was not found');
  res.send(genre);
});

router.get('/', (req, res) => {
  res.send(genres); // this is going to return the genres array from above
});

router.post('/', (req, res) => {
  const {error} = validateGenre(req.body); 
  if(error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };

  genres.push(genre); // this is pushing it into the genres array
  res.send(genre); // this is returning the object in the body of the response 
});

router.put('/:id', (req, res) => {
  // look up the genre
  // if not exsiting then need to return 404
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if(!genre) return res.status(404).send('The cousre with that ID was not found');

  const {error} = validategenre(req.body); //this is like getting result.error
  // validate
  // if invalid return 400 - bad request
  
  if(error) return res.status(400).send(error.details[0].message);

  // update genre 
  genre.name = req.body.name;

  //return the updated genre 
  res.send(genre);
});

router.delete('/:id', (req, res) => {
  // look up the genre
  // not existing, return 404
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if(!genre) return res.status(404).send('The cousre with that ID was not found');

  // delete
  const index = genres.indexOf(genre);
  //using the splice method to remove the genre from the genres array
  genres.splice(index, 1);
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