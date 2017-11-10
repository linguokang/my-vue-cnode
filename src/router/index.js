import Vue from 'vue'
import Router from 'vue-router'
import home from '@/page/home'
import topic from '@/page/topic'
import user from '@/page/user'
import login from '@/page/login'
import create from '@/page/create'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base:'/my-vue-cnode/',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/topic/:id',
      name: 'topic',
      component: topic
    },
    {
      path: '/user/:name',
      name: 'user',
      component: user
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/create',
      name: 'create',
      component: create,
      meta: { requiresAuth: true }
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
