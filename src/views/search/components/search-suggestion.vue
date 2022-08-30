<template>
  <div class="search-suggestion">
    <van-cell v-for="(item, index) in sugListHighLight" :key="index" icon="search">
      <div v-html="item" @click="clickKeyWord(index)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSugList } from '@/api/search.js'
import { debounce } from 'lodash'
export default {
  name: 'search-suggestion',
  props: {
    keyword: {
      type: String,
      required: true,
      validator: function (value) {
        return value.length > 0
      }
    }
  },
  data() {
    return {
      // 搜索建议关键字 列表
      sugList: [],
      // 添加高亮标签的 建议关键字列表
      sugListHighLight: []
    }
  },
  methods: {
    clickKeyWord(i) {
      // 获取 被点击不带span标签的 建议关键字
      const str = this.sugList[i]
      this.$emit('setKeyWord', str)
    },
    async getSugList2(k) {
      const { data: resBody } = await getSugList(k)
      const reg = new RegExp(k, 'ig')
      const newStr = `<span class="highlight">${k}</span>`
      if (resBody.data.options[0] === null) {
        return
      }
      this.sugList = resBody.data.options
      this.sugListHighLight = resBody.data.options.map((v) =>
        v.replace(reg, newStr))
    }
  },
  watch: {
    // 使用对象格式的侦听器 同名属性keyword的值改变
    keyword: {
      // 处理函数 首次加载组件不会执行
      /*  async handler(k) {
        const { data: resBody } = await getSugList(k)
        const reg = new RegExp(k, 'ig')
        const newStr = `<span class="highlight">${k}</span>`
        if (resBody.data.options[0] === null) {
          return
        }
        this.sugList = resBody.data.options
        this.sugListHighLight = resBody.data.options.map((v) =>
          v.replace(reg, newStr)
        )
      }, */
      handler: debounce(function (str) {
        this.getSugList2(str)
      }, 1000),
      //   强制首次加载 就立即执行 本侦听器函数
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.highlight {
  color: red;
  font-weight: bolder;
}
</style>
