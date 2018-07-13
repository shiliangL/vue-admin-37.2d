<template>
	<div class="upload-img-component">
		<el-upload
		  :action="action"
		  :multiple="true"
		  list-type="picture-card"
		  :headers="requestHeader"
      :data="uploadDatas"
      :limit="5"
		  :on-success="uploadSuccess" 
		  :on-progress="uploadProgress"
		  :on-error="uploadError"
		  :on-remove="uploadRemove"
      :before-upload="beforeAvatarUpload"
		  :accept="accept">
		  <i class="el-icon-plus"></i>
		</el-upload>

		<div class="button-layout text-center" style="margin-top: 50px;">
	      <el-button size="small" type="primary" @click.stop="submitForm">保存</el-button>
	      <el-button size="small" @click.stop="dismiss">取消</el-button>
	    </div>
	</div>
</template>

<script >
import { mapGetters } from 'vuex'
export default {
  name: 'UploadImg',
  props: {
    value: {
      type: Array
    },
    action: {
      type: String,
      default: () => {
        return 'http://up-z2.qiniu.com'
      }
    }
  },
  data() {
    return {
      requestHeader: null,
      fileList: [],
      isUploading: false,
      imgTypes: ['jpeg', 'png', 'jpg', 'bmp']
    }
  },
  computed: {
    ...mapGetters([
      'qNtoken',
      'baseImgUrl'
    ]),
    accept() {
      const arr = []
      this.imgTypes.forEach(item => {
        arr.push('image/' + item)
      })
      return arr.join(',')
    },
    uploadDatas() {
      if (this.qNtoken) {
        return {
          token: this.qNtoken
        }
      }
    }
  },
  methods: {
    uploadSuccess({ code, data }, file, fileList) {
      if (code !== '0') {
        fileList.splice(fileList.length - 1, 1)
        this.$message({ type: 'error', message: '上传失败' })
      } else {
        this.$message({ type: 'success', message: '上传成功' })
      }
      this.fileList = fileList
      this.isUploading = false
    },
    uploadProgress(evt, file, fileList) {
      this.isUploading = true
    },
    uploadError() {
      this.isUploading = false
    },
    uploadRemove(file, fileList) {
      let flag = true
      for (let i = 0, len = fileList.length; i < len; i++) {
        const item = fileList[i]
        if (item.status !== 'success' && item.status !== 'fail') {
          flag = false
          break
        }
      }
      if (flag) {
        this.isUploading = false
      } else {
        this.isUploading = true
      }

      this.fileList = fileList
    },
    // 获取filelist 后台返回数据
    splitFilesId() {
      const arr = []
      this.fileList.forEach(item => {
        if (item.response && item.response.code === '0') {
          arr.push({
            name: item.name,
            url: item.response.data.key
          })
        }
      })
      return arr
    },
    submitForm() {
      if (this.isUploading) {
        this.$message({ type: 'warning', message: '图片尚未上传完毕' })
        return
      }
      const files = this.splitFilesId()
      if (this.fileList.length > 0) {
        this.$emit('input', files)
        this.$emit('callBack', files)
        this.dismiss()
      } else {
        this.$message({ type: 'warning', message: '请上传图片' })
      }
    },
    dismiss() {
      this.$emit('close')
    },
    beforeAvatarUpload(file) {
      // console.log(file)
    }
  }
}
</script>

<style scope lang="scss">
.upload-img-component {
    .title {
        margin: 10px 0 10px;
        font-size: 16px;
    }

    .img-title {
        border-bottom: 1px solid #eee;
        padding-bottom: 10px;
    }
}
</style>