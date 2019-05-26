'use strict';

// function sayHello(name) {
//   console.log(`Hello ${name}`);
// }

// sayHello('Teagan');
console.log(module);

// ----------------------------------- //

const logger = require('./logger.js');
console.log(logger);

// if you have changed export to contain a single method of a function then you would only need to name it log instead of logger.log since the module.exports = log;
logger.log('message');

// ----------------------------------- //

// path is the argument that you are giving 
const path = require('path');

let pathObj = path.parse(__filename);
// this is going to show the path of the object
console.log(pathObj);

// ----------------------------------- //

const os = require('os');

let totalMemory = os.totalmem();
let freeMemory = os.freemem();

console.log(`Total Memory is ${totalMemory}`); // this shows the total memory that you have on your computer 
console.log(`Free Memory is ${freeMemory}`); // this shows the total amount of free memory that you have on your computer 

// ----------------------------------- //

const fs = require('fs');

// this is going to show you all of the files that you are working with
const files = fs.readdirSync('./'); 
console.log(files);

// this is a asynchornis function that will either show that there is an erroror if not then display the files as a result 
fs.readdir('./', (err, files) => {
  if(err) console.log('Error', err);
  else console.log('Result', files);
});

// ----------------------------------- //

const EventEmitter = require('events'); // EventEmitter are both uppercase because it shows that it is a class
const emitter = new EventEmitter(); // this is making a new instance of the EventEmitter class. emitter is the object

// register a listener
emitter.on('messageLogged', (arg) => { //this takes in the argument from the event 
  console.log('Listener called', arg);
});

// raise an event
emitter.emit('messageLogged', {id: 1, url: 'http://'}); // the second parameter, the object within, is called the event argument

// rasie an event called logging and also some date that will have a message (data: message)

emitter.emit('logging')

// ----------------------------------- //

