'use strict';

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('connected to mongodb'))
  .catch(err => console.error('could not connect to mongodb', err));

// documents will have a key and value pair
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: {type: Date, defualt: Date.now},
  isPublished: boolean
});

// Course is a class, we know this because the first letter is uppercase
// model is a method
// mongoose is the object
// 'Course' is the singular name that this collection is for (the collection in the database is called Course)
// course.Schema is what defines the shape of documents that is in the collection 
// now that we have a Schema (courseSchema from the above code) it has to be compiled into a model (the code below) Doing this will give you a class (Course)
// after the class has been made, and object (course) can be created based off of that class (Course)
// the course object maps to a document that is a mongodb database
// to see the object document in the termial you will want to run node index.js 
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course ({
    name: 'Node.js Course',
    author: "Siobhan",
    tags: ['node', 'backend'],
    isPublished: true
  });
  
  // result is the unique id that the mongodb has given the course obejct/document 
  const result = await course.save();
  console.log(result)
}

// to view the documents that are in the database in the terminal just run node index.js
// below is how you build queries
async function getCourses() {
  const courses = await Course
    // .find({author: 'Siobhan', isPublished: true})
    .find({price: {$gt: 10}}) // this means that you are looking for any documents that inclue a price of $10 or more
    .limit(10)
    .sort({name: 1})
    .select({name: 1, tags: 1});
  console.log(courses);
}

getCourses();