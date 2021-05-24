var supertest = require('supertest');
var app = require('../app');
var request = supertest(app);
const should = require('should');

var token = "";
var token1 = "";
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
    it('获取 token1', function (done) {
        request
            .post('/tokens')
            .send({
                email: 'c',
                password: 'c'
            })
            .expect(200)
            .end(function (err, res) {
                token1 = res.body.token;
                done();
            });
    });
});

describe('GET /interviews', function () {
    it('测试 不带token', function (done) {
        request
            .get('/interviews?id=1')
            .set('Accept', 'application/json')
            .expect(401)
            .end(function (err, res) {
                should.not.exist(err);
                done();
            });
    });
    it('测试 id', function (done) {
        request
            .get('/interviews?id=1')
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                res.body.data.length.should.be.exactly(1);
                done();
            });
    });
    it('测试 role', function (done) {
        request
            .get('/interviews?role=viewer')
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                res.body.data.length.should.be.exactly(1);
                done();
            });
    });
    it('测试 面试ID不存在', function (done) {
        request
            .get('/interviews?id=2')
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .expect(404)
            .end(function (err, res) {
                should.not.exist(err);
                done();
            });
    });
    it('测试 没有权限', function (done) {
        request
            .get('/interviews?id=1')
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + token1)
            .expect(403)
            .end(function (err, res) {
                should.not.exist(err);
                done();
            });
    });
});

describe('POST /interviews', function () {
    it('测试 创建面试', function (done) {
        request
            .post('/interviews')
            .set('Authorization', 'Bearer ' + token)
            .send({
                viewee_id: 1,
                start_time: "2021-05-19 00:00:00",
                finish_time: "2021-05-19 00:10:00"
            })
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                done();
            });
    });
    it('测试 创建失败', function (done) {
        request
            .post('/interviews')
            .set('Authorization', 'Bearer ' + token)
            .send({
                viewee_id: 1,
            })
            .expect(400)
            .end(function (err, res) {
                should.not.exist(err);
                done();
            });
    });
    it('测试 不带token', function (done) {
        request
            .post('/interviews')
            .send({
                viewee_id: 1
            })
            .expect(401)
            .end(function (err, res) {
                should.not.exist(err);
                done();
            });
    });
    after(function () {
        var connection = require('../config/mysql');
        var sql = `DELETE FROM interview WHERE finish_time = '2021-05-19 00:10:00'`;
        connection.query(sql, function (err, result) { });
    });
});

describe('PATCH /interviews', function () {
    it('测试 修改成功', function (done) {
        request
            .patch('/interviews')
            .set('Authorization', 'Bearer ' + token)
            .send({
                iid: 1,
                start_time: '2021-05-19 00:08:00',
                finish_time: '2021-05-20 00:10:00'
            })
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                done();
            });
    });
    it('测试 参数错误', function (done) {
        request
            .patch('/interviews')
            .set('Authorization', 'Bearer ' + token)
            .send({
                iid: 1,
            })
            .expect(403)
            .end(function (err, res) {
                should.not.exist(err);
                done();
            });
    });
    it('测试 id不存在', function (done) {
        request
            .patch('/interviews')
            .set('Authorization', 'Bearer ' + token)
            .send({
                iid: 100,
                start_time: '2021-05-19 00:08:00',
            })
            .expect(404)
            .end(function (err, res) {
                should.not.exist(err);
                done();
            });
    });
    it('测试 需要登录', function (done) {
        request
            .patch('/interviews')
            .send({
                iid: 1,
                start_time: '2021-05-19 00:08:00',
            })
            .expect(401)
            .end(function (err, res) {
                should.not.exist(err);
                done();
            });
    });
});