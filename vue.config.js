const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

// 构建号（从1开始递增）
process.env.VUE_APP_BUILD_NUMBER = process.env.BUILD_NUMBER || "local_test";
// 构建ID（用于生成链接）
process.env.VUE_APP_BUILD_ID = process.env.BUILD_ID || "";
// 构建时间
process.env.VUE_APP_BUILD_TIME = new Date().toISOString();
// 后端API接口模式，可在本地.env.local文件中覆盖此处配置
// mock -- 使用本地mock, 接口与test相同
// test -- 使用swagger提供的远程mock：https://virtserver.swaggerhub.com/tootal/codeview/1.0.0
// local -- 本地3000端口
// dev -- develop分支远程接口：http://cv-api.tootal.xyz

const api_maps = {
  mock: "https://virtserver.swaggerhub.com/tootal/codeview/1.0.0",
  test: "https://virtserver.swaggerhub.com/tootal/codeview/1.0.0",
  local: "http://localhost:3000",
  dev: "http://cv-api.tootal.xyz",
};

const ws_maps = {
  local: "ws://localhost:3002",
  dev: "ws://cv-api.tootal.xyz:3002",
};

if (!process.env.VUE_APP_API_MODE) {
  if (process.env.NODE_ENV === "development") {
    process.env.VUE_APP_API_MODE = "dev";
  } else {
    process.env.VUE_APP_API_MODE = "dev";
  }
}

process.env.VUE_APP_API = api_maps[process.env.VUE_APP_API_MODE];
process.env.VUE_APP_WS_API = ws_maps[process.env.VUE_APP_API_MODE];

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
