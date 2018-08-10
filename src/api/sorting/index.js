import request from '@/utils/request'

export function fecthList(params) {
  return request({
    url: 'sortingScheduleInfo/sorterPage',
    method: 'get',
    params
  })
}
export function fecthHeaderDetail(params) {
  return request({
    url: 'sortingScheduleInfo/sorterGetDetail',
    method: 'get',
    params
  })
}
export function fecthBodyDetail(params) {
  return request({
    url: 'sortingDetails/sorterList',
    method: 'get',
    params
  })
}

export function outUpdateQuantity(data) {
  return request({
    url: 'sortingDetails/sorterPrintLabel',
    method: 'POST',
    data
  })
}

