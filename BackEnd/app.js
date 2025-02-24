var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var config = require('./config');
const mongoose = require('mongoose');
const cors = require('./routes/cors');

const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("Conectado corretamente ao servidor.");
}, (err) => {
    console.log(err);
});

var app = express();

var indexRouter = require('./routes/index');
var phonesRouter = require('./routes/phones');

app.use(cors.corsWithOptions);
app.options('*', cors.corsWithOptions);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/phones', phonesRouter);

module.exports = app;
