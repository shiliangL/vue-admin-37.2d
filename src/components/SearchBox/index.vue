<template>
<div class="SearchBox" v-clickoutside="close">
  <div ref="inputLayout" :class="className">
    <el-tag style="margin-top:5px;" :key="index" size="small" type="primary" v-for="(tag,index) in selectList" :closable="true" :close-transition="false" @close="handleClose(tag)">
      {{tag.title.length * 12 + 40 >= currentWidth ? tag.title.substring(0, (currentWidth - 40) / 14) + '..' : tag.title}}
    </el-tag>
  <input
      :maxlength="maxlength"
      class="input el-input el-input--small"
      @focus="handleFocus"
      @blur="handleBlur"
      v-model.trim="name"
      @compositionstart="isLock=true"
      @compositionend="isLock=false"
      @input="compositioninput"
      :placeholder="placeholderAn" />
  </div>
<div v-show="tableVisiable" class="table-layout">
  <el-table :data="dataList" class="table-list" size="small" max-height="300" @row-click="clickTableRow" ref="multipleTable">
      <el-table-column prop="title" :label="nameLabel" align="center"></el-table-column>
      <el-table-column prop="code" :label="codeLabel" align="center"></el-table-column>
  </el-table>

  <el-pagination
    small
    @current-change="handleSizeChange"
    :current-page="pagination.page"
    :page-sizes="pagination.pageSizes"
    :page-size="pagination.size"
    layout="total, prev, pager, next"
    :total="pagination.total">
  </el-pagination>

 
  <div class="loading-layout" v-show="loading">
    <div :style="{color:'#1cbc9c','text-align':'center','margin-top':'50px'}">
      <i v-show="progress" class="el-icon-loading"></i>
      <span> {{loadingText}}</span>
      <div v-show="refresh" class="refresh">
        <i class="el-icon-refresh" @click="clickRefresh"></i>
      </div>
    </div>
  </div>

  </div>
</div>
</template>
<script src='./js/index.js'>
</script>
<style scoped lang="scss">
.input-layout, .input-layout1 {
    line-height: 32px;
    .el-tag {
      position: relative;
      top: -2px;
      margin-left: 0;
    }

    position: relative;
    width: 100%;
    height: 32px;
    background-color: #fff;
    background-image: none;
    border: #1cbc9c solid 1px;
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
        line-height: 32px;
        border: none;
        padding-left: 3px;
    }
    .input:focus {
    outline: none;
    border-color:none;
}
}
.input-layout {
    position: relative;
    width: 100%;
    height: 32px;
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
  .el-icon-refresh{
    cursor: pointer;
    font-size: 18px;
  }
}
</style>
