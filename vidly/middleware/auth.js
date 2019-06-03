'use strict';

const jwt = require('jsonwebtoken');
const config = require('config');

function auth (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided'); // this is telling the user that they dont have the right authentication
  
  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey')); // this is going to verify the web token 
    req.user = decoded;
    next();
  }
  catch(ex) {
    res.status(400).send('Invalid Token')
  }
}

module.exports = auth;