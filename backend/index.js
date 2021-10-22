const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Mongo connection 
const { mongoosedb } = require('./models/data-model');

const routes = require('./routes');

const { authenticateToken } = require('./middleware/validateToken');

app.use(authenticateToken);

app.use('/api', routes);

// Start the connection
try {
  mongoosedb.then(() => {
    const PORT = 4000;
    app
      .listen(PORT ,() => {
        console.log('Server running on 4000');
      })
      .on('error', (err) => {
        if (err.errno === 'EADDRINUSE') {
          console.log('Port is busy, trying with different port');
        } else {
          console.log(err);
        }
      });
  });
} catch (err) {
  console.log(err);
}

module.exports= app;