import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    'imageCode': 'string',
    'password': '123456',
    'rememberMe': false,
    'username': 'admin01'
  }
  return request({
    url: 'cmm/operator/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: 'cmm/operator/logout',
    method: 'post'
  })
}

export function changePassword(data) {
  return request({
    url: 'cmm/operator/alterPassword',
    method: 'post',
    data
  })
}

// 获取权限菜单列表
export function fetchMenuList(params) {
  return request({
    url: 'cmm/resource/list4CurrentOperator',
    method: 'get',
    params
  })
}

// 获取权七牛 token
export function fetchToken(params) {
  return request({
    url: 'cmm/oss/upToken',
    method: 'get',
    params
  })
}
