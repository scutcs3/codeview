import { CV_WS_API } from "../global";
type ContextType = { commit: any; state: any };
const actions = {
  wsOpen({ commit, state }: ContextType, payload: any) {
    console.log("wsOpen", CV_WS_API);
    if (!CV_WS_API) return;
    if (state.ws) {
      console.log("已有WebSocket连接，尝试关闭");
      state.ws.close();
      state.ws = null;
    }
    state.ws = new WebSocket(CV_WS_API);
    console.log(state.ws);
    state.ws.onopen = function () {
      console.log("WebSocket 连接建立");
      state.wsId = payload.id;
      if (state.ws.readyState != WebSocket.OPEN) {
        return;
      }
      commit(
        "wsSend",
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
  wsClose({ state }: ContextType) {
    console.log("wsClose");
    if (!CV_WS_API) return;
    if (state.ws.readyState != WebSocket.OPEN) {
      return;
    }
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
  updateCodeEditor({ commit, state }: ContextType, payload: any) {
    if (payload.value != state.codeEditor.value) {
      commit("wsSend", {
        type: "code",
        uid: localStorage.getItem("user.id"),
        value: payload.value,
        language: payload.language,
        theme: payload.theme,
      });
    }
    Object.assign(state.codeEditor, payload);
  },
};

export default actions;
