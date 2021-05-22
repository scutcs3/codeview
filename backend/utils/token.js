const jwt = require('jsonwebtoken');

const secret = 'codeview';

var createToken = function (data, exp) {
    // 过期时间
    exp = exp ? exp : 60 * 60 * 24;
    // 生成token
    var token = jwt.sign(data, secret, { expiresIn: exp });
    return token;
};

var verifyToken = (token) => {
    var info = jwt.verify(token, secret, (error, res) => {
        var data = {};
        if (error) {
            data.code = '606';
            data.msg = 'token验证失败';
            data.obj = error;
        } else {
            data.code = '608';
            data.msg = 'token验证成功';
            data.obj = res;
        }
        return data;
    });
    return info;
};

module.exports = { createToken, verifyToken };