<template>
  <div class="search-container">
    <!-- 搜索栏》事件监听 -->
    <form action="/">
      <van-search v-model="searchkey" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel" @clear="isShowResult = false" @focus="isShowResult = false">
        <van-icon @click="$router.push('/')" name="arrow-left" slot="left"></van-icon>
      </van-search>
    </form>
    <!-- 搜索结果 -->
    <SearchResult v-if="isShowResult" :searchKey="searchkey" />
    <!-- 搜索建议 -->
    <SearchSuggestion @setKeyWord="setKeyWord" :keyword="searchkey" v-else-if="searchkey" />
    <!-- 搜索历史 -->
    <SearchHistory v-else @sonSearch="onSearch" :historyList="historyList" />

  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import SearchResult from './components/search-result.vue'
import { setItem, getItem } from '@/utils/storage.js'
export default {
  name: 'search',
  props: {},
  data() {
    return {
      searchkey: '',
      isShowResult: false,
      historyList: getItem(this.$conf.localkey.SEARCH_HISTORY) || []
    }
  },
  components: { SearchHistory, SearchSuggestion, SearchResult },
  methods: {
    onSearch(kw) {
      this.searchkey = kw
      // 检查当前关键字 是否在数组中存在 如果存在删除之前的 重新添加
      const delIndex = this.historyList.findIndex((x) => x === kw)
      if (delIndex > -1) {
        this.historyList.splice(delIndex, 1)
      }
      this.historyList.unshift(kw)
      // 显示搜索结果组件
      this.isShowResult = true
      // this.searchkey = ''
    },
    onCancel() {
      // 关闭结果组件
      this.isShowResult = false
    },
    setKeyWord(newWord) {
      console.log('调用')
      this.searchkey = newWord
      // 显示结果组件 隐藏建议组件
      this.isShowResult = true
    }
  },

  watch: {
    historyList(newHistory) {
      // 侦听 搜索历史数组 一但发生改变就保存到本地数组
      setItem(this.$conf.localkey.SEARCH_HISTORY, newHistory)
    }
  }
}
</script>

<style scoped lang="less">
.search-container {
  .van-search {
    background-color: #0094ff;
  }
  .van-search__action {
    background-color: #0094ff;
    color: #fff;
  }
  .van-icon-arrow-left {
    color: #fff;
    font-size: 34px;
    margin-right: 16px;
  }
}
</style>
