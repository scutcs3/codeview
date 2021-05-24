import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            isLogin: localStorage.getItem('token') !== null,
        }
    },
    mutations: {
        login(state, payload) {
            state.isLogin = true;
            localStorage.setItem('token', payload.token);
        },
        logout(state) {
            state.isLogin = false;
            localStorage.removeItem('token');
        }
    }
})

export default store;