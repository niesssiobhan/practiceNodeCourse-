'use strict';

function auth (req, res, next) {
  // console.log('Authenicating');
  next();
}

module.exports = auth;