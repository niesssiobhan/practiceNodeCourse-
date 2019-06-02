'use strict';

const error = require('./middleware/error.js');
const debug = require('debug')('app:startup');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi); // objectid is a method on the Joi object
// this Joi.objectId is also going to help handle an unhanledPromosieRejection warning   that you could get in your terminal
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const config = require('config'); 
const morgan = require('morgan');
const helmet = require('helmet');
const logger = require('./middleware/logger.js');
const authentication = require('./middleware/auth.js');
// const genres = require('./routes/genres.js');
const genres = require('./routes/genres-mongodb.js');
const customers = require('./routes/customers.js')
const movies = require('./routes/movies.js');
const rentals = require('./routes/rentals.js');
const users = require('./routes/users.js');
const auth = require('./routes/auth.js');
const home = require('./routes/home.js');

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1);
}

app.set('view engine', 'pug');

mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('connected to mongodb'))
  .catch(err => console.error('could not connect to mongodb'));

// here we are applying middleware functions
app.use(express.json()); 
app.use(express.urlencoded( {extended: true} ));
app.use(helmet());
app.use('/api/genres', genres); // this will tell the server to access the courses.js file for anything that has the /api/courses route 
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals); 
app.use('/api/users', users);
app.use('api/auth', auth);
app.use('/', home);
// we have this 500 error handling function in the central state of our application because we can manage it in one place instead of going through mulitple files and making changes there (the function itself is in the middleware folder)
// we are not calling the function but calling a reference to the function 
app.use(error);

app.use(logger);
app.use(authentication);

if(app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('Morgan is enabled'); // using debug is like using console.log() but it is shorter and more self explainitory for what it is that you are looking for 
};

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));