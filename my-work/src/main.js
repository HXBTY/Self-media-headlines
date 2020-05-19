import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入全局样式
import '@/assets/css/global.css'
// 引入组件库模块
import ElementUI from 'element-ui'
// 引入axios
import axios from 'axios'

// 配置后端服务器公共根地址
axios.defaults.baseURL = ''
// 将axios通过原型继承方式配置给Vue成员, 名称自定义为 $http
Vue.prototype.$http = axios

// 注册
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
