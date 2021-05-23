var supertest = require('supertest');
var express = require('express');
var app = express();
var request = supertest(app);
var should = require('should');

describe('GET /users', function () {
    it('测试 所有数据', function (done) {
        request
            .get('/users')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhIiwiaWF0IjoxNjIxNDM1MzEzLCJleHAiOjE2MjE1MjE3MTN9.cG9_Tdf4Mu-SeNroupptGxkDguGRwW8HVcXSRDZ93Dg')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                res.should.have.header('firstLink');
                res.should.have.header('lastLink');
                res.length.should.be.exactly(4);
                done();
            });
    });
    it('测试 所有数据 不带token', function (done) {
        request
            .get('/users')
            .set('Accept', 'application/json')
            .expect(401)
            .end(function (err, res) {
                done();
            });
    });
    it('测试 id', function (done) {
        request
            .get('/users?id=1')
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhIiwiaWF0IjoxNjIxNDM1MzEzLCJleHAiOjE2MjE1MjE3MTN9.cG9_Tdf4Mu-SeNroupptGxkDguGRwW8HVcXSRDZ93Dg')
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                res.length.should.be.exactly(1);
                done();
            });
    });
    it('测试 email', function (done) {
        request
            .get('/users?email=a')
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhIiwiaWF0IjoxNjIxNDM1MzEzLCJleHAiOjE2MjE1MjE3MTN9.cG9_Tdf4Mu-SeNroupptGxkDguGRwW8HVcXSRDZ93Dg')
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                res.length.should.be.exactly(1);
                done();
            });
    });
    it('测试 name', function (done) {
        request
            .get('/users?name=a')
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhIiwiaWF0IjoxNjIxNDM1MzEzLCJleHAiOjE2MjE1MjE3MTN9.cG9_Tdf4Mu-SeNroupptGxkDguGRwW8HVcXSRDZ93Dg')
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                res.length.should.be.exactly(1);
                done();
            });
    });
    it('测试 分页', function (done) {
        request
            .get('/users?page=1&per_page=30')
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhIiwiaWF0IjoxNjIxNDM1MzEzLCJleHAiOjE2MjE1MjE3MTN9.cG9_Tdf4Mu-SeNroupptGxkDguGRwW8HVcXSRDZ93Dg')
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                res.length.should.be.exactly(4);
                done();
            });
    });
});

describe('POST /users', function () {
    it('测试 注册成功', function (done) {
        request
            .post('/users')
            .send({
                email: 'test@test.com',
                password: 'test'
            })
            .expect(200)
            .end(function (err, res) {
                done();
            });
    });
    it('测试 参数错误', function (done) {
        request
            .post('/users')
            .send({
                email: 'test',
                password: 'test'
            })
            .expect(400)
            .end(function (err, res) {
                done();
            });
    });
    it('测试 用户已存在', function (done) {
        request
            .post('/users')
            .send({
                email: 'a',
                password: 'test'
            })
            .expect(409)
            .end(function (err, res) {
                done();
            });
    });
});

describe('POST /tokens', function () {
    it('测试 登录成功', function (done) {
        request
            .post('/tokens')
            .send({
                email: 'a',
                password: 'a'
            })
            .expect(200)
            .end(function (err, res) {
                done();
            });
    });
    it('测试 验证失败', function (done) {
        request
            .post('/tokens')
            .send({
                email: 'a',
                password: 'b'
            })
            .expect(400)
            .end(function (err, res) {
                done();
            });
    });
});

describe('PATCH /users', function () {
    it('测试 修改成功', function (done) {
        request
            .patch('/users')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhIiwiaWF0IjoxNjIxNDM1MzEzLCJleHAiOjE2MjE1MjE3MTN9.cG9_Tdf4Mu-SeNroupptGxkDguGRwW8HVcXSRDZ93Dg')
            .send({
                id: 1,
                name: 'a',
                password: 'ac'
            })
            .expect(200)
            .end(function (err, res) {
                done();
            });
    });
    it('测试 没有权限', function (done) {
        request
            .patch('/users')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhIiwiaWF0IjoxNjIxNDM1MzEzLCJleHAiOjE2MjE1MjE3MTN9.cG9_Tdf4Mu-SeNroupptGxkDguGRwW8HVcXSRDZ93Dg')
            .send({
                id: 2,
                name: 'a',
                password: 'ac'
            })
            .expect(403)
            .end(function (err, res) {
                done();
            });
    });
    it('测试 需要登录', function (done) {
        request
            .patch('/users')
            .send({
                id: 1,
                name: 'a',
                password: 'ac'
            })
            .expect(401)
            .end(function (err, res) {
                done();
            });
    });
    it('测试 找不到', function (done) {
        request
            .patch('/users')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhIiwiaWF0IjoxNjIxNDM1MzEzLCJleHAiOjE2MjE1MjE3MTN9.cG9_Tdf4Mu-SeNroupptGxkDguGRwW8HVcXSRDZ93Dg')
            .send({
                id: 100,
                name: 'a',
                password: 'ac'
            })
            .expect(404)
            .end(function (err, res) {
                done();
            });
    });
});