'use strict';

const EventEmitter = require('events');

// console.log(__filename);
// console.log(__dirname);

let url = 'http://mylogger.io/log';

// by extending the Logger class to EventEmitter it now ha all the functionality that EventEmitter has 
class Logger extends EventEmitter {
  log(message) { // this log function is now referred to as a method 
    // send and http request
    console.log(message);
  
    // raise an event 
    this.emit('messageLogged', {id: 1, url: 'http://'}); // the second parameter, the object within, is called the event argument
    // this. references the Logger class 

  }
}


// when you have module.exports this is adding to the exports object so that it can be publicly shown
// the method is log
// setting it to the log function 
// the name of the moethod can be changed. Example url can be changed to endPoint
// module.exports.endPoint = url; the url would stay private though, not be a part of the exports object

module.exports = Logger;

// ----------------------------------- //

// if you dont have multiple methods you can set the export to a single function instead of having it in an object by: module.exports = log;
// you can export a single function or an object 

// ----------------------------------- //

