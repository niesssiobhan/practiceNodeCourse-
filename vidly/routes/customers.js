'use strict';

const {Customer, validate} = require('../models/customers.js/index.js'); // this file has two properties (the module.export at the bottom of the /models/customer.js file) so we are using object destructuring so that we can use clean code and reference both properties 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name'); // this is going to find all of the customers and then sort them by name
  res.send(customers);
});

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if(!customer) return res.status(404).send('The customer was not found');
  res.send(customer);
});

router.post('/', async (req, res) => {
  const {error} = validate(req.body); 
  if(error) return res.status(400).send(error.details[0].message);

  let customer = new Customer ({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold
  }); 
  customer = await Customer.save(); // this is going to save it to the database
  res.send(customer); // this is returning the object in the body of the response back to the client
});

router.put('/:id', async (req, res) => {
  const {error} = validate(req.body); //this is like getting result.error
  if(error) return res.status(400).send(error.details[0].message); // validating 

  const customer = await Customer.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold
  }, 
  { new: true }); // this is to get the updated object from the database
  
  // if not exsiting then need to return 404
  if(!customer) return res.status(404).send('The customer with that ID was not found');  

  //return the updated customer 
  res.send(customer);
});

router.delete('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id)

  if(!customer) return res.status(404).send('The customer with that ID was not found');

  // return the same customer 
  res.send(customer);
});

module.exports = router;