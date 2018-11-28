<template>
<!-- 全屏固定表头弹层组件 -->
  <div class="dialog-content">
      <div class="content-box">
        <!-- 固定顶部操作菜单+位置明示 -->
        <div class="header-bar" slot="title">
           <div class="left"> 发放优惠券 </div>
           <div class="right">
              <el-button type="text" size="mini" @click.stop="submit">提交</el-button>
              <el-button type="text" size="mini" @click.stop="close">返回</el-button>
            </div>
        </div>
        <div class="content-bar">
	        <el-form :model="form" ref="form" :inline="true">
            <!-- <h1> 测试 </h1> -->
	        </el-form>
        </div>
      </div>
  </div>
</template>

<script>
import addModel from '@/public/addModel.js'
import model from '@/public/listModel.js'
// import { fetchDetail, fetchTable } from '@/api/buy/buyReturn.js'

export default {
  mixins: [addModel, model],
  data() {
    return {
      form: {

      }
    }
  },
  mounted() {

  },
  methods: {
    close() {
      this.$emit('close', false)
    },
    submit() {

    }
  }
}
</script>

<style scoped lang="scss">
.content-box {
  width: 100%;
  position: relative;
  .header-bar {
    .left{
      color: #1cbc9c;
    }
    padding: 0 10px;
    height: 40px;
    line-height: 40px;
    width: 100%;
    position: fixed;
    top: 0px;
    left: 0;
    z-index: 900;
    background: #e8f8f5 !important;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.23);
  }
}
</style>
