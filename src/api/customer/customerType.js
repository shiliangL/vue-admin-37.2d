import request from '@/utils/request'

// 加载列表
export function fetchList(params) {
  return request({
    url: 'customerCategory/list',
    method: 'get',
    params
  })
}
// 新增
export function create(data) {
  return request({
    url: 'customerCategory/createCategory',
    method: 'post',
    data
  })
}
// 删除
export function deleteOne(params) {
  return request({
    url: 'customerCategory/delete',
    method: 'delete',
    params
  })
}
// 明细
export function detail(params) {
  return request({
    url: 'customerCategory/detail',
    method: 'get',
    params
  })
}
// 更新
export function update(data) {
  return request({
    url: 'customerCategory/update',
    method: 'POST',
    data
  })
}
