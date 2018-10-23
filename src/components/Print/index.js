import PrintParent from './print'

class Print extends PrintParent {
  // constructor(opt) {
  //   super(opt)
  // }
  printCode(dataArr, target, newKeys) {
    this.setTarget(target)
    const LODOP = this.getCLodop()
    const pageW = 450
    const pageH = 350
    const keys = {
      billCode: 'billCode',
      receiveName: 'receiveName',
      deliverName: 'deliverName',
      date: 'date',
      quantity: 'quantity',
      remark: 'remark'
    }

    Object.assign(keys, newKeys)

    LODOP.SET_PRINT_PAGESIZE(1, pageW, pageH, '')
    LODOP.PRINT_INIT('条码打印', 0)

    if (Array.isArray(dataArr)) {
      dataArr.forEach((item, index) => {
        if (index > 0) {
          LODOP.NewPage()
        }
        print(item)
      })
    } else {
      print(dataArr)
    }

    LODOP.PREVIEW()
    LODOP.SET_PREVIEW_WINDOW(0, 0, 0, 0, 0, '')

    function print(data) {
      const titleL = 10
      const textL = titleL + 35
      let top = 35
      const topGutter = 20

      LODOP.ADD_PRINT_TEXT(25, titleL, 100, 20, '单号:')
      LODOP.ADD_PRINT_BARCODE(0, textL, 200, 50, 'EAN128B', replaceEmpty(data[keys.billCode]))
      LODOP.SET_PRINT_STYLEA(0, 'AlignJustify', 2)
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 6)
      addLine()

      LODOP.ADD_PRINT_TEXT(top, titleL, 100, 20, '收方:')
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
      LODOP.ADD_PRINT_TEXT(top - 3, textL, 200, 20, replaceEmpty(data[keys.receiveName]))
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 13)
      LODOP.SET_PRINT_STYLEA(0, 'Bold', 1)
      addLine()

      LODOP.ADD_PRINT_TEXT(top, titleL, 100, 20, '发方:')
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
      LODOP.ADD_PRINT_TEXT(top, textL, 200, 20, replaceEmpty(data[keys.deliverName]))
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
      addLine()

      LODOP.ADD_PRINT_TEXT(top + 3, titleL, 110, 20, '日期:')
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
      LODOP.ADD_PRINT_TEXT(top, textL, 150, 20, data[keys.date] ? new Date(data[keys.date]).Format('yyyy/MM/dd') : '')
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 13)
      LODOP.SET_PRINT_STYLEA(0, 'Bold', 1)

      LODOP.ADD_PRINT_TEXT(top + 3, textL + 120, 110, 20, '数量:')
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
      LODOP.ADD_PRINT_TEXT(top, textL * 2 - titleL + 120, 150, 20, replaceEmpty(data[keys.quantity]))
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 13)
      LODOP.SET_PRINT_STYLEA(0, 'Bold', 1)
      add()
      add(10)

      LODOP.ADD_PRINT_TEXT(top, titleL, 100, 20, '备注:')
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
      LODOP.ADD_PRINT_TEXT(top, textL, 200, 20, replaceEmpty(data[keys.remark]))
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)

      function add(step) {
        top += step || topGutter
      }

      function addLine() {
        add()
        LODOP.ADD_PRINT_LINE(top, titleL - 5, top, 245, 0, 1)
        add(10)
      }
    }

    function replaceEmpty(val) {
      return (val === null || typeof val === 'undefined') ? '' : val
    }
  }
}

export default Print
