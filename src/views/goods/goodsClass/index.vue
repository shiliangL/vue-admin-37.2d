 
<!-- 商品分类 - 大类  	show-checkbox-->
 
<template>
	<div>
      <search-bar ref="searchBar" :data="searchBarData" @add="showAdd()"></search-bar>

			<div class="goodsClass">
				<el-tree ref="tree"
					accordion
					:highlight-current="true" 
					:data="treeData"
					:filter-node-method="filterNode" 
					:props="defaultProps" 
					@node-click="clickLoadDetails" node-key="id" 
					@check-change="currentChange"
					:default-expanded-keys="unfoldedArr">
					<span class="custom-tree-node" slot-scope="{ node, data }">
						<span>{{ node.label }}</span>
						<span>
							<!-- <span>{{data.status=== 1?'启用':'禁用'}}</span> -->
							<el-button type="text" size="mini" @click.stop="() => append(data)"> 添加 </el-button>
							<el-button type="text" size="mini" @click.stop="() => editor(data)"> 编辑 </el-button>
							<el-button type="text" size="mini" @click.stop="() => remove(node, data)"> 删除 </el-button>
						</span>
					</span>
				</el-tree>
			</div>
	</div>
</template>

<script>
import model from '@/public/listModel.js'

export default {
  name: 'goodsClass',
  components: {
  },
  mixins: [model],
  data() {
    return {
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
        },
        {
          id: '919140284472754176',
          label: '配饰',
          status: 1,
          propertyName: null,
          topId: null,
          topName: null,
          idFullInfo: '919140284472754176',
          children: []
        },
        {
          id: '919142442723180544',
          label: '护理品',
          status: 1,
          propertyName: null,
          topId: null,
          topName: null,
          idFullInfo: '919142442723180544',
          children: []
        },
        {
          id: '919143831960551424',
          label: '包装',
          status: 1,
          propertyName: null,
          topId: null,
          topName: null,
          idFullInfo: '919143831960551424',
          children: []
        },
        {
          id: '919144404864729088',
          label: '陈列道具',
          status: 1,
          propertyName: null,
          topId: null,
          topName: null,
          idFullInfo: '919144404864729088',
          children: []
        },
        {
          id: '919145003031199744',
          label: '服饰',
          status: 1,
          propertyName: null,
          topId: null,
          topName: null,
          idFullInfo: '919145003031199744',
          children: []
        },
        {
          id: '919145081007505408',
          label: 'B品',
          status: 1,
          propertyName: null,
          topId: null,
          topName: null,
          idFullInfo: '919145081007505408',
          children: []
        },
        {
          id: '943739555368927232',
          label: '靴',
          status: 1,
          propertyName: null,
          topId: null,
          topName: null,
          idFullInfo: '943739555368927232',
          children: [
            {
              id: '943740611343679488',
              label: '裸靴',
              status: 1,
              propertyName: null,
              topId: null,
              topName: null,
              idFullInfo: '943739555368927232/943740611343679488',
              children: []
            },
            {
              id: '943740634529792000',
              label: '低靴',
              status: 1,
              propertyName: null,
              topId: null,
              topName: null,
              idFullInfo: '943739555368927232/943740634529792000',
              children: []
            },
            {
              id: '943740688455958528',
              label: '高靴',
              status: 1,
              propertyName: null,
              topId: null,
              topName: null,
              idFullInfo: '943739555368927232/943740688455958528',
              children: []
            },
            {
              id: '943740726699622400',
              label: '中靴',
              status: 1,
              propertyName: null,
              topId: null,
              topName: null,
              idFullInfo: '943739555368927232/943740726699622400',
              children: []
            },
            {
              id: '943740775974305792',
              label: '超长靴',
              status: 1,
              propertyName: null,
              topId: null,
              topName: null,
              idFullInfo: '943739555368927232/943740775974305792',
              children: []
            }
          ]
        }
      ],
      searchBarData: [
        [

        ],
        [
          { type: 'add', name: '新增大类' }
        ]
      ],
      ruleForm: {},
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      options: {
        parents: []
      },
      isDisabled: false,
      unfoldedArr: []
    }
  },
  mounted() {},
  created() {},
  methods: {
    fetchData() {},
    searchAction(params) {
      this.fetchData(params)
    },
    handleSizeChange(val) {},
    handleCurrentChange(val) {},
    openDialog() {},
    closeDialog() {},
    click2edit() {},
    click2delete() {
      this.$confirm('是否需要删除数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({ type: 'success', message: '删除成功!' })
        })
        .catch(() => {})
    },
    filterNode(value, data) {
      console.log(value, data)
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    clickLoadDetails() {},
    currentChange(a, b, c) {
      console.log(a, b, c)
    },
    append(data) {
      console.log(data)
      this.showEditorOrNew = true
      // const newChild = { id: Math.random(), label: '测试节点', children: [] }
      // if (!data.children) {
      //   this.$set(data, 'children', [])
      // }
      // data.children.push(newChild)
    },
    editor(data) {
      console.log(data, '编辑')
      this.showEditorOrNew = true
    },
    remove(node, data) {
      this.showEditorOrNew = false
      this.$confirm(
        '删除该节点会同时删除该节点下的其他数据,是否确定?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          const parent = node.parent
          const children = parent.data.children || parent.data
          const index = children.findIndex(d => d.id === data.id)
          children.splice(index, 1)
          this.$message({ type: 'success', message: '删除成功!' })
        })
        .catch(() => {})
    },
    clickSaveOrUpdate(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log('x')
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
}
</style>
