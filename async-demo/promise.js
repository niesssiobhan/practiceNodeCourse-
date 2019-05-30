'use strict';

const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1); // the state goes from: pending => resolved, fulfilled
    reject(new Error('there was an error')) // the state goes from: pending => rejected
  }, 2000);
});

// the code below is how you consume the promise
p
.then(result => console.log('result', result))
.catch(err => console.log('Error', err.message));