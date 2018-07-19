import Vue from 'vue'
import Router from 'vue-router'
import EnterRequest from '@/components/enter-request'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'enter-request',
      component: EnterRequest
    }
  ]
})
