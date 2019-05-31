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
  .find({isPublished: true})
  .or([ 
    {price: {$gte: 15}},
  {name: /.*by.*/i}
   ])
  .sort({price: -1})
  .select({name: 1, author: 1})
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();