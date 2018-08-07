export default {
  watch: {
    value(val) {
      if (val == null) {
        this.name = null
        this.selectList = []
        this.firstLoading = false
      } else {
        // this.selectList.push(val)
      }
    },
    upLevelId: {
      handler(val) {
        if (val) {
          this.firstLoading = false
        }
      }
    }
  }
}
