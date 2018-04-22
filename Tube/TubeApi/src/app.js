const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const busboy = require('connect-busboy')
const db = require('./model/db');
const migration = require('./migration');
const app = express();
app.use(busboy());
//Initial Migration
migration.init();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set the view engine to ejs
app.set('view engine', 'ejs');

// middleware to use for all requests
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Expose-Headers", "X-My-Custom-Header, X-Another-Custom-Header");
    next(); // make sure we go to the next routes and don't stop here
});

router.use('/user', require('./controllers/UserController'));

router.use('/category', require('./controllers/CategoryController'));

router.use('/course', require('./controllers/CourseController'));

router.use('/video', require('./controllers/VideoController'));

app.use('/api',router);

module.exports = app;
