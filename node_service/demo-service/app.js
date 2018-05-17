var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var Eureka = require('eureka-js-client').Eureka;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.get('/books',function(req,res){
  var books = [];
    books.push({ bookname: 'Nodejs Web Development', author: 'David Herron' });
    books.push({ bookname: 'Mastering Web Application Development with Express ', author: 'Alexandru Vlăduțu' });
    console.log('-----------')
    res.json(books);
})

app.get('/info',function(req, res){
  res.json({name:'book service',status:'ok'});
} );
app.get('/health',function(req, res){
res.json({name:'book service',status:'ok'});
} );

app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

const client =new Eureka({
  instance:{
    instanceId: 'nodejs-service-01',
    app:'nodejs-service',
    hostName: 'localhost',
    ipAddr:'127.0.0.1',
    statusPageUrl:'http://localhost:4001/info',
    healthCheckUrl:'http://localhost:4001/health',
    port:{
      '$':4001,
      '@enabled':true,
    },
    vipAddress:'nodejs-service',
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
  },
  eureka:{
    fetchRegistry:false,
    host:'127.0.0.1',
    port:1001,
    servicePath:'/eureka/apps'
  },
});

client.logger.level('debug');
client.start(function(error){
  console.log(error||'complete');
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
