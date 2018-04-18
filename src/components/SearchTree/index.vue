<template>
    <div class="SearchTree" v-clickoutside="close">
      <div class="search">
        <span v-if="showTree">
          <el-input size="mini" placeholder="名称检索" v-model.trim="codeOrname" style="width:140px"></el-input>
          <el-button type="primary" size="mini" @click="clickSearch"> 搜索 </el-button>
          <el-button style="margin:0px" size="mini" @click="reset"> 重置 </el-button>
        </span>
        <span v-else>
          <el-button  class="pan-btn light-blue-btn" type="primary"  size="mini" @click="showTree = !showTree">获取设备</el-button>
        </span>
      </div>
      <div class="tree" v-show="showTree">
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
import Clickoutside from 'element-ui/src/utils/clickoutside'
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
      showTree: false,
      // treeData: [],
      treeData: [
        {
          id: '919135926351822848',
          label: '单鞋',
          status: 1,
          propertyName: null,
          topId: null,
          topName: null,
          idFullInfo: '919135926351822848',
          children: [
            {
              id: '943740344682414080',
              label: '浅口',
              status: 1,
              propertyName: null,
              topId: null,
              topName: null,
              idFullInfo: '919135926351822848/943740344682414080',
              children: []
            },
            {
              id: '943740388168957952',
              label: '中口',
              status: 1,
              propertyName: null,
              topId: null,
              topName: null,
              idFullInfo: '919135926351822848/943740388168957952',
              children: []
            },
            {
              id: '943740424776843264',
              label: '深口',
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
          label: '空鞋',
          status: 1,
          propertyName: null,
          topId: null,
          topName: null,
          idFullInfo: '919138032865509376',
          children: [
            {
              id: '943740479722225664',
              label: '中空',
              status: 1,
              propertyName: null,
              topId: null,
              topName: null,
              idFullInfo: '919138032865509376/943740479722225664',
              children: []
            },
            {
              id: '943740497623515136',
              label: '鱼嘴',
              status: 1,
              propertyName: null,
              topId: null,
              topName: null,
              idFullInfo: '919138032865509376/943740497623515136',
              children: []
            },
            {
              id: '943740528938188800',
              label: '后空',
              status: 1,
              propertyName: null,
              topId: null,
              topName: null,
              idFullInfo: '919138032865509376/943740528938188800',
              children: []
            }
          ]
        },
        {
          id: '919138664301199360',
          label: '凉鞋',
          status: 1,
          propertyName: null,
          topId: null,
          topName: null,
          idFullInfo: '919138664301199360',
          children: [
            {
              id: '943740531899367424',
              label: '凉鞋',
              status: 1,
              propertyName: null,
              topId: null,
              topName: null,
              idFullInfo: '919138664301199360/943740531899367424',
              children: []
            },
            {
              id: '943740573632692224',
              label: '拖鞋',
              status: 1,
              propertyName: null,
              topId: null,
              topName: null,
              idFullInfo: '919138664301199360/943740573632692224',
              children: []
            }
          ]
        },
        {
          id: '919139223217373184',
          label: '包',
          status: 1,
          propertyName: null,
          topId: null,
          topName: null,
          idFullInfo: '919139223217373184',
          children: [
            {
              id: '919139264501907456',
              label: '手拎包',
              status: 1,
              propertyName: null,
              topId: null,
              topName: null,
              idFullInfo: '919139223217373184/919139264501907456',
              children: []
            },
            {
              id: '919139367694368768',
              label: '单肩包',
              status: 1,
              propertyName: null,
              topId: null,
              topName: null,
              idFullInfo: '919139223217373184/919139367694368768',
              children: []
            },
            {
              id: '919139418315423744',
              label: '双肩包',
              status: 1,
              propertyName: null,
              topId: null,
              topName: null,
              idFullInfo: '919139223217373184/919139418315423744',
              children: []
            },
            {
              id: '919139447553916928',
              label: '钱包',
              status: 1,
              propertyName: null,
              topId: null,
              topName: null,
              idFullInfo: '919139223217373184/919139447553916928',
              children: []
            },
            {
              id: '919139476205207552',
              label: '卡包',
              status: 1,
              propertyName: null,
              topId: null,
              topName: null,
              idFullInfo: '919139223217373184/919139476205207552',
              children: []
            },
            {
              id: '919409539936157696',
              label: '正价包',
              status: 1,
              propertyName: null,
              topId: null,
              topName: null,
              idFullInfo: '919139223217373184/919409539936157696',
              children: []
            },
            {
              id: '943792891329773568',
              label: '赠品包',
              status: 1,
              propertyName: null,
              topId: null,
              topName: null,
              idFullInfo: '919139223217373184/943792891329773568',
              children: []
            },
            {
              id: '959009708805455872',
              label: '斜挎包',
              status: 1,
              propertyName: null,
              topId: null,
              topName: null,
              idFullInfo: '919139223217373184//959009708805455872',
              children: []
            }
          ]
        }
      ],
      codeOrname: null
    }
  },
  directives: {
    Clickoutside
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    clickLoadDetails() {

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
    },
    close() {
      this.showTree = false
    }
  }
}
</script>

<style scoped lang="scss">
.SearchTree {
  min-width: 320px;
  width: 320px;
  padding: 6px;
  border-radius: 8px;
  // box-shadow: 0 2px 5px 0 rgba(0,0,0,.3);
  // border: 1px solid #d1dbe5;
  .scroll-container {
    min-height:280px;
    height:280px;
    background-color: #fff;
  }
  .tree {
    margin-top: 8px;
    background: #fff;
    min-height:280px;
    overflow: hidden;
    border: 1px solid #d1dbe5;
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