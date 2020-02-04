import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/main'
import Home from './views/home'
import Login from './views/login'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import FormRouter from './views/form/router'

NProgress.configure({ showSpinner: false })
Vue.use(Router)

const routes = [
  {
    path: '/main',
    component: Home,
    meta: {
      title: '应用首页'
    }
  },
  ...FormRouter
]

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/main',
      component: Main,
      children: routes
    },
    {
      path: '*',
      redirect: '/main'
    }
  ]
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  return next()
})

router.afterEach(route => {
  NProgress.done()
})

export default router
