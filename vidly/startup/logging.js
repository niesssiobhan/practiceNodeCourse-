'use strict';

const winston = require('winston'); // this is the default logger for logging messages in the console
require('winston-mongodb');
require('express-async-errors');

module.exports = function () {
  // this is so that you can catch an exception and so then the process wont terminate 
// this approach only works with synchronous code
// if you have apromise somewhere and the promise is reject then this block of code will not be executed 
// process.on('uncaughtException', (ex) => {
//   // console.log('WE GOT AN UNCAUGHT EXCEPTION');
//   winston.err(ex.message, ex);
//   process.exit(1);
// });

// this is another way to write the code from above
winston.handleException(
  new winston.transports.Console({colorize: true, prettyPrint: true}),
  new winston.transports.File({filename: 'uncaughtExceptions.log'})
)

process.on('unhandledRejection', (ex) => {
  // console.log('WE GOT AN UNHANDLED REJECTION');
  throw ex; // here we will now have an unhandled exception so winston will automatically catch it, log it in the file, and then terminate the process
});

winston.add(winston.transports.File, {filename: 'logfile.log'});
// now if we have any errors winston will automatically store the errors in mongodb
// it will create a new collection in the database for the errors
winston.add(winston.transports.MongoDB, {
  db: 'mongodb://localhost/vidly',
  level: 'error' // with this only error messages will be logged 
});
}