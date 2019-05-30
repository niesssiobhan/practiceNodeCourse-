'use strict';

// all that you will end up wanting to have in this file is the start up code for the application 

// the list below are all of the dependencies that are being used throughout the application
const debug = require('debug')('app:startup');
// const dbDebugger = require('debug')('app:db');
const config = require('config'); 
const morgan = require('morgan');
const helmet = require('helmet');
// const Joi = require('joi'); // this is now in the courses.js file
const logger = require('./middleware/logger.js');
const authentication = require('./auth.js');
const courses = require('./routes/courses.js');
const home = require('./routes/home.js');
const express = require('express');
const app = express(); // this represents your application

app.set('view engine', 'pug'); // this is a templating engine, Express will internally load the pug module so it doesnt have to be required

app.use(express.json()); // this is adding in a piece of middleware
app.use(express.urlencoded( {extended: true} )); // this way you are able to pass arrays and complex objects using the urlencoded format
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses); // this will tell the server to access the courses.js file for anything that has the /api/courses route 
app.use('/', home);

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

// here we are using a query so that we can provide addtional data from the server. and as you can see you are able to use multiple params in the url route 
// here the year and month are both properties 
// app.get('/api/posts/:year/:month', (req, res) => {
//   res.send(req.query);
// });

const port = process.env.PORT || 3000; // this means that if there isnt already a port that is being used then we are going to use port 3000
app.listen(port, () => console.log(`Listening on port ${port}`));