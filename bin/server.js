#!/usr/bin/env node

// 服务器启动脚本
// 默认启动HTTP服务器、WebSocket服务器
// 如果定义了WEBHOOK_ENABLE，则启动WebHook服务器

// 引入模块
var app = require("../app");
var http = require("http");
const ws = require("nodejs-websocket");
const crypto = require("crypto");
const exec = require("child_process").exec;
const path = require("path");

// 从环境变量获取端口号
const HTTP_PORT = process.env.HTTP_PORT || 3000;
const WEBHOOK_PORT = process.env.WEBHOOK_PORT || 3001;
const WEBSOCKET_PORT = process.env.WEBSOCKET_PORT || 3002;

// 保存端口号到express
app.set("port", HTTP_PORT);

// 创建HTTP服务器
var httpServer = http.createServer(app);
httpServer.listen(HTTP_PORT, function () {
  console.log("HTTP服务器启动成功，监听" + HTTP_PORT + "端口");
});
httpServer.on("error", function (error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind =
    typeof HTTP_PORT === "string" ? "Pipe " + HTTP_PORT : "Port " + HTTP_PORT;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
});

let wsNum = 0;
// 创建WebSocket服务器
const wsServer = ws.createServer(function (connect) {
  let id = wsNum;
  console.log("用户" + id + "连接上来!");
  wsNum++;
  //接收到信息函数
  connect.on("text", function (str) {
    console.log("接受到: " + str);
    //connect.sendText(str);//向这个浏览器回发str
    sentall(str); //向所有连接上来的浏览器发送str
  });
  //有连接断开函数
  connect.on("close", function () {
    console.log("连接断开了");
  });
  //连接出错
  connect.on("error", function () {
    console.log("用户连接异常");
  });
  function sentall(str) {
    wsServer.connections.forEach(function (connect) {
      connect.sendText(str);
    });
  }
});

wsServer.listen(WEBSOCKET_PORT, function () {
  console.log("WebSocket服务器启动成功，监听" + WEBSOCKET_PORT + "端口");
});

// 创建WebHook服务器
if (process.env.WEBHOOK_ENABLE) {
  const secret = "codeview";
  const repo = path.resolve("..");
  console.log("仓库根目录：", repo);

  http
    .createServer(function (req, res) {
      req.on("data", function (chunk) {
        console.log("接收到数据：", chunk);
        let sig =
          "sha1=" +
          crypto
            .createHmac("sha1", secret)
            .update(chunk.toString())
            .digest("hex");

        if (req.headers["x-hub-signature"] == sig) {
          console.log("自动更新仓库于：", new Date().toISOString());
          exec(
            "git pull",
            {
              cwd: repo,
            },
            (err, stdout, stderr) => {
              console.log("ERROR: ", err);
              console.log("STDOUT: ", stdout);
              console.log("STDERR: ", stderr);
            }
          );
        }
      });
      res.end();
    })
    .listen(WEBHOOK_PORT);

  console.log("WebHook服务器启动成功，监听" + WEBHOOK_PORT + "端口");
}
