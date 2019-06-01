'use strict';

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema] // this will gove you an array of authors 
}));

async function createCourse(name, authors) { // haaving th parameter to authors instead of author will give you an array of authors
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

// this block of code is directly updated in the database 
async function updateAuthor(courseId) {
  const course = Course.update({_id: courseId}, {
    // the unset example below shows how you would would remove the author property
    // $unset : {
    //   'author': ''
    // }
    $set: {
      'author.name': 'Jared Heller'
    }
  }); 
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.author.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId); // this gives us the author object
  author.remove();
  course.save();
}

// removeAuthor('the object id goes here', 'the author id goes here')
// updateCourse('the object id goes here', 'the course ID goes here')
// createCourse('Node Course', new Author({ name: 'Teagan' }));
createCourse('Node Course', [
  new Author({name: 'Teagan'}),
  new Author({name: 'Jared'})
]);