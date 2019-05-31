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

// the return that we are looking for would be an array of courses
async function getCourses() {
  return await Course
  .find({isPublished: true, tags: 'backend'})
  .sort({name: 1}) // or you could just use .sort('name') this would give you the same result
  .select({name: 1, author: 1}) // you could also just use .select('name author') this would give you the same result
}

// this function doesnt really need to be used, but its purpose is to display the courses
// the program would work just fine without this used in the database but the fucntion above doesnt need to do more than it needs to and we dont want too rely on it for more then job it is given
async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();