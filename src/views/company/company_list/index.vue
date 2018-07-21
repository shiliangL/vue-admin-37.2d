<template>
  <div class="page company_list" style="width: 100%">
      <!-- 顶部搜索区域 -->
 	    <search-bar :data="searchBarData" @add="showAdd"></search-bar>
      <!-- 表格 -->
      <TableContain :height.sync="table.maxHeight">
        <el-table :data="table.data" :size="table.size" :max-height="table.maxHeight" slot="table" style="width: 100%">
        <el-table-column align="center" label="序号" width="40">
          <template slot-scope="scope">
             <span v-text="scope.$index+1"></span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="id" label="企业ID"> </el-table-column>
        <el-table-column align="center" prop="name" label="企业名称"> </el-table-column>
        <el-table-column align="center" prop="addr" label="地址"> </el-table-column>
        <el-table-column align="center" prop="number" label="营业执照"> </el-table-column>
        <el-table-column align="center" prop="introduction" label="企业介绍"> </el-table-column>
        <el-table-column align="center" prop="logo_pic_path" label="企业LOGO"> </el-table-column>
        <el-table-column align="center" prop="certification" label="实名状态">
          <template slot-scope="scope">
            <el-tag  size="mini" v-if="scope.row.certification ===0" type="gray">未认证</el-tag>
            <el-tag  size="mini" v-if="scope.row.certification ===1" type="gray">提交认证</el-tag>
            <el-tag  size="mini" v-if="scope.row.certification ===2" type="success">已认证</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="status" label="企业状态">
          <template slot-scope="scope">
            <el-tag  size="mini" v-if="scope.row.status ===0" type="danger">已失效</el-tag>
            <el-tag  size="mini" v-if="scope.row.status ===1" type="success">正常使用中</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="title_en" label="系统显示使能">
          <template slot-scope="scope">
            <el-tag  size="mini" v-if="scope.row.title_en ===0" type="danger">不显示</el-tag>
            <el-tag  size="mini" v-if="scope.row.title_en ===1" type="success">显示</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="address" label="操作" width="210">
          <template slot-scope="scope">
          <el-button type="primary" size="mini"> 编辑 </el-button>
          <el-button size="mini" type="success"> 正常 </el-button>
          <el-button size="mini"> 正常 </el-button>
          <el-button size="mini" type="danger"> 故障 </el-button>
        </template>
        </el-table-column>
      </el-table>

        <!-- 分页 -->
        <el-pagination
          slot="page"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pagination.page"
          :page-sizes="pagination.pageSizes"
          :page-size="pagination.size"
          layout="total, sizes, prev, pager, next"
          :total="pagination.total">
        </el-pagination>


      </TableContain>
 
        <!-- 弹层 -->
        <add v-if="add.visiable" v-model="add.visiable" :data="add.data" @add="refrehList" @edit="refrehList"></add>
  </div>
</template>
 
<script>
import listModel from '@/public/listModel.js'
import { fetchSonList } from '@/api/company/index.js'
import { mapGetters } from 'vuex'
import Add from './add'

export default {
  mixins: [listModel],
  name: 'company_list',
  components: {
    Add
  },
  data() {
    return {
      searchBarData: [
        [
          { type: 'option', value: null, key: 'categoryId', class: 'w150', placeholder: '仓库类别', options: [] },
          { type: 'input', value: null, key: 'title', class: 'w180', placeholder: '输入仓库名称检索' },
          { type: 'search', name: '查询' },
          { type: 'reset', name: '重置' }
        ],
        [
          { type: 'add', name: '新增' }
        ]
      ]
    }
  },
  computed: {
    ...mapGetters([
      'loginAdmin'
    ])
  },
  mounted() {
    setTimeout(() => {
      console.log(this.loginAdmin)
      this.fetchSonList()
    }, 200)
  },
  methods: {
    // 弹层操作
    openDialog() {
      this.dialogVisible = true
      this.addViewVisible = true
    },
    closeDialog() {
      this.dialogVisible = false
      this.addViewVisible = false
    },
    onRefresh() {
      console.log('刷新页面')
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    fetchSonList() {
      const key = this.loginAdmin.EnterpriseId
      if (!key) {
        this.message({ type: 'error', message: '获取关键信息失败,请刷新页面' })
        return
      }
      fetchSonList({ enterpriseId: key }).then(({ SonEnterprise }) => {
        this.table.data = SonEnterprise
      }).catch((error) => {
        console.log(error)
      })
    },
    refrehList() {
      this.fetchSonList()
    },
    showAdd() {
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'add', obj: null }})
    }
  }
}
</script>