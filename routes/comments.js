var express = require("express");
var router = express.Router();

var token = require("../utils/token");
var tk;
router.use(function (req, res, next) {
  var authHeader = req.headers.authorization; //获取认证情况的集合
  if (authHeader) {
    tk = token.verifyToken(authHeader.substring(7));
    if (tk.code == "606") {
      res.status(401).json({
        data: "需要登录",
      });
    } else {
      next(); //继续下一步路由
    }
  } else {
    res.status(401).json({
      data: "需要登录",
    });
  }
});

var connection = require("../config/mysql");
var hashids = require("hashids");
var hashes = new hashids("codeview salt", 16);

/**
 * @api {get} /comments
 * 获取留言列表
 */
router.get("/", function (req, res, next) {
  if (!req.query.iid) {
    res.status(400).json({
      data: "参数错误",
    });
  } else {
    var sql;
    sql = `SELECT COUNT(*) FROM user`;
    var totalRecord = 0;
    connection.query(sql, function (err, result) {
      if (err) {
        console.log("[SELECT ERROR]:", err.message);
        res.status(500).json({
          data: "[SELECT ERROR]:" + err.message,
        });
      } else {
        totalRecord = result[0]["COUNT(*)"];
        var page = req.query.page ? parseInt(req.query.page) : 1;
        var per_page = req.query.per_page ? parseInt(req.query.per_page) : 30;
        var preSize = (page - 1) * per_page;

        var sql = `SELECT * FROM comment WHERE interview_id = ${req.query.iid} `;
        if (req.query.cid) {
          sql += `AND id = ${req.query.cid} `;
        }
        if (req.query.since) {
          sql += `AND created_at >= '${req.query.since}' `;
        }
        sql += `limit ${preSize},${per_page}`;
        connection.query(sql, function (err, result) {
          if (err) {
            console.log("[SELECT ERROR]:", err.message);
            res.status(500).json({
              data: "[SELECT ERROR]:" + err.message,
            });
          } else {
            var results = [];
            for (var i = 0; i < result.length; i++) {
              results.push(result[i]);
            }
            res.setHeader("Total-Count", totalRecord);

            res.json({
              data: results,
            });
          }
        });
      }
    });
  }
});

/**
 * @api {post} /comments
 * 创建留言
 */
router.post("/", function (req, res, next) {
  if (!req.body.content || !req.body.iid) {
    res.status(400).json({
      data: "参数错误",
    });
  } else {
    var dt = require("moment")().format("YYYY-MM-DD HH:mm:ss");
    let iid = hashes.decode(req.body.iid);
    var sql = `INSERT INTO comment (content,interview_id,owner_id,created_at) VALUES ('${req.body.content}',${iid},${tk.obj.id},'${dt}')`;
    connection.query(sql, function (err, result) {
      if (err) {
        console.log("[INSERT ERROR]:", err.message);
        res.status(500).json({
          data: "[INSERT ERROR]:" + err.message,
        });
      } else {
        res.json({
          data: "提交成功",
        });
      }
    });
  }
});

module.exports = router;
