<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- Layout布局 -->
      <el-row :gutter="20">
        <el-col :span="6">
          <!-- 搜索框 -->
          <el-input placeholder="请输入内容" v-model="queryInfo.username">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 请求用户列表封装查询参数对象
      queryInfo: {
        username: "",
        current: 1,
        size: 2
      },
      userList: [],
      totalPageSize: 0
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    getUserList() {
      this.$axios
        .post("/sysUser/selectPage", this.queryInfo)
        .then(response => {
          if (response.data.code === 200) {
            console.log(response.data.data);
            this.userList = response.data.data;
          } else {
            this.$message.console.error(response.data.message);
          }
        })
        .catch(error => {
          this.$message.error(error.data);
        });
    }
  }
};
</script>
