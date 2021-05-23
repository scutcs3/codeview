var supertest = require('supertest');
var app = require('../app');
var request = supertest(app);
const should = require('should');

var token = "";
describe('GET token', function () {
    it('获取 token', function (done) {
        request
            .post('/tokens')
            .send({
                email: 'a',
                password: 'a'
            })
            .expect(200)
            .end(function (err, res) {
                token = res.body.token;
                done();
            });
    });
});

describe('GET /answers', function () {
    it('测试 不带token', function (done) {
        request
            .get('/answers?iid=1&pid=1')
            .set('Accept', 'application/json')
            .expect(401)
            .end(function (err, res) {
                should.not.exist(err);
                done();
            });
    });
    it('测试 获取成功', function (done) {
        request
            .get('/answers?iid=1&pid=1')
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                res.body.data.length.should.be.exactly(1);
                done();
            });
    });
    it('测试 参数错误', function (done) {
        request
            .get('/answers?iid=1')
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .expect(400)
            .end(function (err, res) {
                should.not.exist(err);
                done();
            });
    });
});

describe('POST /answers', function () {
    it('测试 提交答案', function (done) {
        request
            .post('/answers')
            .set('Authorization', 'Bearer ' + token)
            .send({
                language: 'c',
                content: "test",
                problem_id: 2,
                interview_id: 1
            })
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                done();
            });
    });
    it('测试 参数错误', function (done) {
        request
            .post('/answers')
            .set('Authorization', 'Bearer ' + token)
            .send({
                content: "test",
                problem_id: 2,
                interview_id: 1
            })
            .expect(400)
            .end(function (err, res) {
                should.not.exist(err);
                done();
            });
    });
    it('测试 不带token', function (done) {
        request
            .post('/answers')
            .send({
                language: 'c',
                content: "test",
                problem_id: 2,
                interview_id: 1
            })
            .expect(401)
            .end(function (err, res) {
                should.not.exist(err);
                done();
            });
    });
    after(function () {
        var connection = require('../config/mysql');
        var sql = `DELETE FROM answer WHERE interview_id = 1 AND problem_id = 2`;
        connection.query(sql, function (err, result) { });
    });
});
