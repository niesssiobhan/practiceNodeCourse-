'use strict';

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('connected to mongodb'))
  .catch(err => console.error('could not connect to mongodb', err));

// documents will have a key and value pair
// this is setting up what you are going to be looking for and what the key and value pairs are going to be for the collection in the Schema  
const courseSchema = new mongoose.Schema({
  // this is an example of codeing in validation
  // you can also include match in with the validation where you use regular expression
  name: { 
    type: String, 
    required: true,
    minlength: 5,
    maxlength: 255
  }, 
  category: { // this is a Schema type object
    type: String,
    required: true,
    enum: ['web', 'mobile', 'network'],
    lowercase: true, // you cant have both upper and lowercase set to true
    // uppercase: true,
    trim: true // mongoose will auto remove any padding that you have around strings 
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function(v, callback) { // the v argument in the function stands for value. we are also making this function to be asynchornous 
        setTimeout(()=> {
          const result = v && v.length > 0; // this means that if v has a value and the length of the value is greater than 0
          callback(result)
        }, 1000);
      },
      message: 'a course should have at least one tag'
    }
  },
  date: {type: Date, default: Date.now},
  isPublished: boolean,
  price: {
    type: Number,
    required: function() {return this.isPublished;}, // in the line of code you cant change the function to an arrow function because an arrow function doesnt have a 'this.'
    min: 10,
    max: 200,
    get: v => Math.round(v), // this is reading the value as a rounded number 
    set: v => Math.round(v) // this is setting the value to round the number 
  }
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

// name, category, author... these are all the properties of course 
async function createCourse() {
  const course = new Course ({
    name: 'Node.js Course',
    category: 'web',
    author: 'Teagan',
    tags: ['frontend'],
    isPublished: true
  });
  // this try catch block is created to handle arejection form the Promise if there is one 
  try {
    // await course.validate // this is another way that you can write validation for this code instead of the const result and console.log after 
    // result is the unique id that the mongodb has given the course obejct/document 
  const result = await course.save();
  console.log(result)
  }
  catch(ex) {
    for (field in ex.errors) // this will iterate over all of the properties and will give more details about each validation error
    console.log(ex.errors[field]) // this is going to find that property and getits value, this is a validation error object
    }
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

async function updateCourse(id) {
  // approach: query first
  // findById()
  const course = await Course.findById(id);
  if (!course) return;
  // modify its properties
  // course.isPublished = true;
  // course.author = 'another author';
  course.set({ // the two lines above is another way to do what is done in the course.set, but course.set is cleaner code
    isPublished: true,
    author: 'another author'
  })
  // save() this calls in a promise so that is why we have the code below with an await 
  const result = await course.save();
  console.log(result);
}

//----------------------------------------------------//

async function updateCourse(id) {
  // approach: update first (query first)
  if (course.isPublished) return;
  // this would be updating  in the database without retrieving it first
  // having: const course = await Course.update({isPublished: false}) would give you the ability to update multiple documents at the same time 
  const result = await Course.update({_id : id}, { // this will update a course with a particular id
    $set: { // this is an operator that is being used from mongodb
      author: 'Teagan',
      isPublished: false
    }
  });
  console.log(result);
}

//-------------------------------------------------------//
//optionally: get the updated document
async function updateCourse(id) {
  if (course.isPublished) return;
  const course = await Course.findByIdAndUpdate(id, { // findByIdAndUpdate method it will send one command to mongodb to update a document and return it 
    $set: {
      author: 'Jared',
      isPublished: true
    }
  }, {new: true}); // without this line of code you will not get the updated document 
  console.log(course);
}

// this is an example of if you want to delete a document 
async function removeCourse(id) {
  // if you want to delete more than one document then you can use deleteMany instead of deleteOne and it will tell you how many documant have been deleted 
 const result = await Course.deleteOne({_id: id}) // this query object will help you find one specific document 
 const course = await Course.findByIdAndRemove(id); //this give you the document that was deleted 
 console.log(result); // or console.log(course); depending on which one that you want to use 
}

createCourse();
getCourses();
removeCourse();
updateCourse(); // then you would input a valid course id and make it the argument for updateCourse() for that you can update the course in the database
// after you run the program in the terminal by running node index.js you will see the result of the updated course in the database