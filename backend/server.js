var web_socket = require('ws')
var wss = new web_socket.Server({ port: 3000 })
wss.on("connection", function (ws) {
    console.log("用户已连接")
    ws.on("message", function (data) {
        wss.clients.forEach(function (client) {
            client.send(data)
        })
    })
})
console.log("WebSocket服务器正在运行")
