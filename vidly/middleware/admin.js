'use strict';

module.exports = function (req, res, next) {
  if(!req.user.isAdmin) return res.status(403).send('Forbidden, access denied');
  next();
}