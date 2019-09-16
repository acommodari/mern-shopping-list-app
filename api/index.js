const express = require('express');
const items = require('./routes/items');

module.exports = () => {
  const app = express.Router();

  items(app);

  return app;
};
