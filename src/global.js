// 全局变量模块
// 适配vue-cli和vite

// 构建号（从1开始，每次构建自动递增，由Github Action传入）
export let CV_BUILD_NUMBER = "local_test";
// 构建ID，（Github Actions）
export let CV_BUILD_ID = "";
// 构建时间
export let CV_BUILD_TIME = new Date().toISOString();
// 后端API接口模式，可在本地.env.local文件中覆盖此处配置
// mock -- 使用本地mock, 接口与test相同
// test -- 使用swagger提供的远程mock：https://virtserver.swaggerhub.com/tootal/codeview/1.0.0
// local -- 本地3000端口
// dev -- develop分支远程接口：http://cv-api.tootal.xyz
export let CV_API_MODE;
export let CV_API;
export let CV_WS_API;
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

if (typeof process == "undefined") {
  // vite环境
  console.log("Serve: Vite");
  CV_API_MODE = import.meta.env.VITE_API_MODE || "dev";
  CV_API = api_maps[CV_API_MODE];
  CV_WS_API = ws_maps[CV_API_MODE];
} else {
  // webpack环境
  console.log("Serve: Vue CLI (Webpack)");
  CV_BUILD_NUMBER = process.env.BUILD_NUMBER || "local_test";
  CV_BUILD_ID = process.env.BUILD_ID || "";
  CV_BUILD_TIME = new Date().toISOString();

  CV_API_MODE = process.env.VUE_APP_API_MODE || "dev";
  CV_API = api_maps[CV_API_MODE];
  CV_WS_API = ws_maps[CV_API_MODE];
}

console.log("Remote API: ", CV_API, "WS: ", CV_WS_API);
