const ws = require("npm install nodejs-websocket");
const PORT = 3000;
let num=0;
const serve = ws.createServer(function (connect) {
  let id=num;
  console.log("用户"+id+"连接上来!");
  num++;
  //接收到信息函数
  connect.on("text", function (str) {
    console.log("接受到: " +str);
    // connect.sendText(str);//向这个浏览器回发str
    sentall(str)//向所有连接上来的浏览器发送str
  });
  //有连接断开函数
  connect.on("close", function () {
    console.log("连接断开了");
  });
  //连接出错
  connect.on("error", function () {
    console.log("用户连接异常");
  });
  function sentall(str){
    serve.connections.forEach(function(connect){
      connect.sendText(str);

    })
  }
  
});
serve.listen(PORT, function () {
  console.log("启动成功，监听3000端口");
});
