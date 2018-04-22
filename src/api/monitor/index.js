import request from '@/utils/request'

export function fetchRealTime(query) {
  return request({
    url: '/api/shopInfo/shopAssistantInfo',
    method: 'get',
    params: query
  })
}

// 获取所有设备组
export function fetchGroups(query) {
  return request({
    url: 'rtusapi/devices/getgroups',
    method: 'get',
    params: query
  })
}

// 获取所有某组设备配置信息
export function fetchGroupsConfig(query) {
  return request({
    url: 'rtusapi/monitor/getmeasureconfig',
    method: 'get',
    params: query
  })
}
// 获取设备测量值
export function fetchmMeasureValue(query) {
  return request({
    url: 'rtusapi/monitor/getmeasurevalue',
    method: 'get',
    params: query
  })
}
