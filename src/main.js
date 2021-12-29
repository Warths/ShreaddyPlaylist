import { createApp } from 'vue'
import VueTippy from 'vue-tippy'
import App from './App.vue'
import router from './router'
import urlUtils from './mixins/UrlUtils.vue'
import cookies from './mixins/Cookies.vue'
import globals from './mixins/Globals.vue'
import ContrastUtils from './mixins/ContrastUtils.vue'
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css'; // optional for styling

const app = createApp(App)
app.mixin(urlUtils)
app.mixin(cookies)
app.mixin(globals)
app.mixin(ContrastUtils)
app.use(router)

app.use(
    VueTippy,
    // optional
    {
      directive: 'tippy', // => v-tippy
      component: 'tippy', // => <tippy/>
      componentSingleton: 'tippy-singleton', // => <tippy-singleton/>,
      defaultProps: {
        placement: 'auto-end',
        allowHTML: true,
      }, // => Global default options * see all props
    }
  )

app.mount('#app')
