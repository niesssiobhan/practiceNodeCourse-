'use strict';

// when you require a module in node, that module is loaded and then cached in memory
const lib = require('../lib.js');
const db = require('../db.js');
const mail = require('../mail.js');

describe('absolute', () => {
  it('should return a positive number if input is positive', () => {
    const result = lib.absolute(1);
    expect(result).toBe(1); // toBe is a method
  });

  it('should return a positive number if input is negative', () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });

  it('should return a zero number if input is zero', () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

describe('greet', () => {
  it('should return the greeting message', () => {
    const result = lib.greet('Teagan');
    expect(result).toMatch(/Teagan/); // as long as we have the name that we want then it will pass (toMatch is a method)
    // expect(result).toContain('Teagan'); // this would work as well
  });
});

describe('getCurrencies', () => {
  it('should return supported currencies', () => {
    const result = lib.getCurrencies();
    expect(result).toEqual(expect.arrayContaining(['EUR', 'USD', 'AUD'])); // toEqual and arryContaining is a method
  });
});

describe('getProduct', () => {
  it('should return the product with the given id', () => {
    const result = lib.getProduct(1);
    expect(result).toEqual({id: 1, price: 10}); // keep in mind that this one is too specific
    // expect(result).toMatchObject({id: 1, price: 10}); // this would also work, with this one though  you could add on more properties to the object and it will continue to pass
    // expect(result).toHaveProperty('id', 1); // this would also work
  });
});

describe('registerUser', () => {
  it('should throw if username is falsy', () => {
    expect(() => {lib.registerUser(null)}).toThrow();
  });

  it('should return a user object if valid username is passed', () => {
    const result = lib.registerUser('teagan');
    expect(result).toMatchObject({username: 'teagan'});
    expect(result.id).toBeGreaterThan(0);
  });
});

describe('applyDiscount', () => {
  it('should apply 10% discount if customer has more than 10 points', () => {
    db.getCustomerSync = function(customerId) { // this is called a fake or a mock function
      console.log('Fake reading customer');
      return {id: customerId, points: 20};
    }
    const order = {customerId: 1, totalPrice: 10};
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});

describe('notifyCustomer', () => {
  it('should send an email to the customer', () => {
    db.getCustomerSync = jest.fn().mockReturnValue({email: 'a'});
    // the function below is the same as the line of code above
    // db.getCustomerSync = function(customerId) {
    //   return {email: 'a'};
    // }
    mail.send = jest.fn();
    // the code lines below are the same as the line of code above
    // let mailSent = false; // here we can determine whether the mail was sent or not 
    // mail.send = function(email, message) {
    //   mailSent = true;
    // }

    lib.notifyCustomer({customerId: 1});

    expect(mail.send).toHaveBeenCalled(); // with this matcher (.toHaveBeenCalledWith) we can tell if a method is called or 
    expect(mail.send.mock.calls[0][0]).toBe('a'); // this is checking for the email
    expect(mail.send.mock.calls[0][1]).toMatch(/order/); // this is checking for the message that is passed along with the email
  });
}); 