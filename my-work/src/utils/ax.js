// 创建该文件专门用于设置axios避免main.js文件内容过于复杂
import Vue from "vue";
// 引入axios
import axios from "axios";
// 配置后端服务器公共根地址
axios.defaults.baseURL = "http://localhost:8888/api/";
// 将axios通过原型继承方式配置给Vue成员, 名称自定义为 $http
Vue.prototype.$http = axios;
