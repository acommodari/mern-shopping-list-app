const express = require('express');
const items = require('./routes/items');
const users = require('./routes/users');

module.exports = () => {
  const app = express.Router();

  items(app);

  users(app);

  return app;
};
