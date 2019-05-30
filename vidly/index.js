'use strict';

// these 3 lines below is how you build a web server
const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json()); // this returns a middleware function

app.get('/', (req, res) => {
  res.send('It is working!')
});

app.get('/api/genres/:id', (req, res) => {

});

app.post('/api/genres', (req, res) => {
  const {error} = validateCourse(req.body); 
  if(error) return res.status(400).send(result.error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };

  courses.push(course); // this is pushing it into the courses array
  res.send(course); // this is returning the object in the body of the response 
});

app.put('/api/genres/:id', (req, res) => {

});

app.delete('/api/genres/:id', (req, res) => {
 
});

function validateGenre(genre) {
  const schema = {
    name = Joi.string().min(3).required() 
  };
  return validate (genre, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));