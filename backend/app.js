var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/users');
var problemsRouter = require('./routes/problems');
var interviewsRouter = require('./routes/interviews');
var answersRouter = require('./routes/answers');
var commentsRouter = require('./routes/comments');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var expressJwt = require("express-jwt");
// jwt中间件
app.use(expressJwt({
    credentialsRequired: false,
    secret: "codeview", //加密密钥
    algorithms: ['HS256']
}).unless({
    path: ["/users","/tokens"]//添加不需要token验证的路由
}));

// 允许跨域
app.all('*', function (req, res, next) {
    console.log(req.headers.origin)
    console.log(req.environ)
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method === "OPTIONS") res.send(200);/*让options请求快速返回*/
    else next();
});

app.use(['/users','/tokens'], usersRouter);
app.use('/problems', problemsRouter);
app.use('/interviews', interviewsRouter);
app.use('/answers', answersRouter);
app.use('/comments', commentsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
