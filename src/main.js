import Vue from 'vue'
import App from './App.vue'
//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入路由
import router from './router'
//引入vuex
import store from './store'
//测试请求
import { getData } from './api';
getData()

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
