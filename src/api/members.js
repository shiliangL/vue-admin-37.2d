import request from '@/utils/request'

// 加载列表
// staffType
// 1: 配送人员
// 2: 采购员
// 3: 仓管员
// 4: 分拣员
// 5: 打包员
// 6: 供应链主管
// 7: 客户经理
export function fetchList(params) {
  return request({
    url: 'workbenchUser/page',
    method: 'get',
    params
  })
}
export function fetchDetail(params) {
  return request({
    url: 'workbenchUser/getDetail',
    method: 'get',
    params
  })
}
export function createRow(data) {
  return request({
    url: 'workbenchUser/create',
    method: 'post',
    data
  })
}
export function updateRow(data) {
  return request({
    url: 'workbenchUser/update',
    method: 'POST',
    data
  })
}
export function resetKey(id) {
  return request({
    url: 'operator/resetPassword?id=' + `${id}`,
    method: 'POST'
  })
}
// staffType 帐号类型(0: 普通管理员 1: 配送人员 2: 采购员 3: 仓管员 4: 分拣员 5: 打包员 6: 供应链主管 7: 客户经理)
export function fecthMemberSelect(params) {
  return request({
    url: 'workbenchUser/querySelect',
    method: 'get',
    params
  })
}
