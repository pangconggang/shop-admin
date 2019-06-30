import Vue from 'vue'
import Router from 'vue-router'

// 引入login.vue，home.vue页面
import Login from './views/login.vue'
import Home from './views/home.vue'
import Users from './views/users.vue'


Vue.use(Router)

export default new Router({
  routes: [
    // 一开始就是首页
     {
      path:'/',
      component:Home
    },
    // 创建login页面路由
    {
      path:'/login',
      component:Login
    },
    // 创建home路由
    {
      path:'/home',
      component:Home,
      // 子路由
      children:[
        {
          path:'/users',
          component:Users
        }
      ]

      
    },
  ]
})
