import Vue from 'vue'
// 导入 根组件
import App from './App.vue'
// 导入flexible模块计算rem基准值
import 'amfe-flexible'
// 导入全局样式
import '@/style/index.less'
// 导入全局过滤器
import '@/filters/index.js'
// 导入路由管理器对象
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
// 导入 axios
import axios from './utils/request.js'
// 导入config配置对象
import conf from '@/config/index.js'
// 挂载到Vue原型上
Vue.prototype.$axios = axios
// 注册使用vant组件库
Vue.use(Vant)
Vue.prototype.$conf = conf
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => {
    return h(App)
  }
}).$mount('#app')
