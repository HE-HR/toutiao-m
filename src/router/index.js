import Vue from 'vue'
import VueRouter from 'vue-router'
// 注册组件
Vue.use(VueRouter)
// 配置路由表 (hsah值 和组件的映射关系)
const routes = [{
  path: '/login',
  component: () => import('@/views/login/index.vue')
},
{
  path: '/',
  component: () => import('@/views/layout/index.vue'),
  children: [{
    path: '',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/qa',
    component: () => import('@/views/qa/index.vue')
  },
  {
    path: '/video',
    component: () => import('@/views/video/index.vue')
  },
  {
    path: '/my',
    component: () => import('@/views/my/index.vue')
  }
  ]
},
{
  path: '/search',
  component: () => import('@/views/search/index.vue')
},
{
  // 文章详情路由
  path: '/article/:aid',
  component: () => import('@/views/article/index.vue'),
  // 将路由动态参数映射到组件的 props 中，更推荐这种做法
  props: true
}
]
// 创建路由VueRouter实例
const router = new VueRouter({
  routes
})

// 导入VueRouter实例
export default router
