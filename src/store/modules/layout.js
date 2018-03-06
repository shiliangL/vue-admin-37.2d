import * as types from '../mutationTypes.js'

const state = {
  sidberIsCollapse: false
}

const getters = {
  getSidberIsCollapse: state => state.sidberIsCollapse
}

const actions = {
  setSidberIsCollapse ({ commit }, sidberIsCollapse) {
    commit(types.VX_SET_SIDBERISCOLLAPSE, { sidberIsCollapse })
  }
}

const mutations = {
  [types.VX_SET_SIDBERISCOLLAPSE] (state, { sidberIsCollapse }) {
    state.sidberIsCollapse = sidberIsCollapse
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
