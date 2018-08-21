import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { fetchToken } from '@/api/layout'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { Message } from 'element-ui'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    menuList: [],
    curMenuIndex: 0,
    qNtoken: null,
    loginKey: null,
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_LOGINKEY: (state, loginKey) => {
      state.loginKey = loginKey
    },
    SET_QNTOKEN: (state, qNtoken) => {
      state.qNtoken = qNtoken
    },
    SET_CURMENUINDEX: (state, curMenuIndex) => {
      state.curMenuIndex = curMenuIndex
    },
    SET_MENULIST: (state, menuList) => {
      state.menuList = menuList
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginByUsername({ ...userInfo }).then(response => {
          const token = response.data.result
          commit('SET_TOKEN', token)
          setToken(token)
          resolve()
        }).catch(error => {
          Message.error(error.msg)
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          const data = response.data
          // commit('SET_ROLES', data.roles)
          commit('SET_ROLES', ['admin'])
          commit('SET_NAME', data.staffName)
          // commit('SET_NAME', data.loginName)
          commit('SET_AVATAR', data.staffId)
          commit('SET_INTRODUCTION', data.departmentNames)
          resolve(response)
        }).catch(error => {
          Message.error(error.msg)
          reject(error)
        })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve()
        })
      })
    },

    // 设置路由
    VX_SET_MENULIST({ commit }, menuList) {
      commit('SET_MENULIST', menuList)
    },
    // vuex 设置顶部订单菜单
    VX_SET_CURMENUINDEX({ commit }, curMenuIndex) {
      commit('SET_CURMENUINDEX', curMenuIndex)
    },
    // 设置七牛 token
    VX_SET_QNTOKEN({ commit }) {
      return new Promise((resolve, reject) => {
        fetchToken().then(({ data }) => {
          commit('SET_QNTOKEN', data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 设置Token
    VX_SET_TOKEN({ commit }, token) {
      commit('SET_TOKEN', token)
    },
    VX_SET_LOGINKEY({ commit }, loginKey) {
      commit('SET_LOGINKEY', loginKey)
    }
  }
}

export default user
