import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import urlUtils from './mixins/UrlUtils.vue'
import cookies from './mixins/Cookies.vue'
import globals from './mixins/Globals.vue'

const app = createApp(App)
app.mixin(urlUtils)
app.mixin(cookies)
app.mixin(globals)
app.use(router)
app.mount('#app')
