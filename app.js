var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var usersRouter = require("./routes/users");
var problemsRouter = require("./routes/problems");
var interviewsRouter = require("./routes/interviews");
var answersRouter = require("./routes/answers");
var commentsRouter = require("./routes/comments");

var app = express();

// json setup
app.set("json spaces", 2);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var expressJwt = require("express-jwt");
// jwt中间件
app.use(
  expressJwt({
    credentialsRequired: false,
    secret: "codeview", //加密密钥
    algorithms: ["HS256"],
  }).unless({
    path: ["/users", "/tokens"], //添加不需要token验证的路由
  })
);

// 允许跨域
app.all("*", function (req, res, next) {
  console.log(req.headers.origin);
  console.log(req.environ);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "GET");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("X-Powered-By", " 3.2.1");
  if (req.method === "OPTIONS") res.send(200);
  /*让options请求快速返回*/ else next();
});

app.get("/", function (req, res) {
  var port = app.get("port") === 80 ? "" : app.get("port");
  var url = `${req.protocol}://${req.hostname}:${port}`;
  var ans = {
    login_url: "/tokens",
    users_url: "/users?{id, name, email, page, per_page}",
    problems_url: "/problems?{iid, pid, word, page, per_page}",
    interviews_url: "/interviews?{id, role, page, per_page}",
    answers_url: "/answers?{iid, role, page, per_page}",
    comments_url: "/comments?{iid, cid, since, page, per_page}",
  };
  Object.keys(ans).map((key) => (ans[key] = url + ans[key]));
  res.status(200).json(ans);
});

app.get("/test", function (req, res) {
  res.send("测试自动部署!");
});

app.use(["/users", "/tokens"], usersRouter);
app.use("/problems", problemsRouter);
app.use("/interviews", interviewsRouter);
app.use("/answers", answersRouter);
app.use("/comments", commentsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  res.status(err.status || 500).json({
    message: err.message,
    documentation_url:
      "https://app.swaggerhub.com/apis-docs/tootal/codeview/1.0.0",
  });
});

module.exports = app;
