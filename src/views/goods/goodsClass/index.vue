
<!-- 商品分类 - 大类-->

<template>
	<div>

      <search-bar ref="searchBar" :data="searchBarData" @add="showAdd" @clickBtn="refreshPage"></search-bar>

			<div class="goodsClass">

        <el-collapse accordion v-if="tableData.length">
          <draggable element="el-collapse" :list="tableData" :options="{animation:200,dragClass:'dragClass'}" @update="update">
            <el-collapse-item v-for="(item,index) in tableData" :name="index" :key="index">
              <template slot="title">
                <div class="title clearfix">
                  <div class="left"> <i class="el-icon-rank"></i>  {{item.title}}  </div>
                  <div class="right">
                    <el-button type="text" size="mini" @click.stop="() => adddChild(item,index)"> 添加子类 </el-button>
                    <el-button type="text" size="mini" @click.stop="() => editorParent(item,index)"> 编辑 </el-button>
                    <el-button type="text" style="color:red" size="mini" @click.stop="() => deleteParent(item,index)"> 删除 </el-button>
                  </div>
                </div>
              </template>
              <div class="content">
                <div class="content-item clearfix" v-if="item.children && item.children.length>0" v-for="(itemSub,indexUsb) in item.children" :key="indexUsb">
                  <div class="left">
                    {{itemSub.title}}
                  </div>
                  <div class="right">
                    <el-button type="text" size="mini" @click.stop="() => editorChild(itemSub,indexUsb)"> 编辑 </el-button>
                    <el-button type="text" style="color:red" size="mini" @click.stop="() => deleteChild(itemSub,indexUsb)"> 删除 </el-button>
                  </div>
                </div>
                <!-- {{item.children}} -->
                <div v-if="item.children && item.children.length===0" class="pageCunt">
                  无子类数据
                </div>
              </div>
            </el-collapse-item>
          </draggable>
        </el-collapse>
        <div v-else class="pageCunt">
          暂无数据
        </div>

        <!-- 弹层 -->
        <add v-if="add.visiable" v-model="add.visiable" :data="add.data" @add="refrehList" @edit="refrehList"></add>

			</div>
	</div>
</template>

<script>
import draggable from 'vuedraggable'
import model from '@/public/listModel.js'
import { list, deleteClass, updateSort } from '@/api/goodsClass.js'
import Add from './add'

export default {
  name: 'goodsClass',
  components: {
    Add,
    draggable
  },
  mixins: [model],
  data() {
    return {
      tableData: [],
      tableDatax: [],
      searchBarData: [
        [

        ],
        [
          { type: 'add', name: '新增大类' },
          { type: 'button', name: '刷新' }
        ]
      ]
    }
  },
  mounted() {
    this.fecthList()
    // 为了防止火狐浏览器拖拽的时候以新标签打开，此代码真实有效
    document.body.ondrop = (event) => {
      event.preventDefault()
      event.stopPropagation()
    }
  },
  created() {},
  methods: {
    update(e) {
      // 往上移动
      let data = null
      if (e.newIndex < e.oldIndex) {
        data = [{ id: this.tableData[e.newIndex].id, sort: this.tableData[e.newIndex + 1].sort }, { id: this.tableData[e.newIndex + 1].id, sort: this.tableData[e.newIndex].sort }]
      } else {
        data = [{ id: this.tableData[e.newIndex].id, sort: this.tableData[e.newIndex - 1].sort }, { id: this.tableData[e.newIndex - 1].id, sort: this.tableData[e.newIndex].sort }]
      }
      updateSort(data).then(res => {
        this.fecthList()
      }).catch(e => {
        this.$message({ type: 'error', message: e.meg })
      })
    },
    refreshPage() {
      this.fecthList()
    },
    fecthList() {
      list().then(({ data }) => {
        this.tableData = this.handlerList(data)
      }).catch(e => {
        this.$message({ type: 'error', message: '列表加载失败' })
      })
    },
    handlerList(data) {
      if (!Array.isArray(data) && data.length <= 0) return
      const parentArray = []
      for (const item of data) {
        if (item.parentId === '0') {
          item.children = []
          parentArray.push(item)
        }
      }
      for (const item of data) {
        if (item.parentId !== '0') {
          for (const parent of parentArray) {
            if (item.parentId === parent.id) {
              parent.children.push(item)
            }
          }
        }
      }
      return parentArray
    },
    deleteParent(item, index) {
      this.$confirm('删除该节点会同时删除该节点下的其他数据,是否确定?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (!item.id) return
        deleteClass({ id: item.id }).then(res => {
          this.$message({ type: 'success', message: `${res.msg}` })
          this.fecthList()
        }).catch(() => {
          this.$message({ type: 'error', message: '删除失败' })
        })
      }).catch(() => {})
    },
    editorParent(item, index) {
      // item.isFather = item.title
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'editorParent', obj: item, title: '编辑大类' }})
    },
    adddChild(item, index) {
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'adddChild', obj: item, isFather: item.title, title: '添加子类' }})
    },
    deleteChild(item, index) {
      this.$confirm('是否确定删除数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (!item.id) return
        deleteClass({ id: item.id }).then(res => {
          this.$message({ type: 'success', message: `${res.msg}` })
          this.fecthList()
        }).catch(() => {
          this.$message({ type: 'error', message: '删除失败' })
        })
      }).catch(() => {})
    },
    editorChild(item, index) {
      console.log(item)
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'editorChild', obj: item, title: '编辑子类' }})
    },
    refrehList() {
      this.fecthList()
    },
    // 弹层操作
    showAdd() {
      this.$setKeyValue(this.add, { visiable: true, data: { type: 'add', title: '新增大类' }})
    }
  }
}
</script>

<style lang="scss" scoped>
.goodsClass {
  background: #fff;
  padding: 20px;
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
  .flexBox{
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .content{
    padding: 0 10px;
  }
  .content-item{
    cursor: pointer;
    margin: 0 10px;
    &:hover{
      // background-color: #f5f7fa;
      color: #1cbc9c;
    }
  }

  .title{
    width: 100%;
    &:hover{
      color: #1cbc9c;
    }
  }

  .pageCunt{
    color:#7c7d80;
    // padding: 10px 0;
    text-align: center;
    font-size: 14px;
  }
  .dragClass{
    background: #1cbc9c;
  }
}
</style>
