import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'

import layout from './modules/layout'

Vue.use(Vuex)

const store = new Vuex.Store({
  actions,
  modules: {
    layout
  }
})

export default store
