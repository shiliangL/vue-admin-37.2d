import request from '@/utils/request'

// 加载列表
export function fetchCityList(params) {
  return request({
    url: 'cmm/cnArea/listChildrenAreaByParent?parentId=0',
    method: 'get',
    params
  })
}

// 加载组件
export function fetchBase(url, params, method = 'get') {
  return request({
    url: `cmm/${url}`,
    method,
    params
  })
}
