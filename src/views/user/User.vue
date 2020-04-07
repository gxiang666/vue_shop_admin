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
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList()"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="createUser()">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区域stripe: 斑马条纹 border：边框- -->
      <el-table :data="userList" border stripe style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editUserInfo(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeUserInfo(scope.row.id)"
            ></el-button>
            <el-tooltip
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                @click="setRole(scope.row.id)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :total="total"
        :current-page="queryInfo.current"
        :page-size="queryInfo.size"
        :page-sizes="[1, 2, 5, 10]"
        @current-change="handlerCurrentChange"
        @size-change="handlerSizeChange"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
    </el-card>

    <!-- 添加用户对话框  -->
    <el-dialog
      title="添加用户"
      :visible.sync="addUserDialogVisible"
      width="50%"
      @close="resetUserFormFileds"
    >
      <el-form
        :model="addUserModel"
        ref="addUserRef"
        :rules="addUserRule"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUserModel.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUserModel.password" type="password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addUserDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确定</el-button>
      </span>
    </el-dialog>
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
      total: 0,
      addUserDialogVisible: false,
      // editUserDialogVisible: false,
      // setRoleDialogVisible: false,
      addUserModel: {
        username: "",
        password: ""
      },
      addUserRule: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "用户名的长度在3~10个字符之间",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "用户名的长度在3~10个字符之间",
            trigger: "blur"
          }
        ]
      }
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
            // 把用户列表赋值给userList
            this.userList = response.data.data.records;
            this.total = response.data.data.total;
          } else {
            this.$message.error(response.data.message);
          }
        })
        .catch(error => {
          this.$message.error(error.data);
        });
    },
    createUser() {
      this.addUserDialogVisible = true;
    },
    editUserInfo(id) {
      console.log(id);
    },
    removeUserInfo(id) {
      console.log(id);
    },
    setRole(id) {
      console.log(id);
    },
    handlerCurrentChange(current) {
      this.queryInfo.current = current;
      this.getUserList();
    },
    handlerSizeChange(size) {
      this.queryInfo.size = size;
      this.getUserList();
    },
    addUser() {
      this.$axios
        .post("/sysUser/create", this.addUserModel)
        .then(response => {
          if (response.data.code === 200) {
            this.addUserDialogVisible = false;
            this.getUserList();
          } else {
            this.$message.error(response.data.message);
          }
        })
        .catch(error => {
          this.$message.error(error.data);
        });
    },
    resetUserFormFileds() {
      this.$refs.addUserRef.resetFields();
    }
  }
};
</script>
