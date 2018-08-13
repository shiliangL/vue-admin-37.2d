<template>
    <div>
			<el-form :model="form" ref="form" class="form" :rules="rules"  style="padding-left: 60px;">
					<el-form-item label="图片:" label-width="100px" prop="url" :rules="rules.select">
						<el-upload 
							style=" border: 1px dashed #d9d9d9; border-radius: 6px;	width: 375px;height: 160px;"
							class="avatar-uploader"
							action="http://up-z2.qiniu.com"
							:show-file-list="false"
							:data="uploadDatas"
							:on-success="handleAvatarSuccess"
							:before-upload="beforeAvatarUpload"
						  :accept="accept">
							<div class="avatar" v-if="form.url" :src="form.url">
								<img v-if="form.url" :src="form.url">
							</div>
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
					<!-- <el-form-item label="链接方式:" label-width="100px">
						<el-select size="small" v-model="form.type" filterable placeholder="选择仓库">
							<el-option v-for="sub in stockOption" :key="sub.value" :label="sub.label" :value="sub.value"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="链接对象:" label-width="100px">
					 
					</el-form-item> -->
					<el-form-item label="账号状态:" label-width="100px" style="height: 37px;">
						<el-radio v-model="form.status" :disabled="isViewPage" label="1">启用</el-radio>
						<el-radio v-model="form.status" :disabled="isViewPage" label="0">禁用</el-radio>
					</el-form-item>   
			</el-form>
			<div class="footer-block" v-if="!isViewPage">
				<el-button size="small" @click.stop="close">取 消</el-button>
				<el-button :loading="saveLoading" size="small" type="primary" @click.stop="clickSaveOrUpdate('form')"> 确定 </el-button>
			</div>
    </div>
</template>

<script>
import { fetchToken } from '@/api/layout.js'
import { mapGetters } from 'vuex'
import rules from '@/public/rules.js'
import addModel from '@/public/addModel.js'
import { createRow, updateRow, fetchDetail } from '@/api/frontShop/banner.js'

export default {
  mixins: [rules, addModel],
  data() {
    return {
      uploadDatas: {
        token: null
      },
      isViewPage: false,
      saveLoading: false,
      isUpdate: false,
      form: {
        'contentId': null,
        'id': null,
        'method': 1, // 1：banner，2：商品推荐，3：热门 ,
        'orderIndex': 1,
        'productName': null,
        'status': '1',
        'summary': null,
        'type': 2, // 1：机构，2：商品，3：用户 ,
        'url': null
      },
      imgTypes: ['jpeg', 'png', 'jpg', 'bmp'],
      stockOption: []
    }
  },
  mounted() {
    this.fetchToken()
    if (this.propsSonData.isUpdate) {
      this.isViewPage = this.propsSonData.type === 'view'
      fetchDetail({ id: this.propsSonData.data.id }).then(({ data }) => {
        data.status = data.status + ''
        this.form = Object.assign(this.form, data)
      }).catch(e => {
        this.$message({ type: 'error', message: e.msg })
      })
    }
  },
  created() {
    this.stockOption = [
      { value: 0, label: '空' },
      { value: 1, label: '商品' }
    ]
  },
  computed: {
    ...mapGetters([
      'baseImgUrl'
    ]),
    accept() {
      const arr = []
      this.imgTypes.forEach(item => {
        arr.push('image/' + item)
      })
      return arr.join(',')
    }
  },
  methods: {
    fetchToken() {
      fetchToken().then(({ data }) => {
        this.uploadDatas.token = data.token
      }).catch(e => {
        this.$message({ type: 'error', message: '图片上传参数获取失败,请重新打开页面' })
      })
    },
    close() {
      this.$emit('close')
    },
    handleAvatarSuccess(res) {
      if (res.code === '0' && res.data) {
        if (res.data.key) {
          this.form.url = `${this.baseImgUrl}${res.data.key}`
          console.log(this.$refs['avatarImg'])
          this.$message({ type: 'success', message: '上传成功' })
        }
      } else {
        this.$message({ type: 'error', message: '上传失败' })
      }
    },
    beforeAvatarUpload() {

    },
    clickSaveOrUpdate(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$refs[formName].validate(valid => {
            if (valid) {
              this.saveLoading = true
              if (this.propsSonData.isUpdate) {
                const data = JSON.parse(JSON.stringify(this.form))
                data.status = parseInt(this.form.status)
                updateRow(data).then(res => {
                  this.saveLoading = false
                  this.$emit('add')
                  this.close()
                  this.$message({ type: 'success', message: `${res.msg}!` })
                }).catch(e => {
                  this.saveLoading = false
                  this.$message({ type: 'error', message: e.msg })
                })
              } else {
                const data = JSON.parse(JSON.stringify(this.form))
                data.status = parseInt(this.form.status)
                createRow(data).then(res => {
                  this.saveLoading = false
                  this.$emit('add')
                  this.close()
                  this.$message({ type: 'success', message: `${res.msg}!` })
                }).catch(e => {
                  this.saveLoading = false
                  this.$message({ type: 'error', message: e.msg })
                })
              }
            } else {
              this.$message({ type: 'warning', message: '请核实表单' })
              return
            }
          })
        } else {
          this.$message({ type: 'warning', message: '请核实表单' })
          return
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.form{
	.el-form-item {
    margin-bottom: 16px;
	}
	.avatar-uploader .el-upload {
		width: 375px;
		height: 160px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
		overflow: hidden;
  }
 
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
  	width: 375px;
		height: 160px;
    line-height: 160px;
    text-align: center;
  }
  .avatar {
 		width: 375px;
		height: 160px;
		overflow: hidden;
		img{
 			width: 100%;
		}
  }
}
</style>