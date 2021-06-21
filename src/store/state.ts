function getCodeEditorConfig() {
  const localConfig = localStorage.getItem("codeEditor");
  if (localConfig) return JSON.parse(localConfig);
  else
    return {
      value: "", // 编辑器内容
      readOnly: false, // 只读模式
      language: "javascript", // 语言类型
      theme: "vs", // 编辑器主题
    };
}
const state = {
  isLogin: localStorage.getItem("user.token") !== null,
  ws: null,
  wsId: 0,
  wsMessage: [],
  codeEditor: getCodeEditorConfig(),
  pid: 0, // 当前题目ID
};

export default state;
