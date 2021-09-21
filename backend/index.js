const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
//const routeHandler = require('./routes/handler.js');
const routes = require('./routes');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { sequelize } = require('./models/data_model');

app.use('/api', routes);
//const { authenticateToken } = 

//app.use('/', routeHandler); 

try {
  sequelize.sync().then(() => {
    const PORT = 4000;
    app.listen(PORT, () => {
      console.log(`server is running on ${PORT}.`);
    
  }).
    on('error', (err) => {
      if (err = 'EADDRINUSE') {
        console.log('Port is busy, use another port');
      }
      else {
        console.log(err);
      }
    });
  });}
catch (err) {
  console.log(err);
}