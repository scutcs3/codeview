const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  publicPath: './',
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin()
    ]
  }
}