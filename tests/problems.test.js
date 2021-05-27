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

describe("GET /problems", function () {
  it("测试 参数错误", function (done) {
    request
      .get("/problems")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + token)
      .expect(400)
      .end(function (err, res) {
        should.not.exist(err);
        done();
      });
  });
  it("测试 不带token", function (done) {
    request
      .get("/problems?pid=1")
      .set("Accept", "application/json")
      .expect(401)
      .end(function (err, res) {
        should.not.exist(err);
        done();
      });
  });
  it("测试 pid", function (done) {
    request
      .get("/problems?pid=1")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + token)
      .expect(200)
      .end(function (err, res) {
        should.not.exist(err);
        res.body.data.length.should.be.exactly(1);
        done();
      });
  });
  it("测试 iid", function (done) {
    request
      .get("/problems?iid=1")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + token)
      .expect(200)
      .end(function (err, res) {
        should.not.exist(err);
        res.body.data.length.should.be.exactly(1);
        done();
      });
  });
  it("测试 word", function (done) {
    request
      .get("/problems?word=ss")
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
      .get("/problems?pid=1&page=1&per_page=30")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + token)
      .expect(200)
      .end(function (err, res) {
        should.not.exist(err);
        res.body.data.length.should.be.exactly(1);
        done();
      });
  });
});

describe("POST /problems", function () {
  it("测试 添加题目到题库", function (done) {
    request
      .post("/problems")
      .set("Authorization", "Bearer " + token)
      .send({
        title: "test",
        content: "test",
      })
      .expect(200)
      .end(function (err, res) {
        should.not.exist(err);
        done();
      });
  });
  it("测试 添加题目到面试", function (done) {
    request
      .post("/problems")
      .set("Authorization", "Bearer " + token)
      .send({
        iid: 1,
        pid: 3,
      })
      .expect(200)
      .end(function (err, res) {
        should.not.exist(err);
        done();
      });
  });
  it("测试 不带token", function (done) {
    request
      .post("/problems")
      .send({
        title: "test",
        content: "test",
        iid: 1,
      })
      .expect(401)
      .end(function (err, res) {
        should.not.exist(err);
        done();
      });
  });
  it("测试 题目id不存在", function (done) {
    request
      .post("/problems")
      .set("Authorization", "Bearer " + token)
      .send({
        iid: 1,
        pid: 100,
      })
      .expect(404)
      .end(function (err, res) {
        should.not.exist(err);
        done();
      });
  });
  it("测试 面试id不存在", function (done) {
    request
      .post("/problems")
      .set("Authorization", "Bearer " + token)
      .send({
        iid: 100,
        pid: 1,
      })
      .expect(405)
      .end(function (err, res) {
        should.not.exist(err);
        done();
      });
  });
});

describe("DELETE /problems", function () {
  it("测试 删除面试题目", function (done) {
    request
      .delete("/problems")
      .set("Authorization", "Bearer " + token)
      .send({
        iid: 1,
        pid: 3,
      })
      .expect(200)
      .end(function (err, res) {
        should.not.exist(err);
        done();
      });
  });
  it("测试 删除题库题目", function (done) {
    request
      .delete("/problems")
      .set("Authorization", "Bearer " + token)
      .send({
        pid: 3,
      })
      .expect(200)
      .end(function (err, res) {
        should.not.exist(err);
        done();
      });
  });
  it("测试 没有权限", function (done) {
    request
      .delete("/problems")
      .set("Authorization", "Bearer " + token)
      .send({
        pid: 2,
      })
      .expect(403)
      .end(function (err, res) {
        should.not.exist(err);
        done();
      });
  });
  it("测试 找不到题目", function (done) {
    request
      .delete("/problems")
      .set("Authorization", "Bearer " + token)
      .send({
        pid: 100,
      })
      .expect(404)
      .end(function (err, res) {
        should.not.exist(err);
        done();
      });
  });
  it("测试 不带token", function (done) {
    request
      .delete("/problems")
      .send({
        pid: 1,
      })
      .expect(401)
      .end(function (err, res) {
        should.not.exist(err);
        done();
      });
  });
});

describe("PATCH /problems", function () {
  it("测试 修改成功", function (done) {
    request
      .patch("/problems")
      .set("Authorization", "Bearer " + token)
      .send({
        id: 1,
        title: "sss",
      })
      .expect(200)
      .end(function (err, res) {
        should.not.exist(err);
        done();
      });
  });
  it("测试 没有权限", function (done) {
    request
      .patch("/problems")
      .set("Authorization", "Bearer " + token)
      .send({
        id: 2,
        title: "ac",
      })
      .expect(403)
      .end(function (err, res) {
        should.not.exist(err);
        done();
      });
  });
  it("测试 需要登录", function (done) {
    request
      .patch("/problems")
      .send({
        id: 1,
        title: "a",
      })
      .expect(401)
      .end(function (err, res) {
        should.not.exist(err);
        done();
      });
  });
  it("测试 找不到", function (done) {
    request
      .patch("/problems")
      .set("Authorization", "Bearer " + token)
      .send({
        id: 100,
        title: "a",
      })
      .expect(404)
      .end(function (err, res) {
        should.not.exist(err);
        done();
      });
  });
});
