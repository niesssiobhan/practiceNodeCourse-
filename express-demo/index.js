'use strict';

// the list below are all of the dependencies that are being used throughout the application 
const Joi = require('joi');
const express = require('express');
const app = express(); // this represents your application

app.use(express.json()); // this is adding in a piece of middleware

const courses = [
  {id: 1, name: 'course1'}, // you can more than 2 properties 
  {id: 2, name: 'course2'},
  {id: 3, name: 'course3'} 
];

// the '/' represents the root oof the website
app.get('/', (req, res) => {
  res.send('Hello Teagan');
});

app.get('/api/courses', (req, res) => {
  res.send(courses); // this is going to return the courses array from above
});

// this is how you would go about trying to access a specific course 
app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id)); // this is a booloean answer to if the response is the correct couse that we are looking for. The return will be parsed into an integer
  if(!course) return res.status(404).send('The course was not found');
  res.send(course);
});

app.post('/api/courses', (req, res) => {

  const {error} = validateCourse(req.body); 
  if(error) return res.status(400).send(result.error.details[0].message);

  // const schema = {
  //   name: Joi.string().min(3).required()
  // };

  // const result = Joi.validate(req.body, schema); // this is going to return an object
  // console.log(result);
  
  // here we have some validation logic (400 means that it was a bad request)
  // if(!req.body.name || req.body.name.length < 3) {
  //   res.status(400).send('Name is required');
  //   return;
  // };

  // if(result.error) {
  //   res.status(400).send(result.error.details[0].message); // this is going to send the client a more readable and smaller error message. accessing only the first element in the details object sending out only that message property
  //   return;
  // }

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };

  courses.push(course); // this is pushing it into the courses array
  res.send(course); // this is returning the object in the body of the response 
});

// here we are using a query so that we can provide addtional data from the server. and as you can see you are able to use multiple params in the url route 
// here the year and month are both properties 
// app.get('/api/posts/:year/:month', (req, res) => {
//   res.send(req.query);
// });

app.put('/api/courses/:id', (req, res) => {
  // look up the course
  // if not exsiting then need to return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if(!course) return res.status(404).send('The cousre with that ID was not found');

  const {error} = validateCourse(req.body); //this is like getting result.error
  // validate
  // if invalid return 400 - bad request
  
  if(error) return res.status(400).send(error.details[0].message);

  // update course 
  course.name = req.body.name;

  //return the updated course 
  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required()
  };
  return Joi.validate(course, schema);
}

app.delete('/api/courses/:id', (req, res) => {
  // look up the course
  // not existing, return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if(!course) return res.status(404).send('The cousre with that ID was not found');

  // delete
  const index = courses.indexOf(course);
  //using the splice method to remove the course from the courses array
  courses.splice(index, 1);
  // return the same course 
  res.send(course);
});

const port = process.env.PORT || 3000; // this means that if there isnt already a port that is being used then we are going to use port 3000
app.listen(port, () => console.log(`Listening on port ${port}`));