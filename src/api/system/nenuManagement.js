import request from '@/utils/request'

// 获取权限菜单列表
export function fetchMenuList(params) {
  return request({
    url: 'resource/list4CurrentOperator',
    method: 'get',
    params
  })
}

// 类型下拉
export function fetchTypeDropDown(params) {
  return request({
    url: 'orgType/list4DropDown',
    method: 'get',
    params
  })
}

// 删除菜单
export function deleteRow(params) {
  return request({
    url: 'resource/delete',
    method: 'delete',
    params
  })
}

// 新建大类
export function createModule(data) {
  return request({
    url: 'resource/createModule',
    method: 'POST',
    data
  })
}
// 新建子类
export function createMenu(data) {
  return request({
    url: 'resource/createMenu',
    method: 'POST',
    data
  })
}
export function updateMenu(data) {
  return request({
    url: 'resource/update',
    method: 'POST',
    data
  })
}
export function createPage(data) {
  return request({
    url: 'resource/createPage',
    method: 'POST',
    data
  })
}
