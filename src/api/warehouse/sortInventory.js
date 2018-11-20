import request from '@/utils/request'

// 仓库
export function fecthStockList(params) {
  return request({
    url: 'cmm/stockInfo/list',
    method: 'get',
    params
  })
}

// 仓位
export function fetchStockCategory(params) {
  return request({
    url: 'cmm/stockCategory/listAll',
    method: 'get',
    params
  })
}
export function fetchInventoryProduct(params) {
  return request({
    url: 'cmm/stockInventory/pageStockInventoryProduct',
    method: 'get',
    params
  })
}
// 盘点记录+盘点核查
export function fetchInventoryRecord(params) {
  return request({
    url: 'cmm/stockInventory/pageStockInventoryRecord',
    method: 'get',
    params
  })
}

// 库存盘点
export function updateStockInventory(data) {
  return request({
    url: 'cmm/stockInventory/stockInventory',
    method: 'post',
    data
  })
}

// 核实盘点
export function updateStockCheck(data) {
  return request({
    url: 'cmm/stockInventory/stockCheck',
    method: 'post',
    data
  })
}

