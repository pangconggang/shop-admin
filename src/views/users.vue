<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索框 添加用户 -->

    <!-- 表格 -->
    <el-table :data="userData" stripe style="width: 100%">
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="用户状态">
        <!-- 在这里，无法直接获取到每一行的数据，这个数据在el-table表格组件中 -->
        <!-- 如果要获取每一行的数据，那么我们就需要通过作用于插槽的方式，把数据接收到 -->
        <template v-slot="{row}">   
          <el-switch v-model="row.type" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <el-button type="primary" plain size="mini" icon="el-icon-edit"></el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini" plain></el-button>
        <el-button type="success" icon="el-icon-check" size="mini" plain>分配角色</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 引入axios
import axios from 'axios'

export default {

  data() {
    return {
      userData: [],
    };
  },
  created(){
    axios({
      url:'http://localhost:8888/api/private/v1/users',

      params: {
        pagenum: 1,
        pagesize: 4
      },
      headers: {
        Authorization: localStorage.getItem("token")
      }

    }).then( res => {
      // console.log(res)
      this.userData = res.data.data.users
    })
  },
  
};
</script>



// 样式
<style>
.el-breadcrumb {
  height: 50px;
  padding-left: 10px;
  line-height: 50px;
  background-color: #d4dae0;
}
.el-breadcrumb__item {
  height: 50px;
  line-height: 50px;
  font-size: 16px;
}
</style>

