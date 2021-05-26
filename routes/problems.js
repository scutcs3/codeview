var express = require('express');
var router = express.Router();

var token = require('../utils/token');
var tk;
router.use(function (req, res, next) {
    var authHeader = req.headers.authorization;//获取认证情况的集合
    if (authHeader) {
        tk = token.verifyToken(authHeader.substring(7));
        if (tk.code == '606') {
            res.status(401).json({
                data: '需要登录'
            });
        } else {
            next(); //继续下一步路由
        }
    } else {
        res.status(401).json({
            data: '需要登录'
        });
    }
    console.log('[connect success]: id ' + connection.threadId);
});

var connection = require('../config/mysql');

function getProblemDetail(field, param, page, per_page, word, res, req) {
    var sql;
    sql = `SELECT COUNT(*) FROM problem`;
    var totalRecord = 0;
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR]:', err.message);
            res.status(500).json({
                data: '[SELECT ERROR]:' + err.message,
            });
        } else {
            totalRecord = result[0]['COUNT(*)'];
        }
    });

    var page = page ? page : 1;
    var per_page = per_page ? per_page : 30;
    var totalPageNum = Math.ceil((totalRecord + per_page - 1) / per_page);
    var preSize = (page - 1) * per_page;

    if (!word && field == 'iid') {
        sql = `SELECT * FROM interview_problem where interview_id = ${param} limit ${preSize},${per_page}`;
    } else if (!word && field == 'pid') {
        sql = `SELECT * FROM problem where id = ${param}`;
    } else {
        sql = `SELECT * FROM problem WHERE content LIKE '%${word}%' OR title LIKE '%${word}%'`;
    }
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR]:', err.message);
            res.status(500).json({
                data: '[SELECT ERROR]:' + err.message,
            });
        } else {
            if (result.length > 0) {
                var results = [];
                for (var i = 0; i < result.length; i++) {
                    results.push(result[i]);
                }

                if (page > 1) {
                    res.setHeader('prevLink', `${req.baseUrl}?page=${page - 1}&per_page=${per_page}`);
                }
                if (page < totalPageNum) {
                    res.setHeader('nextLink', `${req.baseUrl}?page=${page + 1}&per_page=${per_page}`);
                }
                res.setHeader('firstLink', `${req.baseUrl}?page=${1}&per_page=${per_page}`);
                res.setHeader('lastLink', `${req.baseUrl}?page=${totalPageNum}&per_page=${per_page}`);

                res.json({
                    data: results,
                });
            } else {
                res.status(400).json({
                    data: '参数错误'
                });
            }
        }
    });
    return res;
}

/**
 * @api {get} /problems
 * 获取题目数据
 */
router.get('/', function (req, res, next) {
    var query = req.query;
    if (query.iid) {
        getProblemDetail('iid', query.iid, query.page, query.per_page, null, res, req);
    } else if (query.pid) {
        getProblemDetail('pid', query.pid, query.page, query.per_page, null, res, req);
    } else if (query.word) {
        getProblemDetail(null, null, query.page, query.per_page, query.word, res, req);
    } else {
        res.status(400).json({
            data: '参数错误'
        });
    }
});

/**
 * @api {post} /problems
 * 添加题目
 */
router.post('/', function (req, res, next) {
    var sql;
    if (!req.body.iid || !req.body.pid) {
        var dt = require('moment')().format('YYYY-MM-DD HH:mm:ss');
        sql = `INSERT INTO problem (title,content,owner_id,created_at,updated_at) VALUES ('${req.body.title}','${req.body.content}',${tk.obj.id},'${dt}','${dt}')`;
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR]:', err.message);
                res.status(500).json({
                    data: '[INSERT ERROR]:' + err.message,
                });
            } else {
                res.json({
                    title: req.body.title,
                    content: req.body.content,
                    id: result.insertId,
                    owner_id: tk.obj.id,
                    created_at: dt,
                    updated_at: dt
                });
            }
        });
    } else {
        sql = `SELECT * FROM interview WHERE id = ${req.body.iid}`;
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR]:', err.message);
                res.status(500).json({
                    data: '[SELECT ERROR]:' + err.message,
                });
            }
            if (result.length > 0) {
                hasIID = true;
                sql = `SELECT * FROM problem WHERE id = ${req.body.pid}`;
                connection.query(sql, function (err, result) {
                    if (err) {
                        console.log('[SELECT ERROR]:', err.message);
                        res.status(500).json({
                            data: '[SELECT ERROR]:' + err.message,
                        });
                    }
                    if (result.length > 0) {
                        sql = `INSERT INTO interview_problem (interview_id,problem_id) VALUES (${req.body.iid},${req.body.pid})`;
                        connection.query(sql, function (err, result) {
                            if (err) {
                                console.log('[INSERT ERROR]:', err.message);
                                res.status(500).json({
                                    data: '[INSERT ERROR]:' + err.message,
                                });
                            }
                            res.json({
                                data: '添加题目成功'
                            });
                        });
                    }else {
                        res.status(404).json({
                            data: '题目ID不存在'
                        });
                    }
                });
            }
            else{
                res.status(405).json({
                    data: '面试ID不存在'
                });
            }
        });
    }
});

/**
 * @api {delete} /problems
 * 删除题目数据
 */
router.delete('/', function (req, res, next) {
    var sql = `SELECT * FROM problem WHERE id = ${req.body.pid}`;
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR]:', err.message);
            res.status(500).json({
                data: '[SELECT ERROR]:' + err.message,
            });
        } else {
            if (result.length > 0) {
                if (result[0].owner_id != tk.obj.id) {
                    res.status(403).json({
                        data: '没有权限删除题目'
                    });
                } else {
                    if (!req.body.iid) {
                        sql = `DELETE FROM problem WHERE id = ${req.body.pid}`;
                        connection.query(sql, function (err, result) {
                            if (err) {
                                console.log('[DELETE ERROR]:', err.message);
                                res.status(500).json({
                                    data: '[DELETE ERROR]:' + err.message,
                                });
                            }
                            res.json({
                                data: '删除题目成功'
                            });
                        });
                    } else {
                        sql = `DELETE FROM interview_problem WHERE problem_id = ${req.body.pid} AND interview_id = ${req.body.iid}`;
                        connection.query(sql, function (err, result) {
                            if (err) {
                                console.log('[DELETE ERROR]:', err.message);
                                res.status(500).json({
                                    data: '[DELETE ERROR]:' + err.message,
                                });
                            }
                            res.json({
                                data: '删除题目成功'
                            });
                        });
                    }
                }
            } else {
                res.status(404).json({
                    data: '找不到指定id的题目'
                });
            }
        }
    });
});

/**
 * @api {patch} /problems
 * 修改题目数据
 */
router.patch('/', function (req, res, next) {
    var sql;
    sql = `SELECT * FROM problem WHERE id = ${req.body.id}`;
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR]:', err.message);
            res.status(500).json({
                data: '[SELECT ERROR]:' + err.message,
            });
        } else {
            if (result.length > 0) {
                if (result[0].owner_id != tk.obj.id) {
                    res.status(403).json({
                        data: '没有权限修改题目'
                    });
                } else {
                    var dt = require('moment')().format('YYYY-MM-DD HH:mm:ss');
                    sql = `UPDATE problem SET updated_at = '${dt}'`;
                    if (req.body.title) {
                        sql += `, title = '${req.body.title}'`;
                    }
                    if (req.body.content) {
                        sql += `, content = '${req.body.content}'`;
                    }
                    sql += ` WHERE owner_id = ${tk.obj.id}`;
                    connection.query(sql, function (err, result) {
                        if (err) {
                            console.log('[UPDATE ERROR]:', err.message);
                            res.status(500).json({
                                data: '[UPDATE ERROR]:' + err.message,
                            });
                        } else {
                            res.json({
                                data: '更新成功'
                            });
                        }
                    });
                }
            } else {
                res.status(404).json({
                    data: '找不到指定id的题目'
                });
            }
        }
    });
});

module.exports = router;