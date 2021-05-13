var express = require('express');
var router = express.Router();

var connection = require('../config/mysql');
/* GET problems page. */
router.get('/:id', function (req, res, next) {
    var sql = `SELECT * FROM qb where id=${req.params.id}`;
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR]:', err.message);
        }
        res.json({
            data: result[0],
            status: 'success'
        })
    });
});

module.exports = router;
