import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import vueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(ElementUI).use(vueQuillEditor)
Vue.config.productionTip = false
Vue.config.devtools = true
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
