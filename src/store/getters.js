const getters = {
  wsChatMsg(state) {
    return state.wsMessage.filter((msg) => msg.type === "chat");
  },
  wsCodeMsg(state) {
    return state.wsMessage.filter((msg) => msg.type === "code");
  },
};

export default getters;
