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
// 8: 验货员
// 9: 客服人员
export function fetchList(params) {
  return request({
    url: 'cmm/workbenchUser/page',
    method: 'get',
    params
  })
}
export function fetchDetail(params) {
  return request({
    url: 'cmm/workbenchUser/getDetail',
    method: 'get',
    params
  })
}
export function createRow(data) {
  return request({
    url: 'cmm/workbenchUser/create',
    method: 'post',
    data
  })
}
export function updateRow(data) {
  return request({
    url: 'cmm/workbenchUser/update',
    method: 'POST',
    data
  })
}
export function resetKey(id) {
  return request({
    url: 'cmm/operator/resetPassword?id=' + `${id}`,
    method: 'POST'
  })
}
// staffType
// 帐号类型(0: 普通管理员, 1: 配送人员, 2: 采购员, 3: 仓管员, 4: 分拣员, 5: 打包员, 6: 供应链主管, 7: 客户经理, 8: 验货员, 9: 客服人员, 10: 供应商, 11: 财务)
export function fecthMemberSelect(params) {
  return request({
    url: 'cmm/workbenchUser/querySelect',
    method: 'get',
    params
  })
}
