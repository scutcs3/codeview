const getters = {
  wsChatMsg(state) {
    return state.wsMessage.filter((msg) => msg.type === "chat");
  },
  wsCodeMsg(state) {
    return state.wsMessage.filter((msg) => msg.type === "code");
  },
  //当前在线人数
  wsCount(state) {
    let infoMsg = state.wsMessage.filter((msg) => {
      return msg.type === "open" || msg.type === "close";
    });
    let len = infoMsg.length;
    if (len === 0) return 0;
    else {
      return infoMsg[len - 1].count;
    }
  },
};

export default getters;
