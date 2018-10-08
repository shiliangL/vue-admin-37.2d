import request from '@/utils/request'

// 加载列表
export function fetchList(params) {
  return request({
    url: 'productInfo/changePrice',
    method: 'get',
    params
  })
}

export function updateRow(data) {
  return request({
    url: 'productInfo/updatePrice',
    method: 'POST',
    data
  })
}
