import request from '@/utils/request'

export function fecthList(params) {
  return request({
    url: 'stockOutRecords/outPage',
    method: 'get',
    params
  })
}
export function fecthHeaderDetail(params) {
  return request({
    url: 'stockOutRecords/outGetDetail',
    method: 'get',
    params
  })
}
export function fecthBodyDetail(params) {
  return request({
    url: 'stockOutDetails/outList',
    method: 'get',
    params
  })
}

export function outUpdateQuantity(data) {
  return request({
    url: 'stockOutDetails/outUpdateQuantity',
    method: 'POST',
    data
  })
}

