<template>
  <div class="channel-edit">
    <van-cell title="我的频道" :border="false">
      <van-button @click="isEdit=!isEdit" size="mini" round type="danger" plain>{{isEdit?'完成':'编辑'}}</van-button>
    </van-cell>
    <!-- 我的频道 -->
    <van-grid :gutter="10">
      <van-grid-item @click="clickChannel(myc,i)" :icon="getClearIcon(myc,i)" class="channel-item" :class="{redFont:i === index}" v-for="(myc,i) in usrChanList" :key="myc.id" :text="myc.name" />
    </van-grid>
    <van-cell title="频道推荐" :border="false"></van-cell>
    <van-grid :gutter="10">
      <van-grid-item @click="addChan(rec,i)" class="channel-item" v-for="(rec,i) in recommandChanList" :key="rec.id" :text="rec.name" />
    </van-grid>
  </div>
</template>

<script>
// 导入仓库Vuex中映射属性方法
import { mapState } from 'vuex'
// 导入 获取所有频道接口
import { getAllChannels, addUsrChannel, removeUsrChannel } from '@/api/channel'
// 导入setItem 方法帮助数据持久化
import { setItem } from '@/utils/storage'
export default {
  name: 'channel-edit',
  props: ['usrChanList', 'index'],
  components: {},
  data() {
    return {
      isEdit: false,
      recommandChanList: [],
      // 白名单频道数组 不允许用户删除
      whiteList: [0, 1, 2]
    }
  },
  methods: {
    // 将推荐频道添加到用户频道中
    async addChan(curChannel, i) {
      // 根据下标删除推荐频道的指定元素
      this.recommandChanList.splice(i, 1)
      // 将删除的频道添加到用户频道中
      this.usrChanList.push(curChannel)
      // 数据持久化 登录状态保存到数据库 未登录保存到本地localStorage
      try {
        if (this.user) {
          // 登录
          const res = await addUsrChannel({
            id: 'curChannel.id',
            seq: this.usrChanList.length
          })
          console.log(res)
        } else {
          // 未登录
          setItem(this.$conf.localkey.USER_CHAN, this.usrChanList)
        }
      } catch (error) {
        console.log('出错啦' + error.message)
        this.$toast.fail('sorry,服务器繁忙')
      }
    },
    // 获取我的频道关闭按钮方法
    getClearIcon(curChannel, i) {
      if (this.isEdit && !this.whiteList.some((a) => a === curChannel.id)) {
        return 'clear'
      }
      return ''
    },
    // 点击我的频道 按钮方法
    async clickChannel(curChannel, i) {
      // 判断是否是编辑状态
      if (this.isEdit) {
        // 点击的频道是白名单的不可移除
        if (this.whiteList.some((cid) => cid === curChannel.id)) return
        // 如果是编辑状态 则进行频道移除操作
        this.usrChanList.splice(i, 1)
        this.recommandChanList.push(curChannel)
        this.recommandChanList.sort((x, y) => x.id - y.id)
        // 如果登录了 更新到服务器。否则更新到本地
        if (this.user) {
          try {
            await removeUsrChannel(curChannel.id)
          } catch (error) {
            this.$toast.fail('服务器繁忙，请稍后再试')
          }
        } else {
          setItem(this.$conf.localkey.USER_CHAN, this.usrChanList)
        }
      } else {
        // 不是编辑状态 则调用父组件的事件方法关闭弹层 切换频道tab栏
        this.$emit('changeTab', i)
      }
    }
  },
  async created() {
    // 请求所有列表
    const { data: resBody } = await getAllChannels()
    // console.log(resBody.data.channels)
    const allChannel = resBody.data.channels
    // 将全部频道减去用户频道的结果加入到推荐频道中
    // 使用filter方法
    this.recommandChanList = allChannel.filter((a) => !this.usrChanList.some((b) => a.id === b.id))
    // allChannel.forEach((a) => {
    //   if (!this.usrChanList.some((b) => b.id === a.id)) {
    //     this.recommandChanList.push(a)
    //   }
    // })
  },
  computed: {
    ...mapState(['user'])
  }

}
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 87px 0;
  .title-text {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
  }
  /deep/.redFont .van-grid-item__text {
    color: red !important;
  }
  /deep/.my-grid {
    .van-icon-clear {
      position: absolute;
      right: -10px;
      top: -10px;
      font-size: -15px;
      color: #cacaca;
      z-index: 2;
    }
  }
  /deep/.grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f3f5f7;
      .van-icon-clear {
        position: absolute;
        right: -4px;
        top: -4px;
        color: #999;
        z-index: 200;
      }
      .van-grid-item__text {
        font-size: 28px;
        color: #222;
        margin-top: 0px;
      }
    }
  }
  /deep/.recommand-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
        .van-grid-item__text {
          margin-top: 0px;
        }
      }
    }
  }
}
</style>
