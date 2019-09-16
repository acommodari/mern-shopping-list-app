const express = require('express');

const startServer = async () => {
  const app = express();

  await require('./loaders')(app);

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
