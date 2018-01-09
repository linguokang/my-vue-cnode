import Vue from 'vue'
import Router from 'vue-router'
//import home from '@/page/home'
//import topic from '@/page/topic'
//import user from '@/page/user'
//import login from '@/page/login'
//import create from '@/page/create'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base:'/my-vue-cnode/',
  routes: [
    {
      path: '/',
      name: 'home',
      //component: home
      //component(resolve) {
      //  require.ensure(['@/page/home'], () => {
      //    resolve(require('@/page/home'));
      //  });
      //},

      component: function (resolve) {require(['@/page/home'], resolve)}
    },
    {
      path: '/topic/:id',
      name: 'topic',
      //component: topic
      //component(resolve) {
      //  require.ensure(['@/page/topic'], () => {
      //    resolve(require('@/page/topic'));
      //  });
      //}
      component: function (resolve) {require(['@/page/topic'], resolve)}
    },
    {
      path: '/user/:name',
      name: 'user',
      //component: user
      //component(resolve) {
      //  require.ensure(['@/page/user'], () => {
      //    resolve(require('@/page/user'));
      //  });
      //}
      component: function (resolve) {require(['@/page/user'], resolve)}
    },
    {
      path: '/login',
      name: 'login',
      //component: login
      //component(resolve) {
      //  require.ensure(['@/page/login'], () => {
      //    resolve(require('@/page/login'));
      //  });
      //}
      component: function (resolve) {require(['@/page/login'], resolve)}
    },
    {
      path: '/create',
      name: 'create',
      //component: create,
      //component(resolve) {
      //  require.ensure(['@/page/create'], () => {
      //    resolve(require('@/page/create'));
      //  });
      //},
      component: function (resolve) {require(['@/page/create'], resolve)},
      meta: { requiresAuth: true }
    },
    {
      path: '*',
      //component: home
      //component(resolve) {
      //  require.ensure(['@/page/home'], () => {
      //    resolve(require('@/page/home'));
      //  });
      //}
      component: function (resolve) {require(['@/page/home'], resolve)}
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
