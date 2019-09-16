const mongoose = require('mongoose');
const mongoURI = require('../config/config').mongoURI;

module.exports = async () => {
  // Connect mongoose
  const connection = await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  return connection.connection.db;
};
