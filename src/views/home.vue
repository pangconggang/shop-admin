<template>
  <el-container class="home-conntainer">
    <!-- 头部 -->
    <el-header class="home-header">
      <el-row type="flex" align="middle">
        <el-col :span="6">
          <img src="../assets/imgs/logo.png" alt>
        </el-col>
        <el-col>
          <h1>电商后台管理系统</h1>
        </el-col>
        <el-col :span="6">
          <div>
            欢迎进入电商后台管理系统
            <a href="javascript:;" class="logout">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>

    <!-- 主体 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px" class="home-asider">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true"
          :unique-opened="true"
        >
        <!-- 侧边栏内容 -->
          <el-submenu :index="item.order  + '' "  v-for="item in asideList" :key="item.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="'/' + items.path" v-for="items in item.children" :key="items.id">
              <i class="el-icon-menu"></i>
              <span>{{items.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 内容 -->
      <el-main>
        <!-- 子路由的展现位置 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>


// js代码
<script>
// 引入axios
import axios from "axios"

export default {
 data(){
   return {
     asideList:[]
   }
 },
 created(){
  // 发送ajax请求，加载侧边栏数据
  axios({
    url:'http://localhost:8888/api/private/v1/menus',
    headers: {
      Authorization: localStorage.getItem("token")
    }
  }).then(res => {
    // console.log(res)
    this.asideList = res.data.data
  })

  

 }
}
</script>



// 样式
<style>
.home-conntainer {
  height: 100%;
  background-color: #eaeef1;
}
.home-header {
  background-color: #b3c1cd;
}
.home-header img {
  width: 200px;
}

.home-header h1 {
  height: 60px;
  line-height: 60px;
  text-align: center;
  margin: 0;
  color: #fff;
  font-size: 28px;
}

.home-header div {
  min-width: 235px;
  font-weight: bold;
}

.home-header .logout {
  color: #daa520;
  font-size: 18px;
}

.home-asider {
  background-color: #545c64;
}
.home-side-group {
  padding: 0;
}
.el-header {
  padding-left: 0;
}
</style>