const mutations = {
  login(state, payload) {
    state.isLogin = true;
    localStorage.setItem("user.token", payload.token);
    localStorage.setItem("user.id", payload.id);
    localStorage.setItem("user.email", payload.email);
  },
  logout(state) {
    state.isLogin = false;
    localStorage.removeItem("user.token");
    localStorage.removeItem("user.id");
    localStorage.removeItem("user.email");
  },
  wsOpen(state, payload) {
    if (state.ws) {
      state.ws.close();
      state.ws = null;
    }
    state.ws = new WebSocket(process.env.VUE_APP_WS_API);
    state.ws.onopen = function () {
      console.log("WebSocket 连接建立");
      state.wsId = payload.id;
      state.ws.send(
        JSON.stringify({
          type: "open",
          interviewID: payload.id,
          uid: localStorage.getItem("user.id"),
        })
      );
    };
    state.ws.onclose = function (e) {
      state.wsMessage = [];
      console.log("WebSocket 连接关闭", e);
    };
    state.ws.onmessage = function (event) {
      console.log("WebSocket 服务端返回的数据:" + event.data);
      state.wsMessage.push(JSON.parse(event.data));
    };
  },
  wsSend(state, payload) {
    payload.interviewID = state.wsId; //自动添加面试ID
    payload = JSON.stringify(payload);
    console.log("WebSocket 发送数据: ", payload);
    state.ws.send(payload);
  },
  wsClose(state) {
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
};

export default mutations;