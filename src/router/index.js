import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import store from '@/store/index' // 引入全局store
import LayOut from '@/components/layout/layout'

import helloWorld from '@/components/HelloWorld'

Vue.use(Router)

export const asyncRouterMap = [
  {
    path: '/systemManage',
    redirect: '/systemManage/userManage',
    name: '系统管理',
    menuId: 'systemManage',
    component: LayOut,
    children: [
      { path: 'userManage', name: '用户管理', icon: 'ios-paper', component: helloWorld, menuId: 'userManage' }
    ]
  },
  {
    path: '/numManage',
    redirect: '/numManage/classifyQuery',
    name: '号码管理',
    menuId: 'numManage',
    component: LayOut,
    children: [
      { path: 'classifyQuery', name: '分类查询', icon: 'ios-paper', component: () => import('@/pages/numManage/classifyQuery'), menuId: 'classifyQuery' },
      { path: 'TorLQuery', name: '提醒/拦截号码', icon: 'ios-paper', component: () => import('@/pages/numManage/TorLQuery'), menuId: 'TorLQuery' }
    ]
  }
]

const router = new Router({
  routes: asyncRouterMap
})

// 简单配置
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

// 全局路由开始守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (store.getters.addRouterMap.length === 0) { // 尚未生成一级菜单
    // 根据路由树生成路由、一级菜单
    store.dispatch('generateAddRouterMapAndMenu').then(() => {
      // 由于添加的路由表是异步的，在没有填进去之前是重新路由
      router.addRoutes([{path: '/', redirect: store.getters.addRouterMap[0].path}])
      router.addRoutes(store.getters.addRouterMap)
      router.addRoutes([{ path: '*', redirect: '/pages/404' }])
      next({ ...to, replace: true })
    })
  } else { // 已经生成二级菜单
    // 登录进来之后进入添加路由的第一路由或者已经登录成功之后
    if (to.fullPath === '/' || to.fullPath === '/login') {
      next(store.getters.addRouterMap[0].path)
    } else {
      store.dispatch('generateCurrentSiderMenus', to)
      next()
    }
  }
})

// 全局路由结束守卫
router.afterEach(() => {
  NProgress.done()
})

export default router
