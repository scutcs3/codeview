import { createStore } from "vuex";

import state from "./state";
import mutations from "./mutations";
import getters from "./getters";

const store = createStore({
  state,
  mutations,
  getters,
});

export default store;
