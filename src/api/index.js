import request from '@/utils/request'

export function fecthSearch(url, params, method = 'get') {
  return request({
    url,
    method,
    params
  })
}
