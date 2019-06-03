'use strict';

const {User} = require('../../../models/user.js');
const auth = require('../../../middleware/auth.js');
const mongoose = require('mongoose');

describe('auth middleware', () => {
  it('should poplulate req.user with the payload of a valid jwt', () => {
    const user = {
      _id: mongoose.Types.ObjectId().toHexString(), 
      isAdmn: true
    };
    const token = new User(user).generateAuthToken();
    const req = {
      header: jest.fn().mockReaturnValue(token)
    };
    const res = {};
    const next = ject.fn();

    auth(req, res, next);

    expect(req.user).toMatchObject(user);
  });
});