import request from '@/utils/request'

// 运营中心->统计报表->采购统计->采购员维度
export function fetchBuyerDimension(params) {
  return request({
    url: 'cmm/procurementStatistics/buyerDimension',
    method: 'get',
    params
  })
}
// 运营中心->统计报表->采购统计->商品维度
export function fetchProductDimension(params) {
  return request({
    url: 'cmm/procurementStatistics/productDimension',
    method: 'get',
    params
  })
}
// 运营中心->统计报表->采购统计->供应商维度
export function fetchSupplierDimension(params) {
  return request({
    url: 'cmm/procurementStatistics/supplierDimension',
    method: 'get',
    params
  })
}
// 运营中心->统计报表->采购统计->时间维度
export function fetchTimeDimension(params) {
  return request({
    url: 'cmm/procurementStatistics/timeDimension',
    method: 'get',
    params
  })
}

// 下面是销售统计
// 销售统计->时间维度
export function countHomeByTime(params) {
  return request({
    url: 'cmm/scmSalesOrder/countHomeByTime',
    method: 'get',
    params
  })
}
// 销售统计->商品维度
export function countHomeByGoods(params) {
  return request({
    url: 'cmm/scmSalesOrder/countHomeByGoods',
    method: 'get',
    params
  })
}
// 销售统计->客户维度
export function countHomeByCustomer(params) {
  return request({
    url: 'cmm/scmSalesOrder/countHomeByCustomer',
    method: 'get',
    params
  })
}
