import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: 'cmm/problemFeedback/page',
    method: 'get',
    params
  })
}

export function fetchDetail(params) {
  return request({
    url: 'cmm/problemFeedback/confirmationRead',
    method: 'get',
    params
  })
}

