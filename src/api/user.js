import axios from '@/utils/request'
// 导出登录接口
export const login = function(mobile, code) {
  // 返回axios 创建的promise对象 可以通过async await 简化关键字
  return axios({
    method: 'post',
    url: '/v1_0/authorizations/',
    data: {
      mobile,
      code
    }
  })
}

// 导出 发送验证码接口
export const sendSMS = function(mobile) {
  return axios({
    method: 'get',
    url: `v1_0/sms/codes/${mobile}`
  })
}

// 获取用户数据
export const getUserInfo = function() {
  return axios({
    url: '/v1_0/user',
    method: 'get'
    // 设置请求拦截器 不需要加这个了
    // headers: { Authorization: `Bearer' ${userToken}` }
  })
}

// 获取用户频道列表数据
export const getUserChannels = function() {
  return axios({
    method: 'get',
    url: 'v1_0/user/channels'
  })
}
