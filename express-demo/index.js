'use strict';

const express = require('express');
const app = express(); // this represents your application

const courses = [
  {id: 1, name: 'course1'}, // you can more than 2 properties 
  {id: 1, name: 'course2'},
  {id: 1, name: 'course3'} 
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
  if(!course) res.status(404).send('The course was not found');
  res.send(course);
});

// here we are using a query so that we can provide addtional data from the server. and as you can see you are able to use multiple params in the url route 
// here the year and month are both properties 
app.get('/api/posts/:year/:month', (req, res) => {
  res.send(req.query);
});

const port = process.env.PORT || 3000; // this means that if there isnt already a port that is being used then we are going to use port 3000
app.listen(port, () => console.log(`Listening on port ${port}`));