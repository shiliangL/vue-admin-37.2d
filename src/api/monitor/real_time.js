import request from '@/utils/request'

// 获取所有设备组1
export function fetchGroups(query) {
  return request({
    url: 'rtusapi/devices/getgroups',
    method: 'get',
    params: query
  })
}

// 获取所有某组设备配置信息2fetchMeasureConfig
export function fetchGetConfig(query) {
  return request({
    url: 'rtusapi/monitor/getmeasureconfig',
    method: 'get',
    params: query
  })
}
// 获取所有某组下的设备2
export function fetchGroupDev(query) {
  return request({
    url: 'rtusapi/monitor/getgroupstatus',
    method: 'get',
    params: query
  })
}
// 获取设备测量值3
export function fetchmMeasureValue(query) {
  return request({
    url: 'rtusapi/monitor/getmeasurevalue',
    method: 'get',
    params: query
  })
}

// 远程设置
// 获取所有某组 设备配置信息
export function fetchSetConfig(query) {
  return request({
    url: 'rtusapi/monitor/getsetupconfig',
    method: 'get',
    params: query
  })
}
// 获取设备设置值
export function fetchgSetUpvalue(query) {
  return request({
    url: 'rtusapi/monitor/getsetupvalue',
    method: 'get',
    params: query
  })
}
