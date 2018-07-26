import request from '@/utils/request'

// 加载列表
export function fetchCityList(params) {
  return request({
    url: 'cnArea/listChildrenAreaByParent?parentId=0',
    method: 'get',
    params
  })
}
