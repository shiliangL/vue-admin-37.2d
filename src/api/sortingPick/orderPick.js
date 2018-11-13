import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url: 'cmm/packageInfo/page',
    method: 'get',
    params
  })
}
export function fetchDetail(params) {
  return request({
    url: 'cmm/packageInfo/getDetail',
    method: 'get',
    params
  })
}
export function fetchTable(params) {
  return request({
    url: 'cmm/packageDetails/list',
    method: 'get',
    params
  })
}
// 加载仓库
export function fecthStockList(params) {
  return request({
    url: 'cmm/stockInfo/list',
    method: 'get',
    params
  })
}
// 加载工作台
// 工作台类型 type (1: QC验收台, 2: 入库台, 3: 出库台, 4: 分拣台, 5: 打包台)
export function fecthWorkbench(params) {
  return request({
    url: 'cmm/workbench/querySelect',
    method: 'get',
    params
  })
}

