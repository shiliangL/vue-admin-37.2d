import Mock from 'mockjs'
import * as shopInfoAPI from '@/api/shopInfo'
import utils from '../utils'

const shopAssistantInfo = []
const TotalPageSize = Math.random() * 100

for (let i = 0; i < TotalPageSize; i++) {
  shopAssistantInfo.push(Mock.mock({

    //   `id` VARCHAR(25) NOT NULL COMMENT '企业ID。企业上下级关系通过企业ID描述.格式KAABBBBCCCCDDDDEEEEFFFF',
    // `name` VARCHAR(255) NOT NULL COMMENT '企业名称',
    // `addr` VARCHAR(255) NULL COMMENT '企业地址',
    // `number` VARCHAR(255) NULL COMMENT '企业营业执照号码',
    // `introduction` VARCHAR(255) NULL COMMENT '企业介绍',
    // `logo_pic_path` VARCHAR(255) NULL COMMENT '企业LOGO照片地址',
    // `business_license_pic_path` VARCHAR(255) NULL COMMENT '企业营业执照照片路径',
    // `certification` TINYINT NULL DEFAULT 0 COMMENT '实名认证. 0--未认证  1--提交认证  2--已认证',
    // `status` TINYINT NULL DEFAULT 1 COMMENT '企业状态   0--已失效 1--正常使用中',
    // `title_en` TINYINT NULL DEFAULT 0 COMMENT '系统显示使能  0--不显示 1--显示',
    // `title_name` VARCHAR(255) NULL COMMENT '系统标题显示名称',
    // `title_pic_path` VARCHAR(255) NULL COMMENT '标题图路径',
    // PRIMARY KEY(`id`),
    // UNIQUE INDEX`str_ent_name_UNIQUE`(`name` ASC),
    // UNIQUE INDEX`id_enterprise_UNIQUE`(`id` ASC))

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

utils.createAllMock(Apis, shopInfoAPI)

export default Apis
