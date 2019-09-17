const bodyParser = require('body-parser');
const routes = require('../api');
require('dotenv').config();

module.exports = app => {
  // body-parser Middleware
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

  app.use(bodyParser.json());

  // Use routes
  app.use('/api', routes());
};
