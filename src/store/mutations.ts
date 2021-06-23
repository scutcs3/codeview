import { CV_WS_API } from "../global";

const mutations = {
  login(state: any, payload: any) {
    state.isLogin = true;
    localStorage.setItem("user.token", payload.token);
    localStorage.setItem("user.id", payload.id);
    localStorage.setItem("user.email", payload.email);
  },
  logout(state: any) {
    state.isLogin = false;
    localStorage.removeItem("user.token");
    localStorage.removeItem("user.id");
    localStorage.removeItem("user.email");
  },
  wsSend(state: any, payload: any) {
    if (!CV_WS_API) return;
    payload.interviewID = state.wsId; //自动添加面试ID
    payload = JSON.stringify(payload);
    if (state.ws.readyState != WebSocket.OPEN) {
      console.log("WebSocket还未准备好就发送消息：", payload);
      return;
    }
    console.log("WebSocket 发送数据: ", payload);
    state.ws.send(payload);
  },
  updatePID(state: any, pid: String) {
    state.pid = pid;
  },
};

export default mutations;
