<template>
  <div>
    <!-- ref是Vue的自带属性，可以同过this.$refs.loginForm访问表单对象，$访问Vue自带方法 -->
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginFormRule"
      label-width="80px"
      class="loginFormClass"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="loginForm.username"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="commitForm">登录</el-button>
        <el-button type="info" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "12345678"
      },
      loginFormRule: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 提交表单
    commitForm() {
      this.$refs.loginFormRef.validate(valid => {
        if (valid) {
          this.$axios({
            url: "/login",
            method: "post",
            header: {
              "Content-Type": "application/json"
            },
            data: this.loginForm
          })
            .then(response => {
              console.log(response.data);
              if (response.data.code === 200) {
                console.log(response.data.data);
                window.sessionStorage.setItem("username", response.data.data);
                this.$message.success(response.data.message);
                this.$router.push("/home");
              } else {
                return this.$message.error(response.data.message);
              }
            })
            .catch(error => {
              this.$message.error(error.data);
            });
        } else {
          return false;
        }
      });
    },
    // 重置表单
    resetForm() {
      this.$refs.loginFormRef.resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.loginFormClass {
  width: 450px;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}
</style>
