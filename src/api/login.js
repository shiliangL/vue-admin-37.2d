import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    account: username,
    password: password
  }
  return request({
    url: 'rtusapi/users/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  // 登录成功后 根据 token 获取客户信息
  return request({
    url: 'rtusapi/users/getuserinfo',
    method: 'get'
    // params: { token }
  })
}
