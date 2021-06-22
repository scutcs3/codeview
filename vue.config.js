const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = {
  pages: {
    index: "src/main.js",
    404: "src/main.js",
  },
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
