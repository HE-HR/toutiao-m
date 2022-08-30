import request from '@/utils/request.js'

// 获取文章评论
export const getComments = (params) => request({
  method: 'get',
  url: '/v1_0/comments',
  params: {
    type: params.type,
    source: params.source,
    offset: params.offset,
    limit: params.limit
  }
})

// 为评论点赞
export const addLiking = (target) => request({
  method: 'post',
  url: '/v1_0/comment/likings',
  data: {
    target
  }
})

// 取消点赞
export const cancelLiking = (target) => request({
  method: 'delete',
  url: `/v1_0/comment/likings/${target}`
})

// 发布评论
export function addComment(data) {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data
  })
}
