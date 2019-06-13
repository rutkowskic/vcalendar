import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    user:  JSON.parse(localStorage.getItem('user')) || {},
    reserved_dates: []
  },
  mutations,
  getters,
  actions
})
