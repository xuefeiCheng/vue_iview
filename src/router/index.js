import Vue from 'vue'
import Router from 'vue-router'
import LayOut from '@/components/layout/layOut'
import helloWorld from '@/components/HelloWorld'

Vue.use(Router)

const initialRouteMap = [
  {
    path: '/',
    redirect: '/menu',
    name: 'Menu',
    component: LayOut,
    children: [
      {
        path: 'menu',
        name: '首页',
        meta: {
          requireAuth: false
        },
        component: helloWorld
      }
    ]
  }
]
const router = new Router({
  routes: initialRouteMap
})

export default router
