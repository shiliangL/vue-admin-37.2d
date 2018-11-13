import request from '@/utils/request'

// 加载列表 -- 出库----------------
export function fecthOutList(params) {
  return request({
    url: 'cmm/stockOutRecords/page',
    method: 'get',
    params
  })
}

export function fecthOutRe(params) {
  return request({
    url: 'cmm/stockOutDetails/page',
    method: 'get',
    params
  })
}
// 明细
export function fecthOutDetail(params) {
  return request({
    url: 'cmm/stockOutRecords/getDetail',
    method: 'get',
    params
  })
}
// 加载列表 -- 出库----------------
export function fecthOutTableDetail(params) {
  return request({
    url: 'cmm/stockOutDetails/list',
    method: 'get',
    params
  })
}

export function fecthOutReList(params) {
  return request({
    url: 'cmm/stockOutDetails/page',
    method: 'get',
    params
  })
}
export function fetchDetail(params) {
  return request({
    url: 'cmm/stockOutRecords/getDetail',
    method: 'get',
    params
  })
}
export function fetchTableDetail(params) {
  return request({
    url: 'cmm/stockOutDetails/page',
    method: 'get',
    params
  })
}
export function createRow(data) {
  return request({
    url: 'cmm/stockOutRecords/create',
    method: 'POST',
    data
  })
}

//  addList  stockId deliveryTime
export function addProductList(params) {
  return request({
    url: 'cmm/stockOutRecords/queryOutProductList',
    method: 'get',
    params
  })
}
export function addReturnList(params) {
  return request({
    url: 'cmm/stockOutRecords/queryOutProductReturnList',
    method: 'get',
    params
  })
}

// 加载仓库 公共
export function fecthStockList(params) {
  return request({
    url: 'cmm/stockInfo/list',
    method: 'get',
    params
  })
}
// 工作台 stockId type
// 工作台类型(1: QC验收台, 2: 入库台, 3: 出库台, 4: 分拣台, 5: 打包台)
export function fecthWorkBench(params) {
  return request({
    url: 'cmm/workbench/querySelect',
    method: 'get',
    params
  })
}
// staffType = 4
// 帐号类型(0:普通管理员 1:配送人员 2:采购员 3:仓管员 4:分拣员 5:打包员 6:供应链主管 7:客户经理)
export function fecthWorkbenchUser(params) {
  return request({
    url: 'cmm/workbenchUser/querySelect',
    method: 'get',
    params
  })
}
