import request from '@/utils/request'

export function fetchShopAssistantInfo(query) {
  return request({
    url: '/api/shopInfo/shopAssistantInfo',
    method: 'get',
    params: query
  })
}

export function fetchPutOnManage(query) {
  return request({
    url: '/api/shopInfo/putOnManage',
    method: 'get',
    params: query
  })
}

export function fetchOffLineOrder(query) {
  return request({
    url: '/api/shopInfo/offLineOrder',
    method: 'get',
    params: query
  })
}
