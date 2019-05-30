'use strict';

const express = require('express');
const router = express.Router();

// the '/' represents the root of the website
router.get('/', (req, res) => {
  res.render('index', {title: 'My Express App', message: 'Hello Teagan!'});
});

module.exports = router;