'use strict';

function log (req, res, next) { // next is a reference to the next middleware function   
  // console.log('Logging...')
  next();
}

module.exports = log;