var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:4000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret: 'cmpe273_kafka_passport_mongo',
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
}));

app.use(bodyParser.json());

//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

const { mongoDB } = require('./config/mongo.conf');
const mongoose = require('mongoose');
const Users = require('./models/UserModel');
// const Books = require('./Models/BookModel');

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // poolSize: 500,
    // bufferMaxEntries: 0
};

mongoose.connect(mongoDB, options, (err, res) => {
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
});

//Route to handle Post Request Call
app.post('/login',(req, res) => {
    Users.findOne({ username: req.body.username, password: req.body.password }, (error, user) => {
        if (error) {
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            })
            res.end("Error Occured");
        }
        if (user) {
            res.cookie('cookie', user.username, { maxAge: 900000, httpOnly: false, path: '/' });
            req.session.user = user;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end();
        }
        else {
            res.writeHead(401, {
                'Content-Type': 'text/plain'
            })
            res.end("Invalid Credentials");
        }
    });    
});

app.post('/create', (req, res) => {
    var newbook = new Books({
        BookID: req.body.BookID,
        Title: req.body.Title,
        Author: req.body.Author
    });

    Books.findOne({ BookID: req.body.BookID }, (error, book) => {
        if (error) {
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            })
            res.end();
        }
        if (book) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Book ID already exists");
        }
        else {
            newbook.save((error, data) => {
                if (error) {
                    res.writeHead(500, {
                        'Content-Type': 'text/plain'
                    })
                    res.end();
                }
                else {
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end();
                }
            });
        }
    });
});

app.post('/delete', (req, res) => {
    Books.deleteOne({ BookID: req.body.BookID }, (error, result) => {
        if (error) {
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            })
            res.end();
        }
        if (result.n == 0) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Book ID does not exists");
        }
        else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end();
        }
    });
});

//Route to get All Books when user visits the Home Page
app.get('/home', (req, res) => {
    Books.find({}, (error, result) => {
        if (error) {
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            })
            res.end();
        }
        else {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(result));
        }
    });
});

//start your server on port 4000
app.listen(4000, () => console.log("Server Listening on port 4000"));
