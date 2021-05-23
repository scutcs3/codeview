import { createApp } from 'vue'

import App from './App.vue'
import router from './router.js'
import store from './store.js'

import './main.css'
import installElementPlus from './plugins/element'

if (process.env.VUE_APP_MOCK === "true") {
    console.log('Mock enabled!');
    require('./mock.js')
}

const app = createApp(App);
installElementPlus(app);

app.use(router);
app.use(store);
app.mount('#app');

export default app;