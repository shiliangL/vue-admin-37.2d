/**
 * 三联单打印
 */
export default {
  created() {
    this.$print.setTarget(this)
  },
  methods: {
    printBarCode(data) {
      const pageW = 800
      const pageH = 600
      const LODOP = this.$print.getCLodop()
      if (!LODOP) return
      if (data.length > 0) {
        LODOP.SET_PRINT_PAGESIZE(1, pageW, pageH, '')
        LODOP.PRINT_INIT('商品条码打印', 0)

        LODOP.PREVIEW()
        // LODOP.PRINT_DESIGN();
      }
    }
  }
}
