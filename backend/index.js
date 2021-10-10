const express = require('express');
const cors = require('cors');

const app = express();
const backendUrl = '3.15.5.174'

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const { sequelize } = require('./models/data-model');
const routes = require('./routes');

const { authenticateToken } = require('./middleware/validateToken');

app.use(authenticateToken);

app.use('/api', routes);

// Start the connection
try {
  // conn.sync({ alter: true })
  sequelize.sync().then(() => {
    const PORT = 4000;
    app
      .listen(PORT,backendUrl ,() => {
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
