const getters = {
  wsChatMsg(state) {
    return state.wsMessage.filter((msg) => msg.type === "chat");
  },
};

export default getters;
