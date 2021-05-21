const Mock = require('mockjs');
const Random = Mock.Random;

const baseUrl = 'https://virtserver.swaggerhub.com/tootal/codeview/1.0.0';

var originMock = Mock.mock;

Mock.mock = function(url, callback) {
    return originMock(baseUrl + url, callback);
}


Mock.mock('/problems', () => {
    let list = [];
    for (let i = 0; i < 30; i++) {
        list.push({
            title: Random.ctitle(),
            content: Random.cparagraph(),
            id: i + 1,
            owner_id: 0,
            created_at: Random.datetime('yyyy-MM-dd HH:mm:ss'),
            updated_at: Random.datetime('yyyy-MM-dd HH:mm:ss'),
        })
    }
    return JSON.stringify(list);
});