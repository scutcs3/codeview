const state = {
  isLogin: localStorage.getItem("user.token") !== null,
  ws: null,
  wsId: 0,
  wsMessage: [],
  codeEditor: {
    value: "", // 编辑器内容
    readOnly: false, // 只读模式
    language: "javascript", // 语言类型
    theme: "vs", // 编辑器主题
  },
};

export default state;
