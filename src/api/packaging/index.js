import request from '@/utils/request'

export function fecthList(params) {
  return request({
    url: 'packageInfo/packagePage',
    method: 'get',
    params
  })
}
export function fecthHeaderDetail(params) {
  return request({
    url: 'packageInfo/packageGetDetail',
    method: 'get',
    params
  })
}
export function fecthBodyDetail(params) {
  return request({
    url: 'packageDetails/packageList',
    method: 'get',
    params
  })
}
export function packageScavenging(params) {
  return request({
    url: 'packageDetails/packageDetailScavenging',
    method: 'get',
    params
  })
}

export function outUpdateQuantity(data) {
  return request({
    url: 'packageInfo/packagePrintLabel',
    method: 'POST',
    data
  })
}

