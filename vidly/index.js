'use strict';

// const debug = require('debug')('app:startup');
const winston = require('winston');
const express = require('express');
const app = express();
// const morgan = require('morgan');
// const helmet = require('helmet');
// const logger = require('./middleware/logger.js');
// const authentication = require('./middleware/auth.js');
// const auth = require('./routes/auth.js');
// const home = require('./routes/home.js');

require('./startup/logging.js')();  
require('./startup/routes.js')(app); // the app referes to the express app
require('./startup/db.js')();
require('./startup/config.js')();
require('./startup/validation.js')();
require('./startup/prod.js')(app);

// app.set('view engine', 'pug');

// if(app.get('env') === 'development') {
//   app.use(morgan('tiny'));
//   debug('Morgan is enabled'); // using debug is like using console.log() but it is shorter and more self explainitory for what it is that you are looking for 
// };

const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`Listening on ${port}`));

module.exports = server; 