import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import App from "./App.vue";
import router from "./router";

// 全局样式表
import "./assets/css/global.css";
// 导入字体图标
import "./assets/fonts/iconfont.css";

Vue.config.productionTip = false;

// 安装ElementUI
Vue.use(ElementUI);

// 配置请求基础路径
axios.defaults.baseURL = "http://localhost:9090/shop";
// 挂在到Vue实例，后面可通过this调用
Vue.prototype.$axios = axios;
// request拦截器，可以在请求到达服务器之前进行操作
axios.interceptors.request.use(request => {
  // 开启进度条
  NProgress.start();
  // console.log(request);
  // 为请求头对象，添加token验证的Authorization字段
  if (request.url !== "/login") {
    request.headers.Authorization = window.sessionStorage.getItem("token");
  }
  return request;
});
// response拦截器，可以在响应到达客户端之前进行操作
axios.interceptors.response.use(response => {
  // 关闭进度条
  NProgress.done();
  // console.log(response.headers.authorization);
  // 查看response对象中是否有authorization请求头，有则保存到session中
  if (response.headers.authorization) {
    window.sessionStorage.setItem(
      "token",
      "Bearer " + response.headers.authorization
    );
  }
  return response;
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
