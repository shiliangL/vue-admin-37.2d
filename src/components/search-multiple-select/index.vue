<template>
    <div class="search-multiple-select">
      <el-popover ref="searchPopover" width="400" placement="bottom-start" 	
        :visible-arrow="false"
        trigger="manual"
			  transition=""
        :popper-options="popperOptions"
        v-model="showPopover">
        <!-- 显示-内容区域 -->
        <div class="popover-layout" v-show="showPopover">

          <div class="tags-box" v-show="showTags">
            <span :key="index" :title="tag[showKey]" v-for="(tag,index) in selectList" class="el-tag el-tag--primary" >
				      <i class="el-tag__close el-icon-close"></i>
				      <span class="tag-txt" > {{tag[showKey]}} </span>
				    </span>
				    <div style="text-align: center; margin: 15px 0 5px;">
				    	<el-button size="mini">一键清空</el-button>
				    </div>
          </div>

          <div class="table-box" v-show="showTable">
            <el-table  :element-loading-text="tableLoadingText" ref="table" class="search-input-table" size="small"
              :max-height="maxHeight" 
              v-loading="loading" 
              @row-click="toggleRow" 
              :data="tableData">
					    <el-table-column width="50" align="center">
                <template slot-scope="scope">
                    <el-checkbox  style="pointer-events: none;" :value="isActiveRow(scope.row)"> </el-checkbox>
                </template>
					    </el-table-column>
					    <el-table-column prop="code" label="编码"></el-table-column>
					    <el-table-column prop="name" label="名称"></el-table-column>
				  	</el-table>
          </div>

          <el-pagination
            @current-change="handlePageChange"
            :page-sizes="[10, 20, 50, 100]"
            :current-page="page"
            :page-size="size"
            layout="total, sizes, prev, pager, next"
            :total="total">
				  </el-pagination>		

        </div>
        
        <!-- 搜索-触发显示区域 -->
        <div slot="reference"  class="input-layout">

          <el-button 
            class="select-btn" 
            v-show="selectList.length > 1" 
            size="mini" 
            type="primary"
            @click="toggleMoreTags">
            选中{{selectList.length}}个
          </el-button>

          <span :key="index" style="margin-right: 0" :title="tag[showKey]" v-if="selectList.length === 1" 
            v-for="(tag,index) in selectList" class="el-tag el-tag--primary" >
            <i @click.stop="handleTagClose(tag)" class="el-tag__close el-icon-close"></i>
            <span class="tag-txt" > {{tag[showKey]}} </span>
          </span>

				  <input class="el-input__inner" 
            v-model.trim="searchName" 
            @focus="handleFocus" 
            @keyup.enter="keyupEnter" 
            :placeholder="placeholder2"/>

        </div>
      </el-popover>
    </div>
</template>

<script src="./js/index.js"></script>

<style scoped lang="scss">
.search-multiple-select {

  .popover-layout {
    .el-pagination {
      margin: 10px 5px;
      text-align: center;
    }

    .el-pagination select {
      height: 25px;
      line-height: 25px;
    }
  }

  .search-input-table{
    width: 100%
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
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    overflow: hidden;
    text-align: left;
    white-space: nowrap;
    display: -webkit-box; /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box; /* OLD - Firefox 19- (buggy but mostly works) */
    display: -ms-flexbox; /* TWEENER - IE 10 */
    display: -webkit-flex; /* NEW - Chrome */
    display: flex; /* NEW, Spec - Opera 12.1, Firefox 20+ */

    input {
      width: 100%;
      line-height: 34px;
      display: inline-block;
      border: 0 !important;
      margin: 0 !important;
    }

    .select-btn {
      margin-top: 5px;
      margin-bottom: 5px;
      margin-left: 5px;
    }
  }
}
</style>