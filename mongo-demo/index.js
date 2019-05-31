'use strict';

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('connected to mongodb'))
  .catch(err => console.error('could not connect to mongodb', err));

// documents will have a key and value pair
// this is setting up what you are going to be looking for and what the key and value pairs are going to be for the collection in the Schema  
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: {type: Date, default: Date.now},
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
  const pageNumber = 2;
  const pageSize= 10;

  const courses = await Course
    .find({author: 'Siobhan', isPublished: true})
    .find()
    .or([ {author: 'Siobhan'}, {isPublished: true} ])
    // looking t get an author that starts with Sio (going to use regular expression to do so)
    // the ^ character means 'starts with' so in the example below it means that I am looking for any authors that start with 'Sio'
    .find({author: /^Sio/ })
    // in regualr expresssion the $ means the end of a string. so in this example I am looking for authors that end with Niess
    // the 'i' at the end means that it now not case sensitive 
    .find({author: /Niess$/i})
    // in this example below means that you are searching for an auther that conatins 'iob' in the name
    // in regular expression '.*' means 0 or more characters. so in this example it means that there can be 0 or more characters before or after 'iob' in the authors name 
    .find({author: /.*iob.*/i})
    .find({price: {$gt: 10, $lte: 20} }) // this means that you are looking for any documents that inclue a price of $10 or up to $20
    .find({price: {$in: [10, 15, 20]} })
    // with the .skip anf the .limit below you are able to get any document within a given page
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({name: 1})
    // this means that it return the number of documents that match with .find({author: 'Siobhan', isPublished: true})
    .count()
    .select({name: 1, tags: 1});
  console.log(courses);
}

getCourses();