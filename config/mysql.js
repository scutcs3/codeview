var mysql = require("mysql");
const fs = require("fs");
let user = "root";
let password = "";
let database = "123";

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
  fs.accessSync("config/mysql.local.js", fs.constants.R_OK);
  console.log("检测到本地配置，将覆盖默认数据库配置！");
  var local = require("./mysql.local.js");
  if (local.user) user = local.user;
  if (local.password) password = local.password;
  if (local.database) database = local.database;
} catch (error) {
  console.log("未检测到本地配置，使用默认数据库配置！");
}

var conn;
var isConnect = false;

if (!isConnect) {
  let connection = mysql.createConnection({
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
      console.error("MySQL连接失败，改用SQLite");
      conn = require("./sqlite");
    } else {
      console.log("MySQL连接成功，id = " + connection.threadId);
      conn = connection;
    }
  });
}
isConnect = true;

module.exports = conn;
