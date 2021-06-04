var express = require("express");
var router = express.Router();
const moment = require("moment");
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

function getInterviewList(field, page, per_page, res, req) {
  var sql;
  sql = `SELECT COUNT(*) FROM interview`;
  var totalRecord = 0;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR]:", err.message);
      res.status(500).json({
        data: "[SELECT ERROR]:" + err.message,
      });
    } else {
      totalRecord = result[0]["COUNT(*)"];
      var preSize = (page - 1) * per_page;

      var sql = `SELECT * FROM interview WHERE ${field} = ${tk.obj.id} limit ${preSize},${per_page}`;
      connection.query(sql, function (err, result) {
        if (err) {
          console.log("[SELECT ERROR]:", err.message);
          res.status(500).json({
            data: "[SELECT ERROR]:" + err.message,
          });
        } else {
          var results = [];
          let formatDate = function (dt) {
            if (dt) {
              return moment(dt, moment.ISO_8601).format("YYYY-MM-DD HH:mm:ss");
            } else return dt;
          };
          for (var i = 0; i < result.length; i++) {
            result[i].start_time = formatDate(result[i].start_time);
            result[i].finish_time = formatDate(result[i].finish_time);
            results.push(result[i]);
            results[i].id = hashes.encode(result[i].id);
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

/**
 * @api {get} /interviews
 * 获取面试列表
 */
router.get("/", function (req, res, next) {
  var sql;
  if (req.query.id) {
    sql = `SELECT * FROM interview WHERE id = ${req.query.id}`;
    connection.query(sql, function (err, result) {
      if (err) {
        console.log("[SELECT ERROR]:", err.message);
        res.status(500).json({
          data: "[SELECT ERROR]:" + err.message,
        });
      } else {
        if (result.length > 0) {
          if (
            result[0].viewer_id != tk.obj.id &&
            result[0].viewee_id != tk.obj.id
          ) {
            res.status(403).json({
              data: "没有权限获取面试信息",
            });
          } else {
            var results = [];
            for (var i = 0; i < result.length; i++) {
              results[i].id = hashes.encode(result[i].id);
              results.push(result[i]);
            }
            res.json({
              data: results,
            });
          }
        } else {
          res.status(404).json({
            data: "面试id不存在",
          });
        }
      }
    });
  } else {
    var page = req.query.page ? parseInt(req.query.page) : 1;
    var per_page = req.query.per_page ? parseInt(req.query.per_page) : 30;
    if (req.query.role == "viewee") {
      getInterviewList("viewee_id", page, per_page, res, req);
    } else {
      getInterviewList("viewer_id", page, per_page, res, req);
    }
  }
});

/**
 * @api {post} /interviews
 * 创建面试
 */
router.post("/", function (req, res, next) {
  let viewee_id = req.body.viewee_id || "null";
  let start_time = req.body.start_time || "null";
  let finish_time = req.body.finish_time || "null";
  var sql = `INSERT INTO interview (viewer_id,viewee_id,start_time,finish_time,status) VALUES (${tk.obj.id},${viewee_id},'${start_time}','${finish_time}','created')`;
  //   console.log(sql);
  connection.query(sql, function (err, result) {
    if (err) {
      console.log("[INSERT ERROR]:", err.message);
      res.status(500).json({
        data: "[INSERT ERROR]:" + err.message,
      });
    } else {
      res.json({
        viewee_id: req.body.viewee_id,
        viewer_id: tk.obj.id,
        start_time: req.body.start_time,
        finish_time: req.body.finish_time,
        status: "created",
      });
    }
  });
});

/**
 * @api {patch} /interviews
 * 修改面试信息
 */
router.patch("/", function (req, res, next) {
  var sql;
  sql = `SELECT * FROM interview WHERE id = ${req.body.iid}`;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR]:", err.message);
      res.status(500).json({
        data: "[SELECT ERROR]:" + err.message,
      });
    } else {
      if (result.length > 0) {
        sql = `UPDATE interview SET `;
        if (
          !req.body.viewee_id &&
          !req.body.start_time &&
          !req.body.finish_time
        ) {
          res.status(403).json({
            data: "参数错误",
          });
        } else {
          if (req.body.viewee_id) {
            sql += `viewee_id = ${req.body.viewee_id},`;
          }
          if (req.body.start_time) {
            sql += `start_time = '${req.body.start_time}',`;
          }
          if (req.body.finish_time) {
            sql += `finish_time = '${req.body.finish_time}',`;
          }
          sql = sql.substring(0, sql.length - 1);
          sql += ` WHERE id = ${req.body.iid}`;
          //   console.log(sql);
          connection.query(sql, function (err, result) {
            if (err) {
              console.log("[UPDATE ERROR]:", err.message);
              res.status(500).json({
                data: "[UPDATE ERROR]:" + err.message,
              });
            } else {
              res.json({
                data: "更新成功",
              });
            }
          });
        }
      } else {
        res.status(404).json({
          data: "面试ID不存在",
        });
      }
    }
  });
});

module.exports = router;
