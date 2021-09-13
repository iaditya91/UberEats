const express = require('express');
const bodyParser = require('body-parser');
const routeHandler = require('./routes/handler.js');

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/', routeHandler); 

const PORT = 4000;
// this is a small change
app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}.`);
});