<template>
    <div class="SearchTree">
      <div class="search">
          <el-input size="mini" placeholder="名称检索" v-model.trim="codeOrname" style="width:140px"></el-input>
          <el-button type="primary" size="mini" @click="clickSearch"> 搜索 </el-button>
          <el-button style="margin:0px" size="mini" @click="reset"> 重置 </el-button>
          <!-- <el-button type="text" :icon="iconName" size="mini" @click="showTree = !showTree"></el-button> -->
      </div>
      <div class="tree" v-show="true">
        <ScrollBar>
          <el-tree ref="tree"
            accordion
            :highlight-current="true" 
            :data="treeData"
            :filter-node-method="filterNode" 
            :props="defaultProps" 
            @node-click="clickLoadDetails" node-key="id" 
            @check-change="currentChange"
            :default-expanded-keys="unfoldedArr">
            <!-- <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>
                <el-button type="text" size="mini" @click="() => append(data)"> 添加 </el-button>
                <el-button type="text" size="mini" @click="() => editor(data)"> 编辑 </el-button>
                <el-button type="text" size="mini" @click="() => remove(node, data)"> 删除 </el-button>
              </span>
            </span> -->
          </el-tree>
        </ScrollBar>
      </div>
    </div>
</template>

<script>
import { ScrollBar } from '@/components/indexEx.js'
export default {
  name: 'SearchTree',
  components: {
    ScrollBar
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      unfoldedArr: [],
      // showTree: false,
      // treeData: [],
      treeData: [
        {
          id: '919135926351822848',
          label: '设备组 A',
          status: 1,
          propertyName: null,
          topId: null,
          topName: null,
          idFullInfo: '919135926351822848',
          children: [
            {
              id: '943740344682414080',
              label: '设备 A1',
              status: 1,
              propertyName: null,
              topId: null,
              topName: null,
              idFullInfo: '919135926351822848/943740344682414080',
              children: []
            },
            {
              id: '943740388168957952',
              label: '设备 A2',
              status: 1,
              propertyName: null,
              topId: null,
              topName: null,
              idFullInfo: '919135926351822848/943740388168957952',
              children: []
            },
            {
              id: '943740424776843264',
              label: '设备 A3',
              status: 1,
              propertyName: null,
              topId: null,
              topName: null,
              idFullInfo: '919135926351822848/943740424776843264',
              children: []
            }
          ]
        },
        {
          id: '919138032865509376',
          label: '设备组 B',
          status: 1,
          propertyName: null,
          topId: null,
          topName: null,
          idFullInfo: '919138032865509376',
          children: [
            {
              id: '943740479722225664',
              label: '设备 B1',
              status: 1,
              propertyName: null,
              topId: null,
              topName: null,
              idFullInfo: '919138032865509376/943740479722225664',
              children: []
            },
            {
              id: '943740497623515136',
              label: '设备 B2',
              status: 1,
              propertyName: null,
              topId: null,
              topName: null,
              idFullInfo: '919138032865509376/943740497623515136',
              children: []
            }
          ]
        }
      ],
      codeOrname: null
    }
  },
  computed: {
    iconName() {
      return this.showTree ? 'el-icon-arrow-down' : 'el-icon-arrow-up'
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    clickLoadDetails(data) {
      this.$emit('clickSelect', data)
    },
    currentChange(a, b, c) {
      console.log(a, b, c)
    },
    clickSearch() {
      const { codeOrname } = this
      this.$refs['tree'].filter(codeOrname)
    },
    reset() {
      this.codeOrname = null
      this.$refs['tree'].filter(null)
    }
  }
}
</script>

<style scoped lang="scss">
.SearchTree {
  min-width: 280px;
  width: 280px;
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 2px 5px 0 rgba(0,0,0,.3);
  border: 1px solid #d1dbe5;
  .scroll-container {
    min-height:280px;
    height:280px;
    background-color: #fff;
  }
  .tree {
    margin-top: 8px;
    background: #fff;
    min-height:330px;
    overflow: hidden;
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
}
</style>