import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
axios.defaults.withCredentials = true
// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})

// 请求拦截
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  console.log(error) // for debug
  Promise.reject(error)
})

// 响应返回拦截
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.result !== 'ok') {
      // 判断业务情况 根据不同的状态码
      // // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      // return response.data
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.msg && res.msg === 'NoLogin') {
        Message({ message: `登录过期`, type: 'error', duration: 400, showClose: true })
        store.dispatch('FedLogOut').then(() => {
          location.reload()// 为了重新实例化vue-router对象 避免bug
        })
      }
      return Promise.reject(res)
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: `${error.message}`,
      type: 'error',
      duration: 2000,
      showClose: true
    })
    return Promise.reject(error)
  }
)

export default service
