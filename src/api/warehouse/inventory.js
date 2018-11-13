import request from '@/utils/request'

export function fecthStockCategory(params) {
  return request({
    url: 'cmm/stockCategory/listAll',
    method: 'get',
    params
  })
}
export function fecthStockList(params) {
  return request({
    url: 'cmm/stockInfo/list',
    method: 'get',
    params
  })
}

