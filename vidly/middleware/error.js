'use strict';

module.exports = function(err, req, res, next) {  // err has to be the beginning argument
  res.status(500).send('Something failed');
};