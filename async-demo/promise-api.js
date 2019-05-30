'use strict';

// this file is going to go over promise apis in more detail
// this will be an example of creating a promise that is already been resolved
// this is useful when writing unit tests

// this is a promise that has already been resolved
// const p = Promise.resolve({id: 1});
// p.then(result => console.log(result));

// this is a promise that has been rejected
// with the error, when you include new Error (which is called and error object) with the rejection and not just a message, you will recive a callstack and that will tell you more about the error
// const p = Promise.reject(new Error('reason for rejection....'));
// p.catch(error => console.log(error));

//-------------------------------------//

// here we will be going over promises in parallel
// are includig he Promise.all at the end, this means that if both of the promises are resolved that they will both happen at the same time
// now if there is an error then instead of having the array, [p1, p2], show an error will appear instead. So the Promise.all will not result 

const p1 = new Promise((resolve) => {
  setTimeout(() => {
    console.log('async operation 1');
    resolve(1);
  }, 2000);
});

const p2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log('async operation 2');
    resolve(2);
  }, 2000);
});

Promise.all([p1, p2])
  .then(result => console.log(result))
  .catch(err => console.log('Error', err.message));