import request from '@/utils/request'

export function loginByUsername(data) {
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

export function getUserInfo(params) {
  // 登录成功后 根据 token 获取客户信息
  return request({
    url: 'operator/getCurrentOperator',
    method: 'get',
    params
  })
}
