import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import App from "./App.vue";
import router from "./router";

import "./assets/css/global.css";

Vue.config.productionTip = false;

// 安装ElementUI
Vue.use(ElementUI);
// 挂在到Vue实例，后面可通过this调用
Vue.prototype.$message = ElementUI.Message;

// 配置请求基础路径
axios.defaults.baseURL = "http://localhost:9090/shop";
// 挂在到Vue实例，后面可通过this调用
Vue.prototype.$axios = axios;
// request拦截器，可以在请求到达服务器之前进行操作
axios.interceptors.request.use(config => {
  // 开启进度条
  NProgress.start();
  return config;
});
// response拦截器，可以在响应到达客户端之前进行操作
axios.interceptors.response.use(config => {
  // 关闭进度条
  NProgress.done();
  return config;
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
