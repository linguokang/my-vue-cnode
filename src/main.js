// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './vuex/user';
import './assets/scss/reset.css'

import ElementUI from 'element-ui'
require('element-ui/lib/theme-default/index.css')


Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = axios

//用户刷新vuex丢失，重新赋值
if(window.sessionStorage.user){
  store.dispatch('setUserInfo',JSON.parse(window.sessionStorage.user))
}




router.beforeEach((to, from, next) => {
  console.log(999)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    //window.window.sessionStorage.user
    if (!store.state.userInfo.userId) {
      console.log(888)
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
