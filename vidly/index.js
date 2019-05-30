'use strict';

const debug = require('debug')('app:startup');

const express = require('express');
const app = express();
const config = require('config'); 
const morgan = require('morgan');
const helmet = require('helmet');
const logger = require('./middleware/logger.js');
const authentication = require('./middleware/auth.js');
const genres = require('./routes/genres.js');
const home = require('./routes/home.js');

app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded( {extended: true} ));
app.use(helmet());
app.use('/api/genres', genres); // this will tell the server to access the courses.js file for anything that has the /api/courses route 
app.use('/', home);

app.use(logger);
app.use(authentication);

if(app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('Morgan is enabled'); // using debug is like using console.log() but it is shorter and more self explainitory for what it is that you are looking for 
};

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));