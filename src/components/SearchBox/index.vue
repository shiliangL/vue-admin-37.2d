<template>
<div class="cloudolp-search-box" v-clickoutside="close">
  <div ref="inputLayout" :class="className">
    <el-tag v-if="!multiple" style="margin-top:5px;" :key="index" type="primary" v-for="(tag,index) in selectList" :closable="true" :close-transition="false" @close="handleClose(tag)">
      {{tag.name.length * 12 + 40 >= currentWidth ? tag.name.substring(0, (currentWidth - 40) / 14) + '..' : tag.name}}
    </el-tag>
  <input
      class="input"
      @focus="handleFocus"
      @blur="handleBlur"
      v-model.trim="name"
      @keydown="handleKeydown"
      @compositionstart="isLock=true"
      @compositionend="isLock=false"
      @input="compositioninput"
      :placeholder="placeholder" />
  </div>
<div v-show="tableVisiable" class="table-layout">
  <el-table :data="dataList" class="table-list" max-height="300" @row-click="clickTableRow" ref="multipleTable">
      <el-table-column prop="code" :label="codeLabel" align="center"></el-table-column>
      <el-table-column prop="name" :label="nameLabel" align="center"></el-table-column>
  </el-table>

    <!-- @current-change="handlePageChange" -->
 <el-pagination
    :page-sizes="[10, 20, 50, 100]"
    :current-page="page"
    :page-size="size"
    layout="total, sizes, prev, pager, next"
    :total="total">
  </el-pagination>		
 
  <div class="loading-layout" v-show="loading">
    <div :style="{color:'#5d9cec','text-align':'center','margin-top':'30px'}">
      <i v-show="progress" class="el-icon-loading"></i>
      <span> {{loadingText}}</span>
      <div v-show="refresh" class="refresh"><em class="fa fa-refresh" @click="clickRefresh"></em></div>
    </div>
  </div>

  </div>
</div>
</template>
<script src='./js/index.js'>
</script>
<style scoped lang="scss">
.input-layout, .input-layout1 {
    line-height: 36px;
    .el-tag {
      position: relative;
      top: -2px;
      margin-left: 0;
    }

    position: relative;
    width: 100%;
    height: 36px;
    background-color: #fff;
    background-image: none;
    border: #20A0FF solid 1px;
    border-radius: 4px;
    box-sizing: border-box;
    color: #1f2d3d;
    font-size: inherit;
    padding-left: 5px;
    transition: border-color 0.2s cubic-bezier(.645,.045,.355,1);
    overflow: hidden;

    .input {
        position: absolute;
        width: 100%;
        line-height: 34px;
        border: none;
        padding-left: 3px;
    }
}
.input-layout {
    position: relative;
    width: 100%;
    height: 36px;
    background-color: #fff;
    background-image: none;
    border: #c8c8c8 solid 1px;
    border-radius: 4px;
    box-sizing: border-box;
    color: #1f2d3d;
    font-size: inherit;
    padding-left: 5px;
    transition: border-color 0.2s cubic-bezier(.645,.045,.355,1);
    overflow: hidden;    
}

.table-layout {
    background-color: white;
    position: absolute;
    width: 340px;
    // max-height: 400px;
    overflow: auto;
    z-index: 2003;
    margin-top: 5px;
    border: 1px solid #bfcbd9;
}
.loading-layout {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 2004;
    width: 100%;
    height: 100%;
    background-color: rgba(255,255,255,0.8);
}
.refresh{
  margin-top: 10px;
  width: 100%;
  .fa-refresh{
    cursor: pointer;
    font-size: 18px;
  }
}
</style>
