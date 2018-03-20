
export default {
  name: 'real_time',
  components: {
  },
  data() {
    return {
      maxHeight: 500,
      isLoading: false,
      loading: true,
      urls: {
        list: 'orgCompanys',
        delete: 'orgCompany/delete',
        updateStatus: 'orgCompany/updateStatus'
      },
      dialogTitle: '',
      loadingText: '',
      searchName: '',
      tableData: [],
      dialogFormVisible: false,
      total: 0,
      currentPage: 1,
      pageSize: 10,
      propsOption: {
        editType: null,
        editID: null
      }, // 传递对象
      previewData: false, // 是否预览详细
      showAddForm: false, // 新增添加层
      isPreview: false, // 是否是显示
      previewDataID: null, // 预览数据 id
      isEdit: false
    }
  },
  methods: {
    reset() {
      this.searchName = ''
    },
    handleSizeChange(val) {
      this.currentPage = 1
      this.pageSize = val
      this.search(this.currentPage)
    },
    dismiss() {
      this.previewData = false
      this.dialogFormVisible = false
      this.isPreview = false
      this.showAddForm = false
      this.isEdit = false
    },
    search(page) {
      if (!this.isLoading) {
        this.isLoading = true
        this.loading = true
        const params = {
          page: page - 1,
          size: this.pageSize,
          nameOrCode: this.searchName
        }
        params.page = !isNaN(page) ? page - 1 : 0
        this.$http.get(this.urls.list, params, (response, status) => {
          this.isLoading = false
          if (status && response.data.resultCode == 0) {
            this.tableData = response.data.data.content
            this.loading = false
            this.currentPage = page
            this.total = response.data.data.totalElements
          } else {
            this.loadingText = response
          }
        })
      }
    },
    handleEdit(index, type) {

    },
    onRefreshCurrentPage() {
      this.search(this.currentPage)
    },
    onRefresh() {
      this.search(1)
    }
  },
  created() {

  }
}
