import request from '@/utils/request'

export function list(params) {
  return request({
    url: 'productInfo/listProductInfo',
    method: 'get',
    params
  })
}
export function fecthGoodsClass(params) {
  return request({
    url: 'productCategory/listAll',
    method: 'get',
    params
  })
}
// 删除
export function deletepProduct(params) {
  return request({
    url: 'productInfo/deleteProductInfo',
    method: 'delete',
    params
  })
}
// 下架
export function productsDown(params) {
  return request({
    url: 'productInfo/frameGoods',
    method: 'PUT',
    params
  })
}
// 上架
export function productsUp(params) {
  return request({
    url: 'productInfo/upperGoods',
    method: 'PUT',
    params
  })
}

// 详情
export function productDetail(params) {
  return request({
    url: 'productInfo/getProductInfo',
    method: 'get',
    params
  })
}

export function fetchToken(params) {
  return request({
    url: 'oss/upToken',
    method: 'get',
    params
  })
}
