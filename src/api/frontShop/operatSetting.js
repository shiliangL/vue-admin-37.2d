import request from '@/utils/request'

export function fetchSetting(params) {
  return request({
    url: 'cmm/scmSalesRule/detail',
    method: 'get',
    params
  })
}

export function updateSetting(data) {
  return request({
    url: 'cmm/scmSalesRule/update',
    method: 'PUT',
    data
  })
}

