const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = {
  publicPath: "./",
  devServer: {
    disableHostCheck: true,
  },
  configureWebpack: {
    devtool: "inline-source-map",
    plugins: [new MonacoWebpackPlugin()],
  },
};
