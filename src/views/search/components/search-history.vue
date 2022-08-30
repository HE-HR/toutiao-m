<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <template v-if="isEdit">
        <span @click="clearHistory">全部删除</span>
        &nbsp;
        <span @click="isEdit=false">完成</span>
      </template>
      <!-- 删除按钮 -->
      <van-icon v-else name="delete" @click="isEdit = true" />
    </van-cell>
    <!-- 搜索列表 -->
    <van-cell @click="clickHistory(h)" :title="h" v-for="(h,i) in historyList" :key="i">
      <van-icon @click.stop="delHistory(i)" v-if="isEdit" name="close" />
    </van-cell>
  </div>
</template>

<script>
// import { setItem } from '@/utils/storage.js'
export default {
  name: 'search-history',
  props: ['historyList'],
  data() {
    return {
      isEdit: false
    }
  },
  methods: {
    delHistory(i) {
      // 删除方法
      this.historyList.splice(i, 1)
    },
    // 删除所有历史记录
    clearHistory() {
      this.historyList.splice(0)
    },
    // 点击搜索关键字
    clickHistory(KeyWord) {
      !this.isEdit && this.$emit('sonSearch', KeyWord)
    }
  }
}
</script>

<style>
</style>
