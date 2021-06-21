const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = {
  devServer: {
    host: "0.0.0.0",
    disableHostCheck: true,
  },
  configureWebpack: {
    devtool: "inline-source-map",
    plugins: [
      new MonacoWebpackPlugin({
        languages: ["javascript", "typescript"],
      }),
    ],
  },
};
