/**
 * 三联单打印
 */
export default {
  created() {
    this.$print.setTarget(this)
  },
  methods: {
    printBarCode() {
      const LODOP = this.$print.getCLodop()
      if (!LODOP) return
      debugger
      LODOP.ADD_PRINT_TABLE(128, '', '260mm', '135mm', document.getElementById('table1').innerHTML)
      LODOP.SET_PRINT_STYLEA(0, 'ItemType', 1)
      LODOP.SET_PRINT_STYLEA(0, 'LinkedItem', 1)

      LODOP.ADD_PRINT_TABLE(128, '', '260mm', '135mm', document.getElementById('table2').innerHTML)
      LODOP.SET_PRINT_STYLEA(0, 'ItemType', 1)
      LODOP.SET_PRINT_STYLEA(0, 'LinkedItem', 1)

      LODOP.ADD_PRINT_TABLE(128, '', '260mm', '135mm', document.getElementById('table3').innerHTML)
      LODOP.SET_PRINT_STYLEA(0, 'ItemType', 1)
      LODOP.SET_PRINT_STYLEA(0, 'LinkedItem', 1)

      LODOP.ADD_PRINT_TABLE(128, '', '260mm', '135mm', document.getElementById('table4').innerHTML)
      LODOP.SET_PRINT_STYLEA(0, 'ItemType', 1)
      LODOP.SET_PRINT_STYLEA(0, 'LinkedItem', 1)

      LODOP.PREVIEW()
      // if (data.length > 0) {
      //   LODOP.SET_PRINT_PAGESIZE(1, 1500, 1000, 'CreateCustomPage')
      //   LODOP.PRINT_INIT('商品条码打印', 0)
      //   LODOP.PREVIEW()
      //   // LODOP.PRINT_DESIGN();
      // }
    }
  }
}
