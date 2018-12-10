import Vue from 'vue'
import Router from 'vue-router'
// import NProgress from 'nprogress' // Progress 进度条
// import 'nprogress/nprogress.css'// Progress 进度条样式
import LayOut from '@/components/layout/layOut'
import helloWorld from '@/components/HelloWorld'

Vue.use(Router)

const initialRouteMap = [
  {
    path: '/menu',
    redirect: '/menu/hello',
    name: 'Menu',
    component: LayOut,
    children: [
      {
        path: 'hello',
        name: '首页',
        meta: {
          requireAuth: false
        },
        component: helloWorld
      }
    ]
  },
  {
    path: '/menu1',
    redirect: '/menu1/hello1',
    name: 'Menu',
    component: LayOut,
    children: [
      {
        path: 'hello1',
        name: '首页',
        meta: {
          requireAuth: false
        },
        component: helloWorld
      }
    ]
  }
]
// 简单配置
// NProgress.inc(0.2)
// NProgress.configure({ easing: 'ease', speed: 50000, showSpinner: false })
const router = new Router({
  routes: initialRouteMap
})

// 全局路由开始守卫
router.beforeEach((to, from, next) => {
  // store.commit('SET_CURRENT_PATH', to.fullPath)
  console.log(to.fullPath)
  sessionStorage.setItem('currentPath', to.fullPath)
  next()
})

// 全局路由结束守卫
// router.afterEach(() => {
//   NProgress.done()
// })
export default router
