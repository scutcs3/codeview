const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

// 构建号（从1开始递增）
process.env.VUE_APP_BUILD_NUMBER = process.env.BUILD_NUMBER || 'local_test';
// 构建ID（用于生成链接）
process.env.VUE_APP_BUILD_ID = process.env.BUILD_ID || '';
// 构建时间
process.env.VUE_APP_BUILD_TIME = new Date().toLocaleString();
// 后端API接口
if (process.env.DEBUG) {
    process.env.VUE_APP_API = "http://localhost:3000"
} else {
    process.env.VUE_APP_API = "https://virtserver.swaggerhub.com/tootal/codeview/1.0.0"
}

module.exports = {
    publicPath: './',
    configureWebpack: {
        plugins: [
            new MonacoWebpackPlugin()
        ]
    }
}