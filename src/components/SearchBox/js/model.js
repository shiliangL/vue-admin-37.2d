export default{
  data() {
    return {
      urls: 'workbench/page',
      placeholder: '商品或编码模糊查询',
      tableVisiable: false,
      name: null,
      url: null,
      multipleText: null,
      dataList: [],
      selectList: [],
      pageSize: 10,
      currentPage: 1,
      totalPages: 0,
      total: 0,
      loading: false,
      isLoading: false,
      loadingText: null,
      refresh: false, // 是否显示刷新按钮
      progress: true,
      requestCount: 0,
      titles: null, // 显示的表头
      firstLoading: false, // 是否加载过数据
      className: 'input-layout'
    }
  }
}
