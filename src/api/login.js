import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    'imageCode': 'string',
    'password': '123456',
    'rememberMe': false,
    'username': 'admin01'
  }
  return request({
    url: 'operator/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: 'operator/logout',
    method: 'get'
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
