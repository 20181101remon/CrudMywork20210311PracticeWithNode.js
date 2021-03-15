const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');



// 使用dotenv
require('dotenv').config()

// 使用mysql
const mysql = require('mysql');

// 連接資料庫
const con=mysql.createConnection({
  host:process.env.DB_HOST,
  user:process.env.DB_USER,
  password:process.env.DB_PASS,
  database:"test"
});


// 資料庫連接失敗
con.connect((err)=>{
  if(err){
    console.log('conn error');
    return;
  }
  console.log('success');
});
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 問這句的意思
// db state 
app.use((req, res, next)=> {
  req.con = con;
  next();
});

// 執行不同的後端程式碼選擇
app.use('/', indexRouter); 
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next)=> {
  next(createError(404));
});

// error handler
app.use((err, req, res, next)=> {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
