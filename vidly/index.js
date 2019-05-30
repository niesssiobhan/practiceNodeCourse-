'use strict';

const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {

});

app.get('/api/genres/:id', (req, res) => {

});

app.post('/api/genres', (req, res) => {

});

app.put('/api/genres/:id', (req, res) => {

});

app.delete('/api/genres/:id', (req, res) => {
 
});

function validateGenre(genre) {
  const schema = {
    name = Joi.string().min(3).require()
  };
  return validate (genre, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));