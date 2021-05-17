import { createApp } from 'vue'

import App from './App.vue'
import router from './routes.js'
import './main.css'
import installElementPlus from './plugins/element'

const app = createApp(App)
installElementPlus(app)

app.use(router)

app.mount('#app')