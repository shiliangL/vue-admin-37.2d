// 一些公共的 api
import request from '@/utils/request'

export function fecthSearch(url, params, method = 'get') {
  return request({
    url,
    method,
    params
  })
}

// export function fetchGroups(query) {
//   return request({
//     url: 'rtusapi/devices/getgroups',
//     method: 'get',
//     params: query
//   })
// }
