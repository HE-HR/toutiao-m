import axios from '@/utils/request.js'

// 获取频道
export const getAllChannels = () => {
  return axios({
    method: 'GET',
    url: '/v1_0/channels'
  })
}

// 新增用户频道
export const addUsrChannel = (usrChannel) => {
  return axios({
    method: 'patch',
    url: '/v1_0/user/channels',
    data: {
      channels: [usrChannel]
    }
  })
}
// 删除指定用户频道
export const removeUsrChannel = (chanId) => {
  return axios({
    method: 'delete',
    url: `/v1_0/user/channels/${chanId}`
  })
}
