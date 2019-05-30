'use strict';

// the list below are all of the dependencies that are being used throughout the application
const debug = require('debug')('app:startup');
// const dbDebugger = require('debug')('app:db');
const config = require('config'); 
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./logger.js');
const authentication = require('./auth.js');
const express = require('express');
const app = express(); // this represents your application

app.set('view engine', 'pug'); // this is a templating engine, Express will internally load the pug module so it doesnt have to be required

app.use(express.json()); // this is adding in a piece of middleware
app.use(express.urlencoded( {extended: true} )); // this way you are able to pass arrays and complex objects using the urlencoded format
app.use(express.static('public'));
app.use(helmet());

// configuration
// the result will very from the development.json or the production.json file depending on if you run: export NODE_ENV development or export NODE_ENV production in the terminal
// console.log(`Application Name: ${config.get('name')}`); 
// console.log(`Mail Server Name: ${config.get('mail.host')}`);  
// console.log(`Mail Password: ${config.get('mail.password')}`);

if(app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('Morgan is enabled'); // using debug is like using console.log() but it is shorter and more self explainitory for what it is that you are looking for 
};

// dbDebugger('Connected to the database');  

app.use(logger);
app.use(authentication);

const courses = [
  {id: 1, name: 'course1'}, // you can more than 2 properties 
  {id: 2, name: 'course2'},
  {id: 3, name: 'course3'} 
];

// the '/' represents the root oof the website
app.get('/', (req, res) => {
  res.render('index', {title: 'My Express App', message: 'Hello Teagan!'});
});

// here we are using a query so that we can provide addtional data from the server. and as you can see you are able to use multiple params in the url route 
// here the year and month are both properties 
// app.get('/api/posts/:year/:month', (req, res) => {
//   res.send(req.query);
// });

const port = process.env.PORT || 3000; // this means that if there isnt already a port that is being used then we are going to use port 3000
app.listen(port, () => console.log(`Listening on port ${port}`));