// 负责统一封装 axios
import axios from 'axios'
// 导入vuex仓库
import store from '@/store/index.js'
const axios1 = axios.create({
// 设置当前axios对象的基地址
  baseURL: 'http://toutiao.itheima.net'
})

// 设置拦截器 （请求和响应）
// conf 是本次axios请求的配置对象 包含程序员传入的信息
axios1.interceptors.request.use(function(conf) {
  if (store.state.user && store.state.user.token) {
    // 发送请求之前 为请求头追加token
    conf.headers.Authorization = 'Bearer ' + store.state.user.token
  }
  return conf
})
export default axios1
