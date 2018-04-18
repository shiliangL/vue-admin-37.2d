// 列表公用 Model
import { TableContain, SearchBar } from '@/components/indexEx.js'
export default {
  components: {
    TableContain,
    SearchBar
  },
  data() {
    return {
      pagination: {
        pageSizes: [10, 20, 50, 100], // 默认分页可选择的每页显示的页数
        size: 10, // 分页每页默认显示10条
        page: 1, // 当前默认第一页
        total: 10 // 总条数
      },
      table: {
        data: [],
        size: 'mini'
      },
      add: {
        visiable: false, // 是否显示新增组件
        data: null // 新增组件绑定的数据
      }
    }
  }
}
