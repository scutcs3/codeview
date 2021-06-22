const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = {
  pages: {
    index: "src/main.ts",
    404: "src/main.ts",
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
