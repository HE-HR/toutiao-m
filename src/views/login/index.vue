<template>
  <div class="login-container">
    <van-nav-bar title="登录" class="page-nav-bar" left-arrow @click-left="backJump" />
    <!-- 新闻头条登录表单 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field v-model="user.mobile" :rules="userRules.mobile" name="mobile" placeholder="请输入手机号">
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <!-- 验证码输入框 -->
      <van-field v-model="user.code" :rules="userRules.code" type="number" name="验证码" placeholder="请输入验证码">
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <!-- 倒计时 -->
          <van-count-down v-if="isShowCount" :time="time" format="ss 秒" @finish="isShowCount=false" />
          <!-- 发送验证码按钮 -->
          <van-button @click="sendSms" v-else class="send-sms-btn" round native-type="button" size="small" type="default">发送验证码</van-button>
        </template>
      </van-field>
      <!-- 提交按钮 -->
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSMS } from '@/api/user.js'
export default {
  name: '',
  props: [],
  data() {
    return {
      time: 5000,
      isShowCount: false,
      user: {
        // 手机号
        mobile: '15702806606',
        code: '246810'
      },
      userRules: {
        mobile: [{ required: true, message: '', trigger: 'onBlur' }, { pattern: /^1[3-9]\d{9}$/, message: '手机号不合法', trigger: 'onBlur' }],
        code: [{ pattern: /^\d{6}$/, message: '验证码不合法呢', trigger: 'onBlur' }]
      }
    }
  },
  created() {

  },
  methods: {
    async onSubmit() {
      // 提示登录进行中
      this.$toast.loading({
        duration: 2,
        message: '加载中。。。',
        forbidClick: true
      })
      try {
        const res = await login(this.user.mobile, this.user.code)
        // console.log(res)
        // 提示登陆成功
        this.$toast.success('登陆成功~~亲')
        // 保存 两个token到本地和Vuex仓库
        this.$store.commit('setUserToken', res.data.data)
        // 跳转 my组件
        this.$router.back()
      } catch (error) {
        console.log(error)
        // 提示登陆失败
        this.$toast.fail('登陆失败~~亲')
      }
    },
    async sendSms() {
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (error) {
        return console.log('校验失败了哦')
      }
      // 调用短信验证码接口
      try {
        await sendSMS(this.user.mobile)
        this.$toast.success('发送短信验证码成功')
      } catch (error) {
        this.$toast.fail('发送短信验证码失败')
        console.log(error.message)
      }
    },
    // 登录后退按钮
    backJump() {
      this.$routerback()
    }
  },
  computed: {

  },
  watch: {

  },
  components: {

  }
}

</script>

<style lang="less" scoped>
.toutiao {
  font-size: 18.5px;
}

.nav {
  background: #1989fa;
}
</style>
