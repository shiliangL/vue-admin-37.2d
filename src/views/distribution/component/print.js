/**
 * 打印
 */
// import { getLodop } from './LodopFun.js'
export default {
  created() {
    // this.$print.setTarget(this)
  },
  methods: {
    printGoods() {
      console.log('打印单据')
      // let LODOP = this.$print.getCLodop();
      // if (!LODOP) return;
      const content = [
        {
          'id': '1f22fbe5029240978c1e135b1f3d4e31',
          'orderId': '10dc9980d1464b10951f2145f38ce881',
          'orderNo': 'XSDD1540190063625887',
          'customerTitle': '九鲤千里香馄饨王',
          'beginTime': '01:00:00',
          'endTime': '01:30:00',
          'sendDate': '2018-10-22',
          'serialNumber': 'XSPS1540198174214205',
          'driverId': '3d2887340be941e48cd85a397149d873',
          'driverName': '胡锋',
          'factTime': null,
          'status': 0,
          'type': 0,
          'isEnTruck': 0,
          'title': null,
          'createOn': '2018-10-22 14:34:24',
          'stockName': '泉水仓库'
        }
      ]
      this.printGoodsNBarCode(content)
    },
    printGoodsNBarCode(data) {
      const pageW = 200
      const pageH = 200
      const LODOP = this.$print.getCLodop()

      if (data.length > 0) {
        LODOP.SET_PRINT_PAGESIZE(1, pageW, pageH, 'A4')
        LODOP.PRINT_INIT('销售订单-打印测试', 0)

        // LODOP.ADD_PRINT_BARCODE(0, 0, 200, 100, '128A', '*123ABC4567890*')
        LODOP.ADD_PRINT_HTM(88, 40, 321, 185, document.getElementById('salesDelivery').innerHTML)

        // data.forEach((sub, index) => {
        //   if (index > 0) {
        //     LODOP.NewPageA()
        //   }
        //   LODOP.ADD_PRINT_TEXT(8, 6, 40, 23, '订单编号:')
        //   LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
        //   LODOP.SET_PRINT_STYLEA(0, 'Bold', 1)
        //   LODOP.ADD_PRINT_TEXT(5, 48, 206, 30, sub.orderNo)

        //   LODOP.ADD_PRINT_TEXT(34, 6, 60, 23, '下单时间:')
        //   LODOP.SET_PRINT_STYLEA(0, 'FontName', 'Yu Gothic UI Semibold')
        //   LODOP.SET_PRINT_STYLEA(0, 'Bold', 1)
        //   LODOP.ADD_PRINT_TEXT(5, 48, 206, 30, sub.sendDate)

        //   LODOP.ADD_PRINT_TEXT(34, 6, 60, 23, '客户名称:')
        //   LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
        //   LODOP.SET_PRINT_STYLEA(0, 'Bold', 1)
        //   LODOP.ADD_PRINT_TEXT(38, 68, 160, 23, sub.customerTitle || '')
        // })
        LODOP.PREVIEW()
        // LODOP.PRINT_DESIGN();
        // LODOP.SET_PREVIEW_WINDOW(0, 0, 0, 0, 0, '')
        // LODOP.PRINT()// 直接打印
      }
    }
  }
}
