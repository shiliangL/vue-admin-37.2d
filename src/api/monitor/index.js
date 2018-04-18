import request from '@/utils/request'

export function fetchRealTime(query) {
  return request({
    url: '/api/shopInfo/shopAssistantInfo',
    method: 'get',
    params: query
  })
}

