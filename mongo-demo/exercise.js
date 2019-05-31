'use strict';

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercies')
  .then(() => console.log('connected to mongodb'))
  .catch(err => console.error('could not connect to mongodb', err));

const 