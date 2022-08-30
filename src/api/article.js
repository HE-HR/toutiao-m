import axios from '@/utils/request.js'
// 获取指定频道的文章id
// eslint-disable-next-line camelcase
export const getChannelArtList = function(channel_id, timestamp) {
  return axios({
    method: 'get',
    url: '/v1_0/articles',
    params: {
      channel_id,
      timestamp,
      with_top: 1
    }
  })
}
// 获取文章详情
export const getArticleById = function(aid) {
  return axios({
    method: 'get',
    url: `/v1_0/articles/${aid}`
  })
}
