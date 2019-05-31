'use strict';

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercies')
  .then(() => console.log('connected to mongodb'))
  .catch(err => console.error('could not connect to mongodb', err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: boolean,
  price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
  return await Course 
  .find({isPublished: true, tags: {$in: ['backend', 'frontend']} })
  .or([ {tags: 'backend'}, {tags: 'frontend'} ]) //this would be a line that would would want to use if you didnt want both the frontend and the backend to be displayed. you would then remove the tags: {$in: ['backend, 'frontend']} from the .find above
  .sort({price: -1}) // this can also be done by .sort('-price') the result would be the same
  .select({name: 1, author: 1})
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run(); 