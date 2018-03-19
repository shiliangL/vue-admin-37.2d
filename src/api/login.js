import request from '@/utils/request'

export function login(account, password) {
  return request({
    url: 'rtusapi/users/login',
    method: 'post',
    data: {
      account,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: 'rtusapi/users/getuserinfo',
    method: 'get'
    // params: { token }
  })
}

export function logout() {
  return request({
    url: 'rtusapi/users/logout',
    method: 'post'
  })
}
