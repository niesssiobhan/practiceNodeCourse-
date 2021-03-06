'use strict';

// function sayHello(name) {
//   console.log(`Hello ${name}`);
// }

// sayHello('Teagan');
// console.log(module);

// ----------------------------------- //

// const logger = require('./logger.js');
// console.log(logger);

// if you have changed export to contain a single method of a function then you would only need to name it log instead of logger.log since the module.exports = log;
// logger.log('message');

// ----------------------------------- //

// path is the argument that you are giving 
// const path = require('path');

// let pathObj = path.parse(__filename);
// this is going to show the path of the object
// console.log(pathObj);

// ----------------------------------- //

// const os = require('os');

// let totalMemory = os.totalmem();
// let freeMemory = os.freemem();

// console.log(`Total Memory is ${totalMemory}`); // this shows the total memory that you have on your computer 
// console.log(`Free Memory is ${freeMemory}`); // this shows the total amount of free memory that you have on your computer 

// ----------------------------------- //

// const fs = require('fs');

// this is going to show you all of the files that you are working with
// const files = fs.readdirSync('./'); 
// console.log(files);

// this is a asynchornis function that will either show that there is an erroror if not then display the files as a result 
// fs.readdir('./', (err, files) => {
//   if(err) console.log('Error', err);
//   else console.log('Result', files);
// });

// ----------------------------------- //

// const EventEmitter = require('events'); // EventEmitter are both uppercase because it shows that it is a class

// const Logger = require('./logger'); // this is the logger module, and we are also calling the log function. This is also giving access to the Logger class that is located in the logger.js file 
// const logger = new Logger(); // this is referring to the Logger class that we have defined in the logger.js file 

// register a listener
// logger.on('messageLogged', (arg) => { // this takes in the argument from the event 
//   console.log('Listener called', arg);
// });

// logger.log('message');

// ----------------------------------- //

const http = require('http');

const server = http.createServer((req, res) => { // (req, res) is a callback function 
  if(req.url === '/') {
    res.write('Hello World');
    res.end();
  }
  if(req.url === '/api/courses') {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
}); // this has all of the capabilities of an EventEmitter
// server.on('connection', (socket) => {
//   console.log('New connection');
// });

server.listen(3000);

console.log('Listening on Port 3000');

// ----------------------------------- //