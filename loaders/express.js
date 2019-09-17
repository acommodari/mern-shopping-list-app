const express = require('express');
const routes = require('../api');

module.exports = app => {
  // body-parser Middleware
  app.use(express.json());

  // Use routes
  app.use('/api', routes());
};
