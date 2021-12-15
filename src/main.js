import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import getHashValue from './mixins/UrlUtils.vue'

const app = createApp(App)
app.mixin(getHashValue)
app.use(router)
app.mount('#app')
