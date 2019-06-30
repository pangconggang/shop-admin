<template>
  <el-row type="flex" class="row-bg" justify="center" align="middle">
    <el-col :xs="14" :sm="12" :md="10" :lg="8" :xl="6">
      <el-form :model="form" :rules="rules" ref="form"  class="forms" label-width="80px" label-position="top">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"  @click="submitForm('form')">登录</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>



<script>

// 因为login.vue中要发送ajax请求，所以需要引入文件
import axios from "axios"

export default {
  data() {
    return {
      form: {
        username: "admin",
        password: "123456"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 5, max: 8, message: "长度在5到8个字符", trigger: "change" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在6到12个字符", trigger: "change" }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 需要发送ajax请求
          axios({
            method:"post",
            url:'http://localhost:8888/api/private/v1/login',
            data:this.form
          }).then(res => {
            // console.log(res);
            if (res.data.meta.status === 200) {

              // 处理登录之后的问题，把请求的数据里面的token储存在浏览器储存区localstorage,这样表示已经登录过了
              localStorage.setItem('token',res.data.data.token)

              // token存放之后。在 main.js文件 里面对其进行处理

              // 注册成功之后，跳转到首页，但是这样处理，有个问题，就是当我进入首页之后，点击可后退是，可以返回登录页面，
              // 所以在点击登录按钮操作之前，处理这个问题
              this.$router.push('/home')
            }
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      // forName 是一个形参，调用这个函数是里面传得实参是data(){}里面的数据form
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less">
.row-bg {
  height: 100%;
  background-color: #52410f;
}
.forms {
  background-color: #fff;
  padding: 30px 20px;
  min-width: 400px;
  border-radius: 10px;
}
</style>