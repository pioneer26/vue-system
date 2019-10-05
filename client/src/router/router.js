import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/login.vue'
import Register from '../views/register.vue'
import Nofind from '../views/nofind.vue'
import InfoShow from '../views/infoshow.vue'
import Single from '../views/single.vue'
import FoundList from '../views/foundList.vue'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/login'
     },
     {
      path: '/home',
      component: Home,
      children: [
        {
          path: '',
          name: 'single',
          component: Single
        },
        {
          path: '/infoshow',
          name: 'infoshow',
          component: InfoShow
        },
        {
          path: '/foundlist',
          name: 'foundList',
          component: FoundList
        }
      ]
     },
     {
      path: '/login',
      name: 'login',
      component: Login
     },
    {
     path: '/register',
     name: 'register',
     component: Register
    },
    {
      path: '*',
      name: 'nofind',
      component: Nofind
     }
  ]
})
//导航守卫
router.beforeEach((to, from, next) => {
  let isLogin = localStorage.eleToken ? true : false;
  if(to.path == '/login' || to.path == '/register') {
    next()
  } else {
    //如果条件为真继续执行，否则跳转到登录页
    isLogin ? next() : next('/login')
  }
})
export default router;