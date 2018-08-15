import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: 'problemFeedback/page',
    method: 'get',
    params
  })
}

export function fetchDetail(params) {
  return request({
    url: 'problemFeedback/confirmationRead',
    method: 'get',
    params
  })
}

