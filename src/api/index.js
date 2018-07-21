// 一些公共的 api
import request from '@/utils/request'

export function fecthSearch(url, params, method = 'get') {
  return request({
    url,
    method,
    params
  })
}

// 获取当前登录信息 用于刷新的时候保证数据完整性
export function fetchLoginInfo(params) {
  return request({
    url: 'rtusapi/users/getaccountinfo',
    method: 'get',
    params
  })
}
