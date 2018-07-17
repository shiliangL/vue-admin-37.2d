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
    method: 'post'
  })
}

// 获取权限菜单列表
export function fetchMenuList(params) {
  return request({
    url: 'resource/list4CurrentOperator',
    method: 'get',
    params
  })
}

// 获取权七牛 token
export function fetchToken(params) {
  return request({
    url: 'oss/upToken',
    method: 'get',
    params
  })
}
