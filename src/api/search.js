import request from '../utils/request'

// 获取我的频道内容的数据
export const getSugList = (q) => request({
  method: 'get',
  url: '/v1_0/suggestion',
  params: { q }
})

export const search = (q, page = 1, per_page = 10) => request({
  method: 'get',
  url: '/v1_0/search',
  params: {
    q,
    page,
    per_page

  }
})
