var express = require('express');
var app = express();
var jade = require('jade');
var apiRouter = require('./routes/apiRouter');
var getRouter = require('./routes/getRouter');
var cookieParser = require('cookie-parser')();
var favicon = require('serve-favicon');


app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(cookieParser);
app.set('views', './views/');
app.set('view engine', 'jade');
app.use('/public', express.static('public'));

app.use(/^\/api.*/, apiRouter);
app.use(/^\/.*/, getRouter);


app.listen(3000);
console.log("Web server: http://localhost:3000/");
