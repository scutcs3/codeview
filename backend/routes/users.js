var express = require('express');
var router = express.Router();

var connection = require('../config/mysql');

var token = require('../utils/token');

function getUserDetail(field, param, page, per_page, res, req) {
    var sql;
    sql = `SELECT COUNT(*) FROM user`;
    var totalRecord = 0;
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR]:', err.message);
            res.status(410).json({
                data: '[SELECT ERROR]:' + err.message,
            });
        } else {
            totalRecord = result[0]['COUNT(*)'];
        }
    });

    var page = page ? page : 1;
    var per_page = per_page ? per_page : 30;
    var totalPageNum =  Math.ceil((totalRecord + per_page - 1) / per_page);
    var preSize = (page - 1) * per_page;

    if (param) {
        sql = `SELECT * FROM user where ${field} = '${param}' limit ${preSize},${per_page}`;
    } else {
        sql = `SELECT * FROM user limit ${preSize},${per_page}`;
    }
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR]:', err.message);
            res.status(410).json({
                data: '[SELECT ERROR]:' + err.message,
            });
        } else {
            var results = [];
            for (var i = 0; i < result.length; i++) {
                results.push(result[i]);
            }

            if(page>1){
                res.setHeader('prevLink', `${req.baseUrl}?page=${page - 1}&per_page=${per_page}`);
            }
            if(page<totalPageNum){
                res.setHeader('nextLink', `${req.baseUrl}?page=${page + 1}&per_page=${per_page}`);
            }
            res.setHeader('firstLink', `${req.baseUrl}?page=${1}&per_page=${per_page}`);
            res.setHeader('lastLink', `${req.baseUrl}?page=${totalPageNum}&per_page=${per_page}`);

            res.json({
                data: results,
            });
        }
    });
    return res;
}

/**
 * @api {get} /user
 * 获取用户信息
 */
router.get('/', function (req, res, next) {
    var authHeader = req.headers.authorization;//获取认证情况的集合
    if (authHeader) {
        var info = token.verifyToken(authHeader.substring(7));
        if (info.code == '606') {
            res.status(401).json({
                data: info.obj
            });
        } else {
            console.log(info.obj);
            var query = req.query;
            if (query.id) {
                getUserDetail('id', query.id, query.page, query.per_page, res, req);
            } else if (query.email) {
                getUserDetail('email', query.email, query.page, query.per_page, res, req);
            } else if (query.name) {
                getUserDetail('name', query.name, query.page, query.per_page, res, req);
            } else {
                getUserDetail(null, null, query.page, query.per_page, res, req);
            }
        }
    } else {
        res.status(401).json({
            data: '需要登录'
        });
    }
});

/**
 * @api {post} /user
 * 注册用户
 */
router.post('/', function (req, res, next) {
    var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!pattern.test(req.body.email) || typeof (req.body.password) != 'string') {
        res.status(400).json({
            data: '参数错误'
        });
    } else {
        var sql = `SELECT * FROM user where email = '${req.body.email}'`;
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR]:', err.message);
                res.status(410).json({
                    data: '[SELECT ERROR]:' + err.message,
                });
            } else {
                if (result.length>0) {
                    res.status(409).json({
                        data: '用户已存在'
                    });
                } else {
                    sql = `INSERT INTO user(email,password) VALUES ('${req.body.email}','${req.body.password}')`;
                    connection.query(sql, function (err, result) {
                        if (err) {
                            console.log('[INSERT ERROR]:', err.message);
                            res.status(410).json({
                                data: '[INSERT ERROR]:' + err.message,
                            });
                        } else {
                            var data = {
                                id: result.insertId,
                                email: req.body.email,
                            };
                            res.status(201).json({
                                token: token.createToken(data, 60 * 60 * 24),
                            });
                        }
                    });
                }
            }
        });
    }
});

/**
 * @api {post} /tokens
 * 获取验证令牌
 */
router.post('/tokens', function (req, res, next) {
    var sql = `SELECT * FROM user where email = '${req.body.email}' and password = '${req.body.password}'`;
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR]:', err.message);
            res.status(410).json({
                data: '[SELECT ERROR]:' + err.message,
            });
        } else {
            if (result) {
                var data = {
                    id: result[0].id,
                    email: req.body.email
                };
                res.json({
                    token: token.createToken(data, 60 * 60 * 24)
                });
            } else {
                res.status(400).json({
                    data: '验证失败'
                });
            }
        }
    });
});


module.exports = router;
