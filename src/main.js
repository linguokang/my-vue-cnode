// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import './assets/scss/reset.css'

import ElementUI from 'element-ui'
require('element-ui/lib/theme-default/index.css')



Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

//router.beforeEach((to, from, next) => {
//  // 处理左侧滚动不影响右边
//  // $('html, body, #page').removeClass('scroll-hide');
//  $('body').css('overflow', 'auto');
//  if (to.matched.some(record => record.meta.requiresAuth)) {
//    if (store.state.userInfo.userId) {
//      next();
//    } else {
//      next({
//        path: '/login',
//        query: { redirect: to.fullPath }
//      });
//    }
//  } else {
//    next();
//  }
//});

router.beforeEach((to, from, next) => {
  //// ...
  //if(to.name == from.name){
  //  router.go(0);
  //}
  next()
})
