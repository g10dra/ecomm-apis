var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var conf = require('./config/conf');
const { AuthMiddleware } = require('./utils/AuthMiddleware');

var app = express();

mongoose.Promise = global.Promise;
mongoose.connect(conf.dbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(AuthMiddleware);

app.use('/users', usersRouter);
app.use('/privateData', indexRouter); 


app.get('/', (req,res)=>{
  res.json({success:true,message:'Wow root and public api working fine.'})
}); 



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({error:"500 Error Occured"})
});

module.exports = app;
