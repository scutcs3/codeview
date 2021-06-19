type ContextType = { commit: any; state: any };
const actions = {
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
