'use strict';

const Joi = require('joi');

module.exports = function() {
  Joi.objectId = require('joi-objectid')(Joi); // objectid is a method on the Joi object
// this Joi.objectId is also going to help handle an unhanledPromosieRejection warning that you could get in your terminal
}