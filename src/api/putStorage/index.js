import request from '@/utils/request'

export function fecthList(params) {
  return request({
    url: 'stockInInfo/warehousingPage',
    method: 'get',
    params
  })
}
export function fecthHeaderDetail(params) {
  return request({
    url: 'stockInInfo/warehousingGetDetail',
    method: 'get',
    params
  })
}
export function fecthBodyDetail(params) {
  return request({
    url: 'stockInDetails/warehousingList',
    method: 'get',
    params
  })
}

