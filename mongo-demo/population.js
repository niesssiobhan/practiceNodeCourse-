'use strict';

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const Author = mongoose.model('Author', new mongoose.Schema({
  name: String,
  bio: String,
  website: String
}));

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: {
    type: mongoose.Schema.types.ObjectId,
    ref: 'Author'
  }
}));

async function createAuthor(name, bio, website) { // this is a helper function 
  const author = new Author({
    name, 
    bio, 
    website 
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) { // this is also another helper function
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { // this is the third helper function
  const courses = await Course
    .find()
    .populate('author', 'name -_id') // this means that you are only looking for the name property that goes with the author, and also excludes the id property
    .populate('category', 'name')
    .select('name');
  console.log(courses);
}

createAuthor('Teagan', 'My bio', 'My Website');

// createCourse('Node Course', 'authorId')

// listCourses();