const bodyParser = require('body-parser');
const cors = require('cors');
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

  // cors Middleware
  app.use(cors());

  // Use routes
  app.use('/api', routes());
};
