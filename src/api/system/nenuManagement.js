import request from '@/utils/request'

// 获取权限菜单列表
export function fetchMenuList(params) {
  return request({
    url: 'cmm/resource/list4CurrentOperator',
    method: 'get',
    params
  })
}

// 类型下拉
export function fetchTypeDropDown(params) {
  return request({
    url: 'cmm/orgType/list4DropDown',
    method: 'get',
    params
  })
}

// 删除菜单
export function deleteRow(params) {
  return request({
    url: 'cmm/resource/delete',
    method: 'delete',
    params
  })
}

// 新建大类
export function createModule(data) {
  return request({
    url: 'cmm/resource/createModule',
    method: 'POST',
    data
  })
}
// 新建子类
export function createMenu(data) {
  return request({
    url: 'cmm/resource/createMenu',
    method: 'POST',
    data
  })
}
export function updateMenu(data) {
  return request({
    url: 'cmm/resource/update',
    method: 'POST',
    data
  })
}
export function createPage(data) {
  return request({
    url: 'cmm/resource/createPage',
    method: 'POST',
    data
  })
}
