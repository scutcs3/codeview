const state = {
  isLogin: localStorage.getItem("user.token") !== null,
  ws: null,
  wsId: 0,
  wsMessage: [],
};

export default state;
