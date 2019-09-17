const express = require('express');
const path = require('path');

const startServer = async () => {
  const app = express();

  await require('./loaders')(app);

  // Serve static assets if in production
  if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

  const port = process.env.PORT || 5000;

  app.listen(port, err => {
    if (err) {
      console.log(err);
      process.exit(1);
      return;
    }
    console.log(`
      ####################################
      🛡️  Server listening on port: ${port} 🛡️ 
      ####################################
    `);
  });
};

startServer();
