'use strict';

const lib = require('../lib.js');

test('absolute - should return a positive number if input is positive', () => {
  const result = lib.absolute(1);
  expect(result).toBe(1);
});

test('absolute - should return a positive number if input is negative', () => {
  const result = lib.absolute(-1);
  expect(result).toBe(1);
});

test('absolute - should return a zero number if input is zero', () => {
  const result = lib.absolute(0);
  expect(result).toBe(0);
});