'use strict';
// as you add in more functions within then it turns into CALLBACK HELL
// When you run node index.js in the terminal the result will be ""Before" then "After" and then the last message will be "reading a uses from a database"

console.log('before');
getUser(1, (user) => {
  getRepositories(user.gitHubUsername, (repos) => {
    getCommits(repos[0], (commits) => {
      console.log(commits);
    })
  })
});

const p = getUser(1);
p.then

console.log('after');

// Synchronous (the same code from above but done in synchronous code)
// console.log('Before');
// const user = getUser(1);
// const repos = getRepositories(user.gitHubUsername);
// const commits = getCommits(repos[0]);
// console.log('After');

// the code below has been refactored from an asynchronous callback hell into simple code (code is shown above that was the before)
console.log('Before');
getUser(1, getRepositories);
console.log('After');

// in the code below from lines 2 through 27 these are examples of fucntions that contain callbacks. each one call the next function and so on. in the getRepositories funtion, the argument or parameter of getCommits is the callback and it is calling the next function, getCommits and so on 
function getRepositories(user) {
  getRepositories(user.gitHubUsername, getCommits);
}

function getCommits(repos) {
  getCommits(repos, displayCommits);
}

function displayCommits(commits) {
  console.log(commits);
}
//----------------------------------------------------------//

// how to deal with asynchronous code:
  // callbaks
  // promises
  // async/await

// this is an example oof an asynchronous or non-blocking function
// how this is going to work is that after 2 seconds (2000) then the function within the setTimeout will run
function getUser(id) {
  return new Promise ((resolve, reject) => {
    setTimeout(() => {
      console.log('reading a user from the database');
      resolve({id: id, gitHubUsername: 'niesssiobhan'}); // remember that this is a user object
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise ((resolve, reject) => {
    setTimeout(() => {
      console.log('calling github api');
      resolve(['repo1', 'repo2', 'repo3']);
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise ((resolve, reject) => {
    setTimeout(() => {
      console.log('calling gihub api');
      resolve(['commit']);
    }, 2000);
  });
}