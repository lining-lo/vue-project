import Vue from 'vue'
import App from './App.vue'
//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入路由
import router from './router'
//引入vuex
import store from './store'
//引入mockjs
import './api/mock'
//引入js-cookie
import Cookies from 'js-cookie';

Vue.use(ElementUI)

Vue.config.productionTip = false

//全局前置路由守卫
router.beforeEach((to, from, next) => {
  //获取token
  const token = Cookies.get('token')
  //token不存在
  if (!token && to.name !== 'login') {
    //跳转到登录页面
    next('login')
    //有token不能访问登录页面
  } else if (token && to.name === 'login') {
    //跳转到首页
    next('home')
  } else {//有token但是访问的不是登录页面
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  mounted(){
    store.commit('addMenu',router)
  }
}).$mount('#app')
