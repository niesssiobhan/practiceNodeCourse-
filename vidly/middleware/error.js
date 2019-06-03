'use strict';

// using this npm package you are able to view errors that occur in your application and the information about them 
// the errors are now stroed in mongodb
const winston = require('winston'); // this is the default logger for logging messages in the console

// this function catches any errors in the request processing pipe line
module.exports = function(err, req, res, next) {  // err has to be the beginning argument
  winston.error(err.message, err); // this will log the error
  // the error message will ignore anything outside the contexts of Express
  res.status(500).send('Something failed');
};

// other helper methods that winston has is:
  // error
  // warn
  // info
  // verbose
  // debug
  // silly