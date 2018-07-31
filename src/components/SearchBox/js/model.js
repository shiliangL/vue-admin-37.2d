export default{
  data() {
    return {
      pagination: {
        pageSizes: [10, 20, 50, 100], // 默认分页可选择的每页显示的页数
        size: 10, // 分页每页默认显示10条
        index: 1, // 当前默认第一页
        total: 0 // 总条数
      },
      urls: 'workbench/page',
      tableVisiable: false,
      name: null,
      url: null,
      dataList: [],
      selectList: [],
      loading: false,
      isLoading: false,
      loadingText: null,
      refresh: false, // 是否显示刷新按钮
      progress: true,
      className: 'input-layout',
      timer: null
    }
  }
}
