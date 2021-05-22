var express = require('express');
var router = express.Router();

var connection = require('../config/mysql');
// connect test
connection.connect(function(err) {
    if (err) {
      console.error('[connect error]: ' + err.stack);
      return;
    }
    console.log('Server running at: http://localhost:3000');
    console.log('[connect success]: id ' + connection.threadId);
});

/* GET problems page. */
router.get('/:id', function (req, res, next) {
    var sql = `SELECT * FROM qb where id=${req.params.id}`;
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR]:', err.message);
            res.json({
                data: '[SELECT ERROR]:'+ err.message,
                status: 'fail'
            })
        }else{
            res.json({
                data: result[0],
                status: 'success'
            })
        }
    });
});

module.exports = router;
