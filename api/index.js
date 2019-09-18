const express = require('express');
const items = require('./routes/items');
const users = require('./routes/users');
const auth = require('./routes/auth');

module.exports = () => {
  const app = express.Router();

  auth(app);

  items(app);

  users(app);

  return app;
};
