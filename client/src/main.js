import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import http from './utils/http'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI);
// 挂载到 Vue 上
Vue.prototype.$http = http;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
