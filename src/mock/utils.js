import Mock from 'mockjs'
import { param2Obj } from '@/utils'

export default {
  /**
   * 根据api文件 生成mock匹配规则 (api文件下的函数名要和mock的一致)
   * @param {api文件下的函数} apiFn
   * @param {执行的函数} fn
   */
  createMock(apiFn, fn) {
    const obj = this.getFnPranams(apiFn)

    if (obj.method) {
      Mock.mock(new RegExp('(' + obj.url + '\\?\.*)|(' + obj.url + ')$'), obj.method, fn)
    } else {
      // 如果找不到该提交类型把四种常见的都加上去
      const arr = ['post', 'get', 'delete', 'put']

      arr.forEach((item) => {
        Mock.mock(new RegExp('(' + obj.url + '\\?\.*)|(' + obj.url + ')$'), item, fn)
      })
    }
  },
  /**
   * 根据api文件 批量生成mock匹配规则
   * @param {mock文件下的函数} mockobjs
   * @param {api文件下的函数集合} ApiObj
   */
  createAllMock(mockobjs, ApiObj) {
    for (const prop in mockobjs) {
      this.createMock(ApiObj[prop], mockobjs[prop])
    }
  },
  /**
   * 通过正则找到url
   * @param {需要解析的函数} fn
   */
  getFnPranams(fn) {
    const str = fn + ''
    let url = ''
    let method = ''
    const urlReg = str.match(/url\s*:\s*'([\S]*)'/)
    const methodReg = str.match(/method\s*:\s*'([\S]*)'/)

    url = urlReg ? urlReg[1] : ''
    method = methodReg ? methodReg[1] : null
    method = method && ['put', 'get', 'post', 'delete', 'head', 'connect', 'options', 'trace', 'patch'].includes(method.toLocaleLowerCase()) ? method : null
    return {
      url,
      method
    }
  },
  /**
   * 带颜色的打印
   * @param {打印的文本} title
   * @param {其他参数} arg
   */
  log(title, ...arg) {
    const str = '%c ' + title
    const arr = [str, 'color:red', ...arg]
    console.info.apply(null, arr)
  },
  /**
   * 返回常规的返回结构
   * @param {返回头类型} type
   */
  createCommonRes(type) {
    const obj = {
      resultCode() {
        return Math.random() * 10 < 9 ? 0 : 1
      },
      message: null,
      data: null
    }
    // 分页形式
    if (type === 'page') {
      obj.data = {
        numberOfElements: 50,
        size: 10,
        totalElements: 50
      }
    }

    return Mock.mock(obj)
  },
  /**
   * 截取mock数据
   * @param {截取的对象} arr
   * @param {页码} page
   * @param {页数} size
   */
  sliceMockData(arr, page, size) {
    return arr.slice(size * page, size * (page + 1))
  },
  isEmpty(val) {
    return val === '' || val === null || typeof val === 'undefined'
  },
  daoLike(val1, val, reg) {
    const reg2 = reg || new RegExp(val1)
    return this.isEmpty(val1) || reg2.test(val)
  },
  /**
   * 模拟查询
   * @param {整个mock数据} arr
   * @param {查询条件} querys
   * @param {额外查询条件} fn
   */
  query(arr, querys = [], fn) {
    const { isEmpty } = this

    return arr.filter((item) => {
      let flag = true

      for (let i = 0, len = querys.length; i < len; i++) {
        const query = querys[i]
        const val1 = query.value
        const val2 = item[query.key]

        if (!flag) {
          break
        }

        switch (query.type) {
          case 'like': {
            let likeFlag = false
            const keys = query.key.split(',')

            for (let j = 0, len2 = keys.length; j < len2; j++) {
              const curKey = keys[j].trim()
              if (likeFlag) break
              likeFlag = this.daoLike(val1, item[curKey])
            }
            flag = flag && likeFlag
            break
          }

          case 'gt':
            flag = flag && (isEmpty(val1) || val1 > val2)
            break
          case 'gte':
            flag = flag && (isEmpty(val1) || val1 > val2 || val1 === val2)
            break
          case 'lt':
            flag = flag && (isEmpty(val1) || val1 < val2)
            break
          case 'lte':
            flag = flag && (isEmpty(val1) || val1 < val2 || val1 === val2)
            break
          case 'neq':
            flag = flag && (isEmpty(val1) || val1 !== val2)
            break
          case 'eq':
            flag = flag && (isEmpty(val1) || val1 === val2)
            break
          case 'timeEq': {
            const time1 = new Date(val1).getTime()
            const time2 = new Date(val2).getTime()
            flag = flag && (isEmpty(val1) || time1 === time2)
            break
          }
          case 'timeGte': {
            const time1 = new Date(val1).getTime()
            const time2 = new Date(val2).getTime()

            flag = flag && (isEmpty(val1) || time1 < time2 || time1 === time2)
            break
          }
          case 'timeLte': {
            const time1 = new Date(val1).getTime()
            const time2 = new Date(val2).getTime()
            flag = flag && (isEmpty(val1) || time1 > time2 || time1 === time2)
            break
          }
        }
      }
      if (typeof fn === 'function') {
        flag = flag && fn(item)
      }

      return flag
    })
  },
  /**
   * 设置返回的数据
   * @param {过滤完成后的mock数据} filterMock
   * @param {页码} page
   * @param {每页的总数} size
   */
  setPageRet(filterMock, page, size) {
    const ret = this.createCommonRes('page')
    const pageList = this.sliceMockData(filterMock, page, size)
    if (ret.resultCode !== 0) {
      ret.message = '获取数据失败'
    }

    ret.data.content = pageList
    ret.data.totalElements = filterMock.length
    ret.data.size = size

    return ret
  },
  /**
   * 获取传过来的参数转化为json
   * @param {获取传过来的参数} config
   */
  getPranams(config) {
    return config.body ? JSON.parse(config.body) : param2Obj(config.url)
  }
}
