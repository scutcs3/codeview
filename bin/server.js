#!/usr/bin/env node

// 服务器启动脚本
// 默认启动HTTP服务器、WebSocket服务器
// 如果定义了WEBHOOK_ENABLE，则启动WebHook服务器

// 引入模块
var app = require("../app");
var http = require("http");
const https = require("https");
const ws = require("nodejs-websocket");
const fs = require("fs");
const crypto = require("crypto");
const exec = require("child_process").exec;
const path = require("path");

// 从环境变量获取端口号
const HTTP_PORT = process.env.HTTP_PORT || 3000;
const WEBHOOK_PORT = process.env.WEBHOOK_PORT || 3001;
const WEBSOCKET_PORT = process.env.WEBSOCKET_PORT || 3002;
const HTTPS_PORT = process.env.HTTPS_PORT || 3004;

// 保存端口号到express
app.set("http_port", HTTP_PORT);
app.set("https_port", HTTPS_PORT);

// 创建HTTPS服务器
const cred = {
  key: fs.readFileSync(
    path.resolve(__dirname, "../config/localhost+2-key.pem")
  ),
  cert: fs.readFileSync(path.resolve(__dirname, "../config/localhost+2.pem")),
};
const httpsServer = https.createServer(cred, app);
httpsServer.listen(HTTPS_PORT, function () {
  console.log("HTTPS服务器启动成功: " + "https://localhost:" + HTTPS_PORT);
});
httpsServer.on("error", function (error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind =
    typeof HTTPS_PORT === "string"
      ? "Pipe " + HTTPS_PORT
      : "Port " + HTTPS_PORT;

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

// 记录面试连接
// interviewId => array of {connect, uid}
let wsConns = {};

function boardcast(obj) {
  let iid = obj.interviewID;
  if (iid && wsConns[iid]) {
    obj.count = wsConns[iid].length;
    for (let conObj of wsConns[iid]) {
      console.log("向面试", iid, "中的用户", conObj.uid, "广播数据 ", obj);
      conObj.con.sendText(JSON.stringify(obj));
    }
  }
  return;
}
// 创建WebSocket服务器
const wsServer = ws.createServer(function (connect) {
  //接收到信息函数
  connect.on("text", function (obj) {
    // console.log("接受到: " + obj);
    obj = JSON.parse(obj);
    let iid = obj.interviewID;
    if (obj.type == "open") {
      let conObj = {
        uid: obj.uid,
        con: connect,
      };
      if (wsConns[iid]) {
        let idx = wsConns[iid].findIndex((conObj) => conObj.uid === obj.uid);
        if (idx !== -1) {
          console.log("用户", obj.uid, "重复连接!");
        } else {
          wsConns[iid].push(conObj);
          console.log("用户", obj.uid, "连接上来!");
        }
      } else {
        wsConns[iid] = [conObj];
        console.log("用户", obj.uid, "连接上来!");
      }
    } else if (obj.type == "close") {
      if (wsConns[iid]) {
        let idx = wsConns[iid].findIndex((conObj) => conObj.uid === obj.uid);
        if (idx !== -1) {
          console.log("用户", obj.uid, "断开连接!");
          wsConns[iid].splice(idx, 1);
        }
      }
    }
    boardcast(obj);
  });
  //有连接断开函数
  connect.on("close", function () {
    // console.log("连接断开了");
  });
  //连接出错
  connect.on("error", function () {
    // console.log("用户连接异常");
  });
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
