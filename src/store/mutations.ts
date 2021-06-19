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
  wsOpen(state: any, payload: any) {
    if (!CV_WS_API) return;
    if (state.ws) {
      state.ws.close();
      state.ws = null;
    }
    state.ws = new WebSocket(CV_WS_API);
    state.ws.onopen = function () {
      console.log("WebSocket 连接建立");
      state.wsId = payload.id;
      if (state.ws.readyState != WebSocket.OPEN) {
        return;
      }
      state.ws.send(
        JSON.stringify({
          type: "open",
          interviewID: payload.id,
          uid: localStorage.getItem("user.id"),
        })
      );
    };
    state.ws.onclose = function (e: any) {
      state.wsMessage = [];
      console.log("WebSocket 连接关闭", e);
    };
    state.ws.onmessage = function (event: any) {
      // 不打印自己发出去的消息
      const data = JSON.parse(event.data);
      if (data.uid !== localStorage.getItem("user.id")) {
        console.log("WebSocket 服务端返回的数据:" + event.data);
      }
      state.wsMessage.push(data);
    };
  },
  wsSend(state: any, payload: any) {
    if (!CV_WS_API) return;
    payload.interviewID = state.wsId; //自动添加面试ID
    payload = JSON.stringify(payload);
    if (state.ws.readyState != WebSocket.OPEN) {
      return;
    }
    console.log("WebSocket 发送数据: ", payload);
    state.ws.send(payload);
  },
  wsClose(state: any) {
    if (!CV_WS_API) return;
    if (state.ws) {
      state.ws.send(
        JSON.stringify({
          type: "close",
          interviewID: state.wsId,
          uid: localStorage.getItem("user.id"),
        })
      );
      state.ws.close();
      state.ws = null;
    }
  },
  updateCodeEditor(state: any, payload: any) {
    Object.assign(state.codeEditor, payload);
  },
};

export default mutations;
