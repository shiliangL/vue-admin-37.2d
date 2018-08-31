<template>
    <div class="nenuManagement">
	    <search-bar ref="searchBar" :data="searchBarData" @add="showAdd" @search="searchAction" @reset="reset"></search-bar>
			<el-row :gutter="10">
				<el-col :span="8">
					<div class="tree">
						  <el-tree ref="tree"
                accordion
                :highlight-current="true" 
                :data="treeData"
                :filter-node-method="filterNode" 
                :props="defaultProps" node-key="id">

                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span>{{ node.label }}</span>
                  <span>
                    <el-button v-if="!data.parentId" type="text" size="small" @click.stop="() => append(data)"> 添加 </el-button>
                    <el-button type="text" size="small" @click.stop="() => editor(data)"> 编辑 </el-button>
                    <el-button style="color:red" type="text" size="small" @click.stop="() => remove(node, data)"> 删除 </el-button>
                  </span>
                </span>
              </el-tree>
					</div>
				</el-col>
				<el-col :span="16"><div class="grid-content bg-purple"></div></el-col>
			</el-row>

      <!-- 弹层区域 -->
      <el-dialog title="菜单管理" width="520px" :visible.sync="dialogVisible" append-to-body center @close="closeForm">
        <div v-if="dialogVisible"> <Add @close="closeForm" :propsSonData="propsParentData" @add="fetchMenuList"></Add> </div>
      </el-dialog>


    </div>
</template>

<script>
import Add from './add'
import model from '@/public/listModel.js'
import { fetchMenuList, deleteRow } from '@/api/system/nenuManagement.js'
import { listToTree } from '@/utils/toTreeList.js'
import { mapActions } from 'vuex'

export default {
  name: 'menuList',
  mixins: [model],
  components: {
    Add
  },
  data() {
    return {
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      searchBarData: [[
        { type: 'input', value: null, key: 'title', class: 'w180', placeholder: '输入名称检索' },
        { type: 'search', name: '查询' },
        { type: 'reset', name: '重置' }
      ], [{ type: 'add', name: '新增大类' }]]
    }
  },
  mounted() {
    this.fetchMenuList()
  },
  methods: {
    ...mapActions([
      'VX_SET_MENULIST'
    ]),
    handleNodeClick(data) {
      console.log(data)
    },
    fetchMenuList() {
      fetchMenuList().then(res => {
        if (res.code === '0') {
          const treeData = listToTree(res.data)
          this.treeData = treeData
          this.VX_SET_MENULIST(treeData)
        }
      }).catch(e => {
        this.$message({ type: 'error', message: '菜单获取失败,请刷新' })
      })
    },
    searchAction(val) {
      if (val && val.title) {
        this.$refs['tree'].filter(val.title)
      }
    },
    reset() {
      this.fetchMenuList()
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    remove(node, data) {
      this.$confirm('删除该节点会同时删除该节点下的其他数据,是否确定?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRow({ id: data.id }).then(res => {
          this.fetchMenuList()
          this.$message({ type: 'success', message: '删除成功!' })
        }).catch(e => {
          this.$message({ type: 'error', message: '删除失败!' })
        })
      }).catch(() => {})
    },
    append(data) {
      this.dialogVisible = true
      this.propsParentData = { isUpdate: 0, data }
    },
    editor(data) {
      this.dialogVisible = true
      this.propsParentData = { isUpdate: 1, data }
    },
    closeForm() {
      this.propsParentData = null
      this.dialogVisible = false
    },
    showAdd() {
      this.propsParentData = { isUpdate: 2 }
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped>
.tree{
	background: #fff;
	padding: 10px;
	width: 100%;
	min-height: 460px;
}
.custom-tree-node {
	font-size: 14px;
	flex: 1;
	display: -ms-flexbox;
	display: flex;
	-ms-flex-align: center;
	align-items: center;
	-ms-flex-pack: justify;
	justify-content: space-between;
	padding-right: 10px;
}
</style>