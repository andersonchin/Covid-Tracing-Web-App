var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const bcrypt = require('bcrypt');
var session = require('express-session');
var validator = require('validator');
var Nominatim = require('nominatim-geocoder');

var app = express();

var dbConnectionPool = mysql.createPool({
  host: 'localhost',
  database: 'website'
});

// Middleware
app.use(function(req, res, next) {
  req.pool = dbConnectionPool;
  next();
});

app.use('/javascripts', express.static(__dirname + '/node_modules/validator'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: "asdasdasdasd",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/users', express.static(path.join(__dirname, 'private')));
app.use('/', express.static(path.join(__dirname, 'public')));

module.exports = app;