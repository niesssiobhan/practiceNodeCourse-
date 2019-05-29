'use strict';

const express = require('express');
const app = express(); // this represent your application

// the '/' represents the root oof the website
app.get('/', (req, res) => {
  res.send('Hello Teagan');
});

app.get('/api/courses', (req, res) => {
  res.send([1, 2, 3]);
});

// this is how you would go about trying to access a specific course 
app.get('/api/courses/:id', (req, res) => {
  res.send(req.params.id); // so in your browser if you went to look for course number 1 then you would enter localhost:3000/api/courses/1 (or whatever course you are looking for)
});

// here we are using a query so that we can provide addtional data from the server. and as you can see you are able to use multiple params in the url route 
// here the year and month are both properties 
app.get('/api/posts/:year/:month', (req, res) => {
  res.send(req.query);
});

const port = process.env.PORT || 3000; // this means that if there isnt already a port that is being used then we are going to use port 3000
app.listen(port, () => console.log(`Listening on port ${port}`));