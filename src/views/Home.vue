<template>
  <div class="homeContainer">
    <el-container class="homeContainer">
      <!-- 头部导航栏,类名默认为标签名 -->
      <el-header>
        <div>
          <img src="../assets/logo.png" alt />
          <span>后台管理系统</span>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <el-container>
        <!-- 侧边菜单栏 -->
        <el-aside :width="isCollapse ? '64px' : '200px'">
          <div class="toggle-button" @click="togleCollapse">|||</div>
          <!-- 侧边栏菜单区域,unique-opened只开启一个菜单,router开启路由模式，index为url -->
          <el-menu
            background-color="#373f41"
            text-color="#fff"
            active-text-color="#ffd04b"
            unique-opened
            :collapse-transition="false"
            :collapse="isCollapse"
            router
          >
            <!-- 一级菜单 -->
            <el-submenu
              :index="menu.id + ''"
              v-for="menu in menuList"
              :key="menu.id"
            >
              <!-- 一级菜单模板区域 -->
              <template slot="title">
                <!-- 一级菜单图标 -->
                <i :class="menu.icon"></i>
                <!-- 一级菜单文本 -->
                <span>{{ menu.name }}</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item
                :index="subMenu.url"
                v-for="subMenu in menu.menuList"
                :key="subMenu.id"
              >
                <!-- 二级菜单模板区域 -->
                <template slot="title">
                  <!-- 二级菜单图标 -->
                  <i :class="subMenu.icon"></i>
                  <!-- 二级菜单文本 -->
                  <span>{{ subMenu.name }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 主要内容区 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      menuList: [],
      isCollapse: false
    };
  },
  created() {
    // 创建当前组件时会调用
    this.getMenuList();
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    getMenuList() {
      this.$axios
        .post("/sysMenu/selecCurrentUsertMenuTree")
        .then(response => {
          if (response.data.code === 200) {
            console.log(response.data.data);
            this.menuList = response.data.data;
          } else {
            return this.$message.error(response.data.message);
          }
        })
        .catch(error => {
          return this.$message.error(error.data);
        });
    },
    togleCollapse() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>

<style lang="less" scoped>
.homeContainer {
  height: 100%;
}

.el-header {
  // 背景颜色
  background-color: #373f41;
  //文本颜色
  color: #fff;
  // 文本大小
  font-size: 20px;
  // 左右对齐
  display: flex;
  justify-content: space-between;
  // 纵向居中
  align-items: center;
  padding-left: 0;
  > div {
    display: flex;
    align-items: center;
    img {
      height: 50px;
    }
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #373f41;
  .el-menu {
    border-right: none;
  }
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-clip: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  // 文本居中
  text-align: center;
  // 文字间隔
  letter-spacing: 0.2em;
  // 鼠标放上去变成小手
  cursor: pointer;
}
</style>
