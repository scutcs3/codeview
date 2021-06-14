const getters = {
  wsChatMsg(state: any) {
    return state.wsMessage.filter((msg: any) => msg.type === "chat");
  },
  wsCodeMsg(state: any) {
    return state.wsMessage.filter((msg: any) => msg.type === "code");
  },
  //当前在线人数
  wsCount(state: any) {
    const infoMsg = state.wsMessage.filter((msg: any) => {
      return msg.type === "open" || msg.type === "close";
    });
    const len = infoMsg.length;
    if (len === 0) return 0;
    else {
      return infoMsg[len - 1].count;
    }
  },
};

export default getters;
