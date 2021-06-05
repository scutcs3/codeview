// 全局变量模块
// 适配vue-cli和vite

// 构建号（从1开始，每次构建自动递增，由Github Action传入）
let CV_APP_BUILD_NUMBER;
// 构建ID，（Github Actions）
let CV_APP_BUILD_ID;
// 构建时间
let CV_APP_BUILD_TIME;

if (typeof process == "undefined") {
  // vite环境
} else {
  // webpack环境
  CV_APP_BUILD_NUMBER = process.env.BUILD_NUMBER || "local_test";
  CV_APP_BUILD_ID = process.env.BUILD_ID || "";
  CV_APP_BUILD_TIME = new Date().toISOString();
}

module.exports = {
  CV_APP_BUILD_NUMBER,
  CV_APP_BUILD_ID,
  CV_APP_BUILD_TIME,
};
