import Vue from 'vue'
import Router from 'vue-router'
import home from '@/page/home'
import topic from '@/page/topic'

Vue.use(Router)

export default new Router({
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
    }
  ]
})
