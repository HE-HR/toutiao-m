<template>
  <div class="">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { search } from '@/api/search.js'
export default {
  name: 'search-result',
  props: {
    // 搜索关键字
    searchKey: {
      required: true,
      type: [String, Number]
    }
  },
  data() {
    return {
      list: [],
      page: 1,
      pageSize: 10,
      loading: false,
      finished: false
    }
  },
  created() {
    // console.log(this.searchKey)
  },
  methods: {
    async onLoad() {
      // 发送请求到服务器 获取搜索文章结果
      const { data: resBody } = await search(this.searchKey, this.page, this.pageSize)
      console.log(resBody.data.results)
      this.list.push(...resBody.data.results)
      this.page++
      // 关闭加载状态
      this.loading = false
      // 如果返回数组长度 < 页容量 则不在需要再触底请求了
      if (resBody.data.results.length < this.pageSize) this.finished = true
      // this.finish = true
    }
  },
  components: {
  }
}
</script>

<style>
</style>
