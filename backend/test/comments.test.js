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

describe('GET /comments', function () {
    it('测试 不带token', function (done) {
        request
            .get('/comments?iid=1')
            .set('Accept', 'application/json')
            .expect(401)
            .end(function (err, res) {
                should.not.exist(err);
                done();
            });
    });
    it('测试 iid', function (done) {
        request
            .get('/comments?iid=1')
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                res.body.data.length.should.be.exactly(1);
                done();
            });
    });
    it('测试 cid', function (done) {
        request
            .get('/comments?iid=1&cid=1')
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                res.body.data.length.should.be.exactly(1);
                done();
            });
    });
    it('测试 since', function (done) {
        request
            .get('/comments?iid=1&since=2021-05-05 00:00:00')
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                res.body.data.length.should.be.exactly(1);
                done();
            });
    });
});

describe('POST /comments', function () {
    it('测试 创建留言', function (done) {
        request
            .post('/comments')
            .set('Authorization', 'Bearer ' + token)
            .send({
                iid: 1,
                content: "test",
            })
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                done();
            });
    });
    it('测试 创建失败', function (done) {
        request
            .post('/comments')
            .set('Authorization', 'Bearer ' + token)
            .send({
                iid: 1,
            })
            .expect(400)
            .end(function (err, res) {
                should.not.exist(err);
                done();
            });
    });
    it('测试 不带token', function (done) {
        request
            .post('/comments')
            .send({
                iid: 1,
                content: 'test'
            })
            .expect(401)
            .end(function (err, res) {
                should.not.exist(err);
                done();
            });
    });
    after(function () {
        var connection = require('../config/mysql');
        var sql = `DELETE FROM comment WHERE interview_id = 1 AND content = 'test'`;
        connection.query(sql, function (err, result) { });
    });
});
