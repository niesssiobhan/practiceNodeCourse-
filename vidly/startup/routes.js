'use strict';

const express = require('express');

// const genres = require('../routes/genres.js');
const genres = require('../routes/genres-mongodb.js');
const customers = require('../routes/customers.js')
const movies = require('../routes/movies.js');
const rentals = require('../routes/rentals.js');
const users = require('../routes/users.js');
const auth = require('../routes/auth.js');
const returns = require('../routes/returns.js')
const error = require('../middleware/error.js');


module.exports = function(app) {
  // here we are applying middleware functions
  app.use(express.json()); 
  // app.use(express.urlencoded( {extended: true} ));
  // app.use(helmet());
  app.use('/api/genres', genres); // this will tell the server to access the courses.js file for anything that has the /api/courses route 
  app.use('/api/customers', customers);
  app.use('/api/movies', movies);
  app.use('/api/rentals', rentals); 
  app.use('/api/users', users);
  app.use('api/auth', auth);
  app.use('/api/returns', returns);
  app.use('/', home);
  // we have this 500 error handling function in the central state of our application because we can manage it in one place instead of going through mulitple files and making changes there (the function itself is in the middleware folder)
  // we are not calling the function but calling a reference to the function 
  app.use(error);

  // app.use(logger);
  // app.use(authentication);
}