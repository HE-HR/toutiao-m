import Vue from 'vue'
import Vuex from 'vuex'
import { setItem } from '@/utils/storage.js'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    user: {
      token: null,
      refresh_token: null
    }
  },
  mutations: {
    setUserToken(state, userTokens) {
      // 保存到仓库
      state.user = userTokens
      // 保存到本地
      setItem('usersTokens', userTokens)
    }
  },
  actions: {

  },
  modules: {

  }
})
