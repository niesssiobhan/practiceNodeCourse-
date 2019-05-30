'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {title: 'My Node Movie Project', message: 'I got this!'});
});

module.exports = router;