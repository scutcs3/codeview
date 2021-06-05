import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      isLogin: localStorage.getItem("token") !== null,
      userId: 0,
    };
  },
  mutations: {
    login(state, payload) {
      state.isLogin = true;
      state.userId = payload.id;
      localStorage.setItem("token", payload.token);
    },
    logout(state) {
      state.isLogin = false;
      state.userId = 0;
      localStorage.removeItem("token");
    },
  },
});

export default store;
