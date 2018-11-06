<template>
<div class="cloudlop-import" v-loading  :element-loading-text="loadingText">
    <el-upload class="upload-form" 
      drag
      :headers="headers" 
      :auto-upload="false" 
      ref="upload"
      :on-success="onSuccess" 
      :on-change="onChange" 
      :on-remove="onRemove" 
      :on-error="onError" 
      :before-upload="beforeUpload" 
      :action="actionUrl">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或
        <em>点击上传</em>
      </div>
    </el-upload>
    <div class="form-button-layout">
      <el-button  type="primary" :loading="submitLoading"  @click.stop="submitForm">导入</el-button>
      <el-button v-if="tplHref"  @click.stop="getTplUrl">下载模板</el-button>
      <el-button  @click.stop="close">取消</el-button>
    </div>
    <a style="display:none" v-if="tplHref" ref="downloadTpl" download :href="tplHref"></a>
    <a style="display:none" :href="href" download ref="download"></a>
  </div> 
</template>
<script>

export default {
  name: 'TableImport',
  props: {
    actionUrl: String,
    tplHref: String,
    customSuccess: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      headers: null,
      submitLoading: false,
      downloadLoading: true,
      fileList: [],
      href: '',
      count: 0,
      loadingText: ''
    }
  },
  methods: {
    getTplUrl(evt) {
      if (this.tplHref) {
        this.$refs.downloadTpl.click()
        return
      }
    },
    submitForm() {
      if (!this.fileList.length) {
        this.$message({ message: '请添加导入文件', type: 'warning' })
      }
      this.$refs.upload.submit()
    },
    close() {
      this.$emit('close')
    },
    onSuccess({ data, message }, file, fileList) {
      this.submitLoading = false
      this.$message({ message: '导入成功', type: 'success' })
      this.$emit('success')
      this.$emit('close')
    },
    onRemove() {
      this.fileList = []
    },
    onChange(file, fileList) {
      if (file.status === 'ready') {
        let message = ''
        const { type, name } = file.raw

        if (!(type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
          ['xls', 'xlsx'].indexOf(name.substr(name.lastIndexOf('.') + 1)) !== -1)) {
          message = '请上传xls,xlsx格式'
        }

        if (message) {
          this.$message({ message, type: 'warning' })
          fileList.splice(0, fileList.length)
          this.fileList = []
          return false
        }

        fileList.splice(0, fileList.length - 1)
        this.fileList = [file]
      }
    },
    onError() {
      this.submitLoading = false
      this.$message({ message: '上传失败', type: 'error' })
    },
    beforeUpload() {
      this.submitLoading = true
    }
  }
}
</script>

<style scoped lang="scss">
.upload-form {
    text-align: center;
}
</style>
<style lang="scss">
.cloudlop-import {
    input[type="file"] {
        display: none;
    }
    .el-upload,
    .el-upload-list {
        width: 90%;
    }
    .el-upload-dragger {
        width: 100%;
    }
    .el-upload-list {
        text-align: left;
        margin: 0 auto;
    }
}

.form-button-layout {
    text-align: center;
    clear: both;
    margin-top: 10px;
}
</style>
