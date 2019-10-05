import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const types = {
  //会在浏览器显示，判断是否通过认证
  SET_IS_AUTNENTIATED: 'SET_IS_AUTNENTIATED',
  SET_USER: 'SET_USER'
}
const state = {
  isAuthentivated: false,//是否授权,默认为false
  user: {}// 存储用户信息
}
const  getters = {
  isAuthenticated: state => state.isAuthenticated,
  user: state => state.user
}
const mutations = {
  //给mutations方法规定的types类型，可以在控制台显示名字
  [types.SET_IS_AUTNENTIATED](state, isAuthenticated) {
    //判断授权是true还是false
    if(isAuthenticated) {
      state.isAuthenticated = isAuthenticated
    } else {
      state.isAuthenticated = false
    }
  },
  //判断用户是否存在，不存在则赋值一个空对象
  [types.SET_USER](state, user) {
    if(user) {
      state.user = user
    } else {
      state.user = {}
    }
  }

}
const actions = {
  setIsAutnenticated: ({ commit }, isAuthentivated) => {
    commit(types.SET_IS_AUTNENTIATED, isAuthentivated)
  },
  setUser: ({ commit }, user) => {
    commit(types.SET_USER, user)
  },
  //把当前的状态清除
  clearCurrenState: ({ commit }) =>{
    commit(types.SET_IS_AUTNENTIATED, false);
    commit(types.SET_USER, null);
  }
}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
