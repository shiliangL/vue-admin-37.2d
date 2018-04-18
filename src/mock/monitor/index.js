import Mock from 'mockjs'
import * as monitorAPI from '@/api/monitor'
import utils from '../utils'

const shopAssistantInfo = []
const TotalPageSize = Math.random() * 100

for (let i = 0; i < TotalPageSize; i++) {
  shopAssistantInfo.push(Mock.mock({
    'id': '@string("number", 16)',
    name() {
      return Mock.mock('@city') + '分公司'
    },
    'code|1': ['LLX', 'BTS', 'NKT', 'APL'],
    addr() {
      return Mock.mock('@city') + '区'
    },
    'number': '@string("number", 15)',
    introduction() {
      return '企业LOGO'
    },
    logo_pic_path() {
      return '相关企业介绍'
    },
    business_license_pic_path() {
      return '企业营业执照照片路径'
    },
    'certification|1': [0, 1, 2], // '实名认证. 0--未认证  1--提交认证  2--已认证',
    'status|1': [0, 1], // '企业状态   0--已失效 1--正常使用中',
    'title_en|1': [0, 1], // '系统显示使能  0--不显示 1--显示',
    title_name() {
      return '系统标题显示名称'
    },
    title_pic_path() {
      return '标题图路径'
    }
  }))
}
const Apis = {
  fetchShopAssistantInfo(config) {
    const { page = 1,
      size = 20,
      orderNo,
      recevier,
      deliverType,
      startDate,
      endDate,
      shopName
    } = utils.getPranams(config)

    const pranams = [{
      type: 'like',
      key: 'orderNo',
      value: orderNo
    }, {
      type: 'like',
      key: 'recevier',
      value: recevier
    }, {
      type: 'like',
      key: 'shopName',
      value: shopName
    }, {
      type: 'eq',
      key: 'deliverType',
      value: deliverType
    }, {
      type: 'timeGte',
      key: 'saleDate',
      value: startDate
    }, {
      type: 'timeLte',
      key: 'saleDate',
      value: endDate
    }]

    const filterMock = utils.query(shopAssistantInfo, pranams)

    const ret = utils.setPageRet(filterMock, page, size)

    utils.log('MockLists:', ret, config)

    return ret
  }
}

utils.createAllMock(Apis, monitorAPI)

export default Apis
