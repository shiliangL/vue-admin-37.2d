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
export function orderList(params) {
  return request({
    url: 'scmSalesOrder/list',
    method: 'get',
    params
  })
}

// 加载订单列表明细
export function orderDetail(params) {
  return request({
    url: 'scmSalesOrder/detail',
    method: 'get',
    params
  })
}
