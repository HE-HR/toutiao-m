<template>
  <div class="my-container">
    <!-- 已登录头部 -->
    <div v-if="user" class="userInfo login_header">
      <!-- 基本信息 -->
      <div class="base">
        <div class="left">
          <van-image fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" class="avatar" round />
          <span class="name">头条</span>
        </div>
        <div class="right">
          <van-button type="default" size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <!-- 粉丝关注 -->
      <div class="data">
        <div class="data-item">
          <span>{{usrInfo.art_count}}</span>
          <span>头条</span>
        </div>
        <div class="data-item">
          <span>{{usrInfo.follow_count}}</span>
          <span>关注</span>
        </div>
        <div class="data-item">
          <span>{{usrInfo.fans_count}}</span>
          <span>粉丝</span>
        </div>
        <div class="data-item">
          <span>{{usrInfo.like_count}}</span>
          <span>获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登录头部 -->
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png">
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <div class="grid-nav"></div>
    <van-cell title="消息通知" is-link url=""></van-cell>
    <van-cell title="实名认证" is-link url=""></van-cell>
    <van-cell title="用户反馈" is-link url=""></van-cell>
    <van-cell title="小志同学" is-link url=""></van-cell>
    <van-cell title="系统设置" is-link url=""></van-cell>
    <van-cell @click="logout" class="logout-cell" title="退出登录"></van-cell>
  </div>
</template>

<script>
// 导入vuex中的state映射方法用来将vuex.state里面的属性映射成当前组件的计算属性
// 便于组件访问
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user.js'
export default {
  name: 'my',
  data() {
    return {
      isLogin: false,
      usrInfo: []
    }
  },
  async created() {
    // console.log('666')
    // 如果仓库由用户信息 则发送请求
    if (this.$store.state.user) {
      try {
        // 请求当前登录用户的信息
        const res = await getUserInfo()
        // console.log(res)
        this.usrInfo = res.data.data
      } catch (error) {
        console.log(error.message)
      }
    }
  },
  methods: {
    logout() {
      this.$dialog.confirm({
        title: '系统提示',
        message: '亲，你确定要退出吗?'
      }).then(() => {
        // on confirm
        // 退出按钮点击 删除vuex仓库里的token
        this.$store.commit('setUserToken', null)
        // 退出提示
        this.$toast.success('退出成功')
      }).catch(() => {
        // on cancel
      })
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style scoped lang="less">
.my-container {
  > .header {
    height: 361px;
    background-image: url('~@/assets/banner.png');
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .mobile-img {
      width: 132px;
      height: 132px;
    }
  }
  .login_header {
    width: 750px;
    height: 401px;
    background: url('~@/assets/banner.png') no-repeat;
    background-size: cover;
  }
  // 已登录头部
  .userInfo {
    // background: red;
    .base {
      height: 231px;
      padding: 76px 32px 23px;
      // background: #ccc;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          border: 2px solid #fff;
        }
        .name {
          font-size: 29px;
          margin-left: 22px;
          color: #fff;
        }
      }
    }
    .data {
      display: flex;
      justify-content: space-around;
      .data-item {
        height: 130px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: #fff;
        span:nth-child(1) {
          font-size: 36px;
          margin-bottom: 15px;
        }
        span:nth-child(2) {
          font-size: 23px;
        }
      }
    }
  }
  //未登录头部
  .not-login {
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .moble-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .nav-grid {
    background: #fff;
    .toutiao {
      font-size: 45px;
    }
    .toutiao-shoucang {
      color: pink;
    }
    .toutiao-lishi {
      color: purple;
    }
    .text {
      color: #000;
      margin-top: 8px;
      font-size: 28px;
    }
  }
  .logout-cell {
    height: 100px;
    text-align: center;
    color: red;
    margin: 10px 0;
    font-size: 30px;
  }
}
</style>
