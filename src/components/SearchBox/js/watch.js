export default {
  watch: {
    value(val) {
      if (val == null) {
        this.name = null
        this.firstLoading = false
        this.placeholder = this.data.placeholder
      } else {
        this.selectList.push(val)
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
