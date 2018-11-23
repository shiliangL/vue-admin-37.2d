import { constantRouterMap } from '@/router'
let navigation = null

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, workType) => {
      for (const item of constantRouterMap) {
        // 判断谁是首页
        if (item.isLayOut) {
          item.children[workType].hidden = false
          if (navigation) {
            setTimeout(() => {
              navigation({ path: `/${item.children[workType].path}`, replace: true })
            }, 200)
          }
        }
      }
      // state.addRouters = routers
      state.routers = constantRouterMap
    }
  },
  actions: {
    // 过滤需要显示的菜单
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { workType, next } = data
        navigation = next
        commit('SET_ROUTERS', workType - 1)
        resolve()
      })
    }
  }
}

export default permission
