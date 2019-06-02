'use strict';

// we have the try catch blok into one main function so that it doesnt have to be repeated in every route handler
// this means that the code in the route handlers will be more focused and you can see the actual logic that belongs to each route handler
// by defining the asyncMiddleware function that takes a handler we are able to pass a refernce to the handler to the route handlers that need it 
// when the function is called we return a standard Express route handler (return async (req, res, next))

module.exports = function (handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    }
    catch(ex) {
      next(ex);
    }
  }
};