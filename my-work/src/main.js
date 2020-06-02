import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入axios相关
import "@/utils/ax.js";

// 导入element-ui全局样式
import "@/assets/css/global.css";
// 引入组件库模块
import ElementUI from "element-ui";
// 注册
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
