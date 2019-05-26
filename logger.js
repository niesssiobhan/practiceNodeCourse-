'use strict';

const EventEmitter = require('events');
const emitter = new EventEmitter();

console.log(__filename);
console.log(__dirname);

let url = 'http://mylogger.io/log';

function log(message) {
  // send and http request
  console.log(message);
}

// when you have module.exports this is adding to the exports object so that it can be publicly shown
// the method is log
// setting it to the log function 
// the name of the moethod can be changed. Example url can be changed to endPoint
// module.exports.endPoint = url; the url would stay private though, not be a part of the exports object

module.exports.log = log;

// ----------------------------------- //

// if you dont have multiple methods you can set the export to a single function instead of having it in an object by: module.exports = log;
// you can export a single function or an object 

// ----------------------------------- //

