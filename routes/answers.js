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
 * @api {get} /answers
 * 获取答案列表
 */
router.get("/", function (req, res, next) {
  if (!req.query.iid || !req.query.pid) {
    res.status(400).json({
      data: "参数错误",
    });
  } else {
    var iid = hashes.decode(req.query.iid)[0];
    var sql = `SELECT * FROM answer WHERE interview_id = ${iid} AND problem_id = ${req.query.pid} `;
    connection.query(sql, function (err, result) {
      if (err) {
        console.log("[SELECT ERROR]:", err.message);
        res.status(500).json({
          data: "[SELECT ERROR]:" + err.message,
        });
      } else {
        var totalRecord = result.length;

        var page = req.query.page ? parseInt(req.query.page) : 1;
        var per_page = req.query.per_page ? parseInt(req.query.per_page) : 30;
        var preSize = (page - 1) * per_page;

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
 * @api {post} /answers
 * 提交答案
 */
router.post("/", function (req, res, next) {
  if (
    !req.body.language ||
    !req.body.content ||
    !req.body.problem_id ||
    !req.body.interview_id
  ) {
    res.status(400).json({
      data: "参数错误",
    });
  } else {
    var dt = require("moment")().format("YYYY-MM-DD HH:mm:ss");
    var iid = hashes.decode(req.body.interview_id)[0];
    var sql = `INSERT INTO answer (language,content,problem_id,interview_id,created_at) VALUES ('${req.body.language}','${req.body.content}',${req.body.problem_id},${iid},'${dt}')`;
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
