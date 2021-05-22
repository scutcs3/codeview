const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

// 构建号（从1开始递增）
process.env.VUE_APP_BUILD_NUMBER = process.env.BUILD_NUMBER || 'local_test';
// 构建ID（用于生成链接）
process.env.VUE_APP_BUILD_ID = process.env.BUILD_ID || '';
// 构建时间
process.env.VUE_APP_BUILD_TIME = new Date().toISOString();
// 是否使用Mock（如果本地没有后端服务器请选择是）
process.env.VUE_APP_MOCK = process.env.VUE_APP_MOCK || "true";
// 后端API接口
if (process.env.NODE_ENV == "development") {
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