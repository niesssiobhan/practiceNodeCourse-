'use strict';

// this program is showing how you can generate an object id
const mongoose = require ('mongoose');

const id = new mongoose.Types.ObjectId();
console.log(id.getTimestamp()); // you dont have to have the .getTimeStamp attached to the id to generate the id

const isValid = mongoose.Types.ObjectId.isValid('1234'); // this will come out to be false
console.log(isValid);