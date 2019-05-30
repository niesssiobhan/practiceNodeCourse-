'use strict';

const express = require('express');
const router = express.Router();
const Joi = require('joi');

const courses = [
  {id: 1, name: 'course1'}, // you can more than 2 properties 
  {id: 2, name: 'course2'},
  {id: 3, name: 'course3'} 
];

// this is how you would go about trying to access a specific course 
router.get('/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id)); // this is a booloean answer to if the response is the correct couse that we are looking for. The return will be parsed into an integer
  if(!course) return res.status(404).send('The course was not found');
  res.send(course);
});

router.get('/', (req, res) => {
  res.send(courses); // this is going to return the courses array from above
});

router.put('/:id', (req, res) => {
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

router.post('/', (req, res) => {

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

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required()
  };
  return Joi.validate(course, schema);
}

router.delete('/:id', (req, res) => {
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

module.exports = router;