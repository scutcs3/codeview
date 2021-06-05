var express = require("express");
var router = express.Router();

var token = require("../utils/token");

var connection = require("../config/mysql");

function getUserDetail(field, param, page, per_page, res, req) {
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
      page = page ? parseInt(page) : 1;
      per_page = per_page ? parseInt(per_page) : 30;
      var totalPageNum = Math.ceil((totalRecord + per_page - 1) / per_page);
      var preSize = (page - 1) * per_page;

      if (param) {
        sql = `SELECT * FROM user where ${field} = '${param}' limit ${preSize},${per_page}`;
      } else {
        sql = `SELECT * FROM user limit ${preSize},${per_page}`;
      }
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

  return res;
}

/**
 * @api {get} /users
 * 获取用户信息
 */
router.get("/", function (req, res) {
  var authHeader = req.headers.authorization; //获取认证情况的集合
  if (authHeader) {
    var info = token.verifyToken(authHeader.substring(7));
    if (info.code == "606") {
      res.status(401).json({
        data: info.obj,
      });
    } else {
      var query = req.query;
      if (query.id) {
        getUserDetail("id", query.id, query.page, query.per_page, res, req);
      } else if (query.email) {
        getUserDetail(
          "email",
          query.email,
          query.page,
          query.per_page,
          res,
          req
        );
      } else if (query.name) {
        getUserDetail("name", query.name, query.page, query.per_page, res, req);
      } else {
        getUserDetail(null, null, query.page, query.per_page, res, req);
      }
    }
  } else {
    res.status(401).json({
      data: "需要登录",
    });
  }
});

/**
 * @api {post} /users
 * 注册用户
 * @api {post} /tokens
 * 获取验证令牌
 */
router.post("/", function (req, res) {
  if (req.baseUrl == "/users") {
    var pattern = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    if (!pattern.test(req.body.email) || typeof req.body.password != "string") {
      res.status(400).json({
        data: "参数错误",
      });
    } else {
      var sql = `SELECT * FROM user where email = '${req.body.email}'`;
      connection.query(sql, function (err, result) {
        if (err) {
          console.log("[SELECT ERROR]:", err.message);
          res.status(500).json({
            data: "[SELECT ERROR]:" + err.message,
          });
        } else {
          if (result.length > 0) {
            res.status(409).json({
              data: "用户已存在",
            });
          } else {
            sql = `INSERT INTO user(email,password) VALUES ('${req.body.email}','${req.body.password}')`;
            connection.query(sql, function (err, result) {
              if (err) {
                console.log("[INSERT ERROR]:", err.message);
                res.status(500).json({
                  data: "[INSERT ERROR]:" + err.message,
                });
              } else {
                var data = {
                  id: result.insertId,
                  email: req.body.email,
                };
                res.json({
                  token: token.createToken(data, 60 * 60 * 24),
                  id: data.id,
                });
              }
            });
          }
        }
      });
    }
  } else {
    let sql = `SELECT * FROM user WHERE email = '${req.body.email}' AND password = '${req.body.password}'`;
    connection.query(sql, function (err, result) {
      if (err) {
        console.log("[SELECT ERROR]:", err.message);
        res.status(500).json({
          data: "[SELECT ERROR]:" + err.message,
        });
      } else {
        if (result.length > 0) {
          var data = {
            id: result[0].id,
            email: req.body.email,
          };
          res.json({
            token: token.createToken(data, 60 * 60 * 24),
            id: data.id,
          });
        } else {
          res.status(400).json({
            data: "验证失败",
          });
        }
      }
    });
  }
});

/**
 * @api {patch} /users
 * 修改用户信息
 */
router.patch("/", function (req, res) {
  var authHeader = req.headers.authorization; //获取认证情况的集合
  if (authHeader) {
    var tk = token.verifyToken(authHeader.substring(7));
    if (tk.code == "606") {
      res.status(401).json({
        data: tk.obj,
      });
    } else {
      if (req.body.old_password && req.body.new_password) {
        var sql;
        sql = `SELECT * FROM user WHERE id = ${tk.obj.id} `;
        connection.query(sql, function (err, result) {
          if (err) {
            console.log("[SELECT ERROR]:", err.message);
            res.status(500).json({
              data: "[SELECT ERROR]:" + err.message,
            });
          } else {
            if (result.length > 0) {
              if (result[0].password == req.body.old_password) {
                sql = `UPDATE user SET password = '${req.body.new_password}' WHERE id = ${tk.obj.id}`;
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
              } else {
                res.status(403).json({
                  data: "旧密码错误",
                });
              }
            } else {
              res.status(404).json({
                data: "找不到指定id的用户",
              });
            }
          }
        });
      } else {
        res.status(400).json({
          data: "参数错误",
        });
      }
    }
  } else {
    res.status(401).json({
      data: "需要登录",
    });
  }
});

module.exports = router;
