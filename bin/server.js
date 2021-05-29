const ws = require("nodejs-websocket");
const PORT = 3002;
let num = 0;

let conns = {};

function boardcast(obj) {
  if (obj.interviewID) {
    conns[obj.interviewID].sendText(JSON.stringify(obj));
  }
  return;
}

const serve = ws.createServer(function (connect) {
  let id = num;
  console.log("用户" + id + "连接上来!");
  num++;
  //接收到信息函数
  connect.on("text", function (obj) {
    console.log("接受到: " + obj);
    obj = JSON.parse(obj);
    conns["" + obj.interviewID + ""] = connect;
    boardcast(obj);
  });
  //有连接断开函数
  connect.on("close", function () {
    console.log("连接断开了");
  });
  //连接出错
  connect.on("error", function () {
    console.log("用户连接异常");
  });
  //   function sentall(str) {
  //     serve.connections.forEach(function (connect) {
  //       connect.sendText(str);
  //     });
  //   }
});
serve.listen(PORT, function () {
  console.log("启动成功，监听" + PORT + "端口");
});
