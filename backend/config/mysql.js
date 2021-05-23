var mysql = require('mysql');
var user = 'root';
var password = '';
var database = '123';

try {
    local = require('./mysql.local.js');
    if (local.user) user = local.user;
    if (local.password) password = local.password;
    if (local.database) database = local.database;
} catch (e) {}

var connection;
var isConnect = false;

if(!isConnect){
    var connection = mysql.createConnection({      //创建mysql实例
        host:'127.0.0.1',
        port:'3306',
        user,
        password,
        database,
    });
    // connect test
    connection.connect(function (err) {
        if (err) {
            console.error('[connect error]: ' + err.stack);
            return;
        }
        console.log('[connect success]: id ' + connection.threadId);
    });
}
isConnect=true;

module.exports = connection;