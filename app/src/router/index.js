import Vue from 'vue'
import Router from 'vue-router'
import SntRequest from '@/components/snt-request'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'snt-request',
      component: SntRequest
    }
  ]
})
