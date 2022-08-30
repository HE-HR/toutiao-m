<template>
  <div id="app">
    <!-- 根组件 路由占位符 -->
    <router-view />
  </div>
</template>
<script>
// import axios from './utils/request.js'

export default {
  name: 'App',
  data() {
    return {

    }
  },
  create() {
    this.$axios({
      url: '/v1_0/channels',
      method: 'get'
    }).then(function (res) {
      console.log(res)
    })
  }
}
</script>

<style lang="less" scoped></style>
