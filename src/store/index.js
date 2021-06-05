import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      isLogin: localStorage.getItem("user.token") !== null,
    };
  },
  mutations: {
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
  },
});

export default store;
