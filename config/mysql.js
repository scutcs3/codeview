var mysql = require("mysql");
var user = "root";
var password = "";
var database = "123";

/*
https://github.com/scutcs3/codeview/wiki/%E9%83%A8%E7%BD%B2%E6%B5%81%E7%A8%8B#%E9%85%8D%E7%BD%AE%E6%95%B0%E6%8D%AE%E5%BA%93%E8%BF%9E%E6%8E%A5
配置本地数据库不要在此修改，在同目录下新建文件`mysql.local.js`，
里面填入本地数据库的账号、密码、数据库名，例如：

module.exports = {
    user: 'root',
    password: 'test',
    database: 'codeviewdb',
}
*/
try {
  var local = require("./mysql.local.js");
  if (local.user) user = local.user;
  if (local.password) password = local.password;
  if (local.database) database = local.database;
} catch (e) {
  console.log(e);
}

var connection;
var isConnect = false;

if (!isConnect) {
  connection = mysql.createConnection({
    //创建mysql实例
    host: "127.0.0.1",
    port: "3306",
    user,
    password,
    database,
  });
  // connect test
  connection.connect(function (err) {
    if (err) {
      console.error("[connect error]: " + err.stack);
      return;
    }
    console.log("[connect success]: id " + connection.threadId);
  });
}
isConnect = true;

module.exports = connection;
