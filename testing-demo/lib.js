'use strict';

const db = require('./db');
const mail = require('./mail');

// Testing numbers 
// with absolue you will always get a positive number or 0
module.exports.absolute = function(number) {
  return (number >= 0 ) ? number : -number; // if number is greater than or equal to 0 we will return number otherwise we will return negative number
  // the 3 lines of code all do the same as the line of code above
  // if (number > 0) return number; 
  // if (number < 0) return -number; 
  // return 0; 
}

// Testing strings 
module.exports.greet = function(name) { 
  return 'Welcome ' + name; 
}

// Testing arrays 
module.exports.getCurrencies = function() { 
  return ['USD', 'AUD', 'EUR'];
}

// Testing objects 
module.exports.getProduct = function(productId) { 
  return { id: productId, price: 10 };
}

// Testing exceptions 
module.exports.registerUser = function(username) { 
  if (!username) throw new Error('Username is required.');

  return { id: new Date().getTime(), username: username }
}

// Mock functions 
module.exports.applyDiscount = function(order) { 
  const customer = db.getCustomerSync(order.customerId);

  if (customer.points > 10) 
    order.totalPrice *= 0.9; 
}

// Mock functions 
module.exports.notifyCustomer = function(order) { 
  const customer = db.getCustomerSync(order.customerId);

  mail.send(customer.email, 'Your order was placed successfully.');
}