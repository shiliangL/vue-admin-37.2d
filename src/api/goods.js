import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    'imageCode': 'string',
    'password': '123456',
    'rememberMe': false,
    'username': 'admin01'
  }
  return request({
    url: 'operator/login',
    method: 'post',
    data
  })
}

// 获取订单列表
export function orderList(data) {
  return request({
    url: 'scmSalesOrder/list',
    method: 'get',
    params: {
      index: data.index || 1,
      size: data.size || 10,
      ...data
    }
  })
}
