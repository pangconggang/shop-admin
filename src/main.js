import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 1. 引入EelementUI库
import ElementUI from 'element-ui';
// 2. 引入EelementUI的CSS文件
import 'element-ui/lib/theme-chalk/index.css';
// 3. 安装EelementUI
Vue.use(ElementUI)

// 引入css文件
import "./assets/css/index.css"
// 引入图片
import "./assets/imgs/logo.png"

// 注册一个导航守卫
router.beforeEach((to, from, next) => {
  // to表示去哪里
  // 判断  to.path === "/login",如果满足则使用 next()放行
  if (to.path === "/login") {
    next()
    return
  }

  //如果访问的是其他的页面，判断用户是否进行了登录,根据 localStorage里面存放的 token值
  // 1 如果登录了，localStorage里面会有token，那就直接放行
  // 2 如果没登录，那就跳转到登录页
  if ( localStorage.getItem('token') ) {
    next()
  } else {
    router.pash('/login')
  }
})


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

