import Vue from 'vue'
import Router from 'vue-router'
import EnterRequest from '@/components/enter-request'
import RequestsList from '@/components/requests-list'
import Request from  '@/components/request'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/list',
      name: 'requests-list',
      component: RequestsList
    },
    {
      path: '/enter',
      name: 'enter-request',
      component: EnterRequest
    },
    {
      path: '/request/:requestId',
      name: 'request',
      component: Request
    }
  ]
})
