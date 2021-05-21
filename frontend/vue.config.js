const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

// 构建号（从1开始递增）
process.env.VUE_APP_BUILD_NUMBER = process.env.BUILD_NUMBER || 'local_test';
// 构建ID（用于生成链接）
process.env.VUE_APP_BUILD_ID = process.env.BUILD_ID || '';
// 构建时间
process.env.VUE_APP_BUILD_TIME = new Date().toLocaleString();

module.exports = {
    publicPath: './',
    configureWebpack: {
        plugins: [
            new MonacoWebpackPlugin()
        ]
    }
}