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

export function fetchMenuList(params) {
  // 获取权限菜单列表
  return request({
    url: 'resource/list4CurrentOperator',
    method: 'get',
    params
  })
}
