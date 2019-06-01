'use strict';

const debug = require('debug')('app:startup');

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
const home = require('./routes/home.js');

app.set('view engine', 'pug');

mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('connected to mongodb'))
  .catch(err => console.error('could not connect to mongodb'));

app.use(express.json());
app.use(express.urlencoded( {extended: true} ));
app.use(helmet());
app.use('/api/genres', genres); // this will tell the server to access the courses.js file for anything that has the /api/courses route 
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/', home);

app.use(logger);
app.use(authentication);

if(app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('Morgan is enabled'); // using debug is like using console.log() but it is shorter and more self explainitory for what it is that you are looking for 
};

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));