var supertest = require("supertest");
var app = require("../app");
var request = supertest(app);
const should = require("should");

var token = "";
describe("GET token", function () {
  it("获取 token", function (done) {
    request
      .post("/tokens")
      .send({
        email: "a",
        password: "a",
      })
      .expect(200)
      .end(function (err, res) {
        token = res.body.token;
        done();
      });
  });
});

describe("GET /users", function () {
  it("测试 所有数据", function (done) {
    request
      .get("/users")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + token)
      .expect(200)
      .end(function (err, res) {
        should.not.exist(err);
        res.headers.should.have.property("total-count");
        res.body.data.length.should.be.exactly(5);
        done();
      });
  });
  it("测试 所有数据 不带token", function (done) {
    request
      .get("/users")
      .set("Accept", "application/json")
      .expect(401)
      .end(function (err, res) {
        should.not.exist(err);
        done();
      });
  });
  it("测试 id", function (done) {
    request
      .get("/users?id=1")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + token)
      .expect(200)
      .end(function (err, res) {
        should.not.exist(err);
        res.body.data.length.should.be.exactly(1);
        done();
      });
  });
  it("测试 email", function (done) {
    request
      .get("/users?email=a")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + token)
      .expect(200)
      .end(function (err, res) {
        should.not.exist(err);
        res.body.data.length.should.be.exactly(2);
        done();
      });
  });
  it("测试 分页", function (done) {
    request
      .get("/users?page=1&per_page=30")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + token)
      .expect(200)
      .end(function (err, res) {
        should.not.exist(err);
        res.body.data.length.should.be.exactly(5);
        done();
      });
  });
});

describe("POST /users", function () {
  it("测试 注册成功", function (done) {
    request
      .post("/users")
      .send({
        email: "test@test.com",
        password: "test",
      })
      .expect(200)
      .end(function (err, res) {
        should.not.exist(err);
        done();
      });
  });
  it("测试 参数错误", function (done) {
    request
      .post("/users")
      .send({
        email: "test",
        password: "test",
      })
      .expect(400)
      .end(function (err, res) {
        should.not.exist(err);
        done();
      });
  });
  it("测试 用户已存在", function (done) {
    request
      .post("/users")
      .send({
        email: "111@a.com",
        password: "e",
      })
      .expect(409)
      .end(function (err, res) {
        should.not.exist(err);
        done();
      });
  });
  after(function () {
    var connection = require("../config/mysql");
    var sql = `DELETE FROM user WHERE email = 'test@test.com'`;
    connection.query(sql, function (err, result) {});
  });
});

describe("POST /tokens", function () {
  it("测试 登录成功", function (done) {
    request
      .post("/tokens")
      .send({
        email: "a",
        password: "a",
      })
      .expect(200)
      .end(function (err, res) {
        should.not.exist(err);
        done();
      });
  });
  it("测试 验证失败", function (done) {
    request
      .post("/tokens")
      .send({
        email: "a",
        password: "b",
      })
      .expect(400)
      .end(function (err, res) {
        should.not.exist(err);
        done();
      });
  });
});

describe("PATCH /users", function () {
    it("测试 旧密码错误", function (done) {
    request
      .patch("/users")
      .set("Authorization", "Bearer " + token)
      .send({
        old_password: "ac",
        new_password: "ab",
      })
      .expect(403)
      .end(function (err, res) {
        should.not.exist(err);
        done();
      });
  });
  it("测试 需要登录", function (done) {
    request
      .patch("/users")
      .send({
        old_password: "a",
        new_password: "ab",
      })
      .expect(401)
      .end(function (err, res) {
        should.not.exist(err);
        done();
      });
  });
  it("测试 参数错误", function (done) {
    request
      .patch("/users")
      .set("Authorization", "Bearer " + token)
      .send({
        new_password: "ac",
      })
      .expect(400)
      .end(function (err, res) {
        should.not.exist(err);
        done();
      });
  });
  it("测试 修改成功", function (done) {
    request
      .patch("/users")
      .set("Authorization", "Bearer " + token)
      .send({
        old_password: "a",
        new_password: "ac",
      })
      .expect(200)
      .end(function (err, res) {
        should.not.exist(err);
        done();
      });
  });
  after(function () {
    var connection = require("../config/mysql");
    var sql = `UPDATE user SET password = 'a' WHERE id = 1`;
    connection.query(sql, function (err, result) {
      if (err) console.log(err.message);
    });
  });
});
