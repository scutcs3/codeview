const fs = require("fs");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = {
  pages: {
    index: "src/main.ts",
    404: "src/main.ts",
  },
  devServer: {
    host: "localhost",
    disableHostCheck: true,
    https: true,
    key: fs.readFileSync("config/localhost+2-key.pem"),
    cert: fs.readFileSync("config/localhost+2.pem"),
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
