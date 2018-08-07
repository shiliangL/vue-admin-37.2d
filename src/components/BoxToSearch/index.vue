 <!--
   支持编辑多选的组件
 -->
<template>
	<div class="search-input BoxToSearch">
		<el-popover ref="searchPopover" placement="bottom-start" width="400"
			v-model="showPopover"
			trigger="manual"
			transition=""
			:visible-arrow="false"
			:popper-options="popperOptions">

			<div class="search-layout" ref="searchLayout" v-show="showTable || showTags">
				<div class="tags-box" v-show="showTags">
					<span :key="index" :title="tag[showKey]" v-for="(tag,index) in selectList" class="el-tag el-tag--small" >
				      <i @click.stop="handleTagClose(tag, 2)" class="el-tag__close el-icon-close"></i>
				      <span class="tag-txt" > {{tag[showKey]}} </span>
				    </span>
				    <div style="text-align: center; margin: 15px 0 5px;">
				    	<el-button size="mini" @click="clearAll">一键清空</el-button>
				    </div>				    
			    </div>
			    <div v-show="showTable">
					<el-table  :max-height="maxHeight" v-loading="loading" element-loading-text="数据加载中" ref="table" class="search-input-table" @row-click="toggleRow" :data="tableData" size="small">
					    <el-table-column width="50" type="selection" align="center">
							  <template slot-scope="scope">
					    		<el-checkbox style="pointer-events: none;" :value="isActiveRow(scope.row)"> </el-checkbox>
					    	</template>
					    </el-table-column>
					    <el-table-column  align="center" prop="name" label="名称"></el-table-column>
					    <el-table-column  align="center" prop="categoryName" label="类别"></el-table-column>
					</el-table>

          <el-pagination
            @current-change="handlePageChange"
            :page-sizes="[10, 20, 50, 100]"
            :current-page="page"
            :page-size="size"
            layout="total, sizes, prev, pager, next"
            :total="total">
				  </el-pagination>		

					<!-- <div style="clear: both;text-align: center;margin-top: 6px;">
						共 {{tableData.length}} 条
					</div> -->

					<loading v-show="loadError"  @refresh="getList"  :loadingError="loadingError"> </loading>
		      	</div>
			</div>
			<div slot="reference" class="input-layout">

				<el-button 
					class="select-btn" 
					v-show="selectList.length > 1" 
					size="mini" 
					type="primary"
					@click="toggleMoreTags">
					选中{{selectList.length}}个
				</el-button>

				<span :key="index" style="margin-right: 0" :style="maxTagWidth" :title="tag[showKey]" v-if="selectList.length === 1" v-for="(tag,index) in selectList" class="el-tag el-tag--small" >
			    <i @click.stop="handleTagClose(tag)" class="el-tag__close el-icon-close"></i>
			    <span class="tag-txt" > {{tag[showKey]}} </span>
				</span>

				<input v-model.trim="codeOrname" class="el-input__inner input" @focus="handleFocus" @keyup.enter="keyupEnter" :placeholder="placeholder2"/>
				
			</div>
		</el-popover>
	</div>
</template>


<script src="./js/index.js"></script>

<style scoped lang="scss">
.search-layout {
  .el-pagination {
    margin: 10px 5px;
    text-align: center;
  }

  .el-pagination select {
    height: 25px;
    line-height: 25px;
  }
}

.search-layout,
.search-input {
  .el-tag {
    margin: 0 5px 0px 5px;
    max-width: 90%;
    position: relative;
    top: 5px;

    .tag-txt {
      display: block;
      margin-right: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .el-tag__close {
      float: right;
      top: 3px;
    }
  }
}
table {
  .search-input {
    vertical-align: middle;
  }
}
.search-input {
  position: relative;
  display: inline-block;
  vertical-align: top;

  .input-layout {
    position: relative;
    width: 100%;
    height: 34px;
    line-height: 34px;
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
      height: 32px;
      line-height: 32px;
      display: inline-block;
      outline:none;
      border: 0 !important;
      margin: 0 !important;
    }
    .input:focus{
      outline: none;
      border-color:none;
    }
    .select-btn {
      margin-top: 5px;
      margin-bottom: 5px;
      margin-left: 5px;
    }
  }
}
</style>

<style lang="scss">
.search-input {
  .el-table tbody tr {
    cursor: pointer;
  }
}
</style>