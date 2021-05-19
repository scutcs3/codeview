var mysql = require('mysql');

var connection;
var isConnect = false;

if(!isConnect){
    connection = mysql.createConnection({      //创建mysql实例
        host:'127.0.0.1',
        port:'3306',
        user:'root',
        password:'',
        database:'123'
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