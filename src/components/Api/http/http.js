import axios from 'axios'
// import Qs from 'qs'
export default class Http {
  constructor() {
    this.$http = this.newAxios()
    this.token = ''
  }

  newAxios() {
    return axios.create({
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: this.token
      },
      timeout: 1000 * 7
    })
  }

  setToken(token) {
    this.token = token
    this.$http = this.newAxios()
  }

  getToken() {
    return this.token
  }

  getRequestHeader() {
    return {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: this.token
      },
      timeout: 1000 * 7
    }
  }

  /**
     * get 请求
     * @param url
     * @param params 参数
     * @param callBack 回到函数
     */
  get(url, params, callBack) {
    const _this = this
    this.$http.get(this.appendDomain(url), {
      params: params
    }).then(response => {
      callBack(response, true)
    }).catch(error => {
      callBack(_this.handleError(error), false)
    })
  }

  /**
     * 通用分页
     * @param url
     * @param size 每页显示条数
     * @param page 当前页下标
     * @param callBack 回调函数
     */
  getPage(url, size, page, callBack) {
    const _this = this
    const params = {
      size: size,
      page: page
    }
    this.$http.get(this.appendDomain(url), {
      params: params
    }).then(response => {
      callBack(response, true)
    }).catch(error => {
      callBack(_this.handleError(error), false)
    })
  }

  /**
     * 默认分页，默认每页显示10条
     * @param url
     * @param page 当前页下标
     * @param callBack 回调函数
     */
  getDefaultPage(url, page, callBack) {
    var _this = this
    var params = {
      size: 10,
      page: page
    }
    this.$http.get(this.appendDomain(url), {
      params: params
    }).then(response => {
      callBack(response, true)
    }).catch(error => {
      callBack(_this.handleError(error), false)
    })
  }

  /**
     * post请求
     * @param url
     * @param params
     * @param callBack
     */
  post(url, params, callBack) {
    const _this = this
    // const qsParams = Qs.stringify(params)
    this.$http.post(this.appendDomain(url), params).then(response => {
      callBack(response, true)
    }).catch(error => {
      callBack(_this.handleError(error), false)
    })
  }

  /**
     * [postUrl description]
     * @param  {[type]} url      [description]
     * @param  {[type]} params   [description]
     * @param  {[type]} callBack [description]
     * @return {[type]}          [description]
     */
  postUrl(url, params, callBack) {
    const _this = this
    this.$http.post(this.appendDomain(url) + this.urlParams(params), null).then(response => {
      callBack(response, true)
    }).catch(error => {
      callBack(_this.handleError(error), false)
    })
  }

  postUrlTwo(url, urlParam, params, callBack) {
    const _this = this
    this.$http.post(this.appendDomain(url) + this.urlParams(urlParam), params).then(response => {
      callBack(response, true)
    }).catch(error => {
      callBack(_this.handleError(error), false)
    })
  }

  urlParams(params) {
    if (params == null) return ''
    var paramStr = '?'
    for (var key in params) {
      paramStr += key + '=' + params[key] + '&'
    }
    paramStr = paramStr.substring(0, paramStr.length - 1) // 将a字符串转换成数组
    return paramStr
  }

  /**
     * put 请求
     * @param url
     * @param params
     * @param callBack
     */
  put(url, params, callBack) {
    const _this = this
    this.$http.put(this.appendDomain(url), params).then(response => {
      callBack(response, true)
    }).catch(error => {
      callBack(_this.handleError(error), false)
    })
  }

  putUrl(url, params, callBack) {
    const _this = this
    this.$http.put(this.appendDomain(url) + this.urlParams(params), null).then(response => {
      callBack(response, true)
    }).catch(error => {
      callBack(_this.handleError(error), false)
    })
  }

  /**
     * delete请求
     * @param url
     * @param params
     * @param callBack
     */
  delete(url, params, callBack) {
    const _this = this
    this.$http.delete(this.appendDomain(url), {
      params: params
    }).then(response => {
      callBack(response, true)
    }).catch(error => {
      callBack(_this.handleError(error), false)
    })
  }

  /**
     * [putUploadFile description]
     * @param  {[type]} url      [description]
     * @param  {[type]} formData [description]
     * @param  {[type]} callBack [description]
     * @return {[type]}          [description]
     */
  putFileUpload(url, formData, callBack) {
    const _this = this
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: this.token
      }
    }
    axios.put(this.appendDomain(url), formData, config).then(response => {
      callBack(response, true)
    }).catch(error => {
      callBack(_this.handleError(error), false)
    })
  }

  /**
     * post表单提交
     * @param  {[type]} url      [地址]
     * @param  {[type]} formData [表单对象]
     * @param  {[type]} callBack [回调函数]
     * @return {[type]}          [reponse]
     */
  postFileUpload(url, formData, callBack) {
    const _this = this
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: this.token
      }
    }
    axios.post(this.appendDomain(url), formData, config).then(response => {
      callBack(response, true)
    }).catch(error => {
      callBack(_this.handleError(error), false)
    })
  }

  handleError(error) {
    const resp = {
      code: 0,
      message: null,
      random: Math.random() * 100
    }
    if (error.response) {
      if (error.response.status === 401) {
        window.postMessage('401', '*')
        resp.code = 401
      } else if (error.response.status === 500) {
        resp.message = '服务器内部出错'
        resp.code = 500
      } else if (error.response.status === 504) {
        resp.message = error.response.data
        resp.code = 504
      } else if (error.response.status === 502) {
        resp.message = '网关延时'
        resp.code = 502
      } else if (error.response.status === 503) {
        resp.message = '服务未启动'
        resp.code = 502
      }
    } else {
      resp.code = -1
      resp.message = error.message
    }
    return resp
  }

  appendDomain(url) {
    return url
  }
}
