
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const app = express();
const helmet = require("helmet");

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const classRouter = require('./routes/Class');
const userRouter = require('./routes/User');
const homeworkRouter = require('./routes/Homework');
const uploadFile = require('./routes/upload_file')


// Config
const config = require('./config');

// Middleware
const verifyToken = require('./middleware/verify-token');

app.use(cors());
app.use(helmet());

app.set('api_secret_key', config.api_secret_key);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/public", express.static(__dirname + "/public"));


app.use('/', indexRouter);
app.use('/api', verifyToken);
app.use('/api/auth', authRouter);
app.use('/api/class', classRouter);
app.use('/api/user', userRouter);
app.use('/api/homework', homeworkRouter);
app.use('/api/upload_file', uploadFile);

// catch 404 and forward to error handler

app.use((req, res, next) => {
  console.log(req, res, next);
  next(createError(404));
});


// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err.message });
});




module.exports = app;
