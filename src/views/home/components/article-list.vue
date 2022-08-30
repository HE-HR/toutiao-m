<template>
  <div class="artList">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list :error.sync="isError" error-text="请求失败" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <ArtItem v-for="(art,i) in list" :key="i" :article="art" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getChannelArtList } from '@/api/article.js'
// 导入文章列表项组件
import ArtItem from '@/components/article-item/index.vue'
export default {
  name: 'article',
  props: ['channel'],
  data() {
    return {
      refreshing: false,
      list: [],
      loading: false,
      finished: false,
      pre_time: Date.now(),
      isError: false
    }
  },
  methods: {
    // 下拉更新
    async onRefresh() {
      const { data: resBody } = await getChannelArtList(this.channel.id, Date.now())
      //   console.log(resBody)
      const newList = resBody.data.results
      this.list.unshift(...newList)
      this.refreshing = false
    },
    // 触底更新
    async onLoad() {
      try {
        // 模拟随即报错
        if (Math.random() >= 0.9) {
          throw new Error('模拟随即报错了')
        }
        const { data: resBody } = await getChannelArtList(this.channel.id, this.pre_time)
        this.list.push(...resBody.data.results)
        this.pre_time = resBody.data.pre_timestamp
        this.loading = false
      } catch (error) {
        console.log('出错了', error.message)
        this.isError = true
        this.loading = false
      }
    }
  },

  created() {
  },
  components: {
    ArtItem
  }
}

</script>

<style lang="less" scoped>
.artList {
  height: 80vh;
  overflow-y: auto;
}
</style>
