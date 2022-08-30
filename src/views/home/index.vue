<template>
  <div class="home-container">
    <!-- 头部搜索按钮 -->
    <van-nav-bar class="page-nav-bar">
      <van-button to="/search" class="search-btn" slot="title" type="info" size="small" round icon="search">搜索</van-button>
    </van-nav-bar>
    <!-- 频道tab列表 -->
    <van-tabs class="channel-tabs" v-model="tabIndex" animated swipeable>
      <van-tab v-for="c in channels" :key="c.id" :title="c.name">
        <ArticleList :channel='c' />
      </van-tab>
      <!-- 渐变分隔条 -->
      <div slot="nav-right" class="placeholder">
      </div>
      <!-- 汉堡按钮 -->
      <div slot="nav-right" class="hamburger-btn" @click="isShowEdit=true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 频道编辑 -->
    <van-popup class="edit-channel-popup" v-model="isShowEdit" position="bottom" :style="{ height: '100%' }" closeable close-icon-position="top-left">
      <channel-edit @changeTab="changeTabIndex" :usrChanList="channels" :index="tabIndex" />
    </van-popup>
    <!-- /频道编辑 -->
  </div>
</template>

<script>
import ArticleList from './components/article-list.vue'
import { getUserChannels } from '@/api/user.js'
import ChannelEdit from './components/channel-edit.vue'
import { getItem } from '@/utils/storage.js'
export default {
  name: 'home',
  components: { ArticleList, ChannelEdit },
  data() {
    return {
      tabIndex: 0,
      channels: [],
      isShowEdit: false
    }
  },
  methods: {
    // 子组件传递被选中频道下标
    changeTabIndex(i) {
      // 修改当前选中频道下标
      this.tabIndex = i
      // 关闭编辑弹出框
      this.isShowEdit = false
    }
  },
  async created() {
    try {
      // 从本地 获取用户频道数组
      const localUsrChanList = getItem(this.$conf.localkey.USER_CHAN)
      // 判断用户是否登录 本地有没有登陆
      if (localUsrChanList && !this.$store.state.user) {
        this.channels = localUsrChanList
      } else {
        const { data: res } = await getUserChannels()
        this.channels = res.data.channels
      }
      // 如果登录了 去服务器获取
      // 如果没有登陆 拿本地刚读取的数据

      // 如果登录 则取服务器请求用户频道列表
      /*  if (this.$store.state.user) {
        const { data: res } = await getUserChannels()
        this.channels = res.data.channels
      } else {
        // 如果未登录 看本地是否保存用户频道列表
        const localUsrChanList = getItem(this.$conf.localkey.USER_CHAN)
        if (localUsrChanList) {
          // 如果本地有 则从本地获取
          this.channels = localUsrChanList
        } else {
          // 如果没有 去服务器获取 默认用户频道列表
          const { data: res } = await getUserChannels()
          this.channels = res.data.channels
        }
      } */
      // 请求 获取频道列表接口
    } catch (error) {
      this.$toast.fail('请求频道列表失败')
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  // tabs频道列表
  /deep/ .channel-tabs {
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      height: 80px;
      .van-tab__text {
        font-size: 27px;
        color: #777777;
      }
    }

    .van-tab--active .van-tab__text {
      color: #333 !important;
    }
    .van-tabs__line {
      width: 31px !important;
      height: 6px;
      background: rgba(50, 150, 250, 1);
      border-radius: 3px;
      bottom: 8px;
    }
    .van-tabs__nav {
      padding: 0;
    }
    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      i.toutiao {
        font-size: 33px;
      }
      &:before {
        content: '';
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>
