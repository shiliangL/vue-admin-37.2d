<template>
  <div class="NqQuillEditor">
    <quill-editor ref="upload"
      :on-success='upScuccess'
      :before-upload='beforeUpload'
      :content="content"
      :options = "editorOption"
      @change="onEditorChange($event)">
    </quill-editor>

    <el-upload class="upload-demo" 
      :action="qnLocation" 
      :before-upload='el_beforeUpload' 
      :data="el_uploadData" 
      :on-success='el_upScuccess' 
      ref="el_upload" style="display: none;">
      <el-button size="small" type="primary" id="btnUp" element-loading-text="插入中,请稍候">点击上传</el-button>
    </el-upload>

  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import { fetchToken } from '@/api/layout.js'

export default {
  name: 'NqQuillEditor',
  props: {
    value: String
  },
  components: {
    quillEditor
  },
  data() {
    return {
      qnLocation: 'http://up-z2.qiniu.com',
      el_uploadData: {
        token: null
      },
      uploadType: null,
      content: '',
      editorOption: {
        placeholder: '...',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
            [{ direction: 'rtl' }], // text direction

            [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6, false] }],

            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ font: [] }],
            [{ align: [] }],
            ['image']
          ]
        }
      }
    }
  },
  mounted() {
    // 为图片ICON绑定事件  getModule 为编辑器的内部属性
    setTimeout(() => {
      if (this.$refs.upload) {
        this.$refs.upload.quill.getModule('toolbar').addHandler('image', this.imgHandler)
      }
    }, 20)

    fetchToken().then(res => {
      if (res.code === '0') {
        this.el_uploadData.token = res.data.token
      }
    }).catch(e => {
      console.log(e)
    })
  },
  methods: {
    onEditorChange(item) {
      this.$emit('input', item.html)
    },
    imgHandler(state) {
      if (state) {
        this.uploadType = 'image'
        const fileInput = document.getElementById('btnUp')
        fileInput.click()
      }
    },
    beforeUpload(file) {
      console.log(file)
    },
    upScuccess(e, file, fileList) {
      console.log(e, file, fileList)
    },
    el_beforeUpload() {},
    el_upScuccess(e, file, fileList) {
      console.log(e, file, fileList)
      if (e.code === '0') {
        const url = e.data.key
        if (url) {
          debugger
          this.addRange = this.$refs.upload.quill.getSelection()
          this.$refs.upload.quill.insertEmbed(
            this.addRange !== null ? this.addRange.index : 0,
            this.uploadType,
            `http://p8cktaes1.bkt.clouddn.com/${url}`
          )
        }
      }
      // API: https://segmentfault.com/q/1010000008951906
      // this.$refs.myTextEditor.quillEditor.getSelection();
      // 获取光标位置对象，里面有两个属性，一个是index 还有 一个length，这里要用range.index，即当前光标之前的内容长度，然后再利用 insertEmbed(length, 'image', imageUrl)，插入图片即可。

      // if (this.uploadType === 'image') { // 获得文件上传后的URL地址
      //   url = STATICDOMAIN + e.key
      // }
      // if (url != null && url.length > 0) { // 将文件上传后的URL地址插入到编辑器文本中
      //   let value = url
      //   vm.addRange = vm.$refs.myQuillEditor.quill.getSelection()
      //   value = value.indexOf('http') !== -1 ? value : 'http:' + value
      //   vm.$refs.myQuillEditor.quill.insertEmbed(vm.addRange !== null ? vm.addRange.index : 0, vm.uploadType, value, Quill.sources.USER) // 调用编辑器的 insertEmbed 方法，插入URL
      // } else {
      //   vm.$message.error(`${vm.uploadType}插入失败`)
      // }
      this.$refs['el_upload'].clearFiles() // 插入成功后清除input的内容
    }
  }
}
</script>

<style lang="scss">
.quill-editor {
  width: 750px;
  .ql-container {
    min-height: 480px;
  }
}

.limit {
  height: 30px;
  border: 1px solid #ccc;
  line-height: 30px;
  text-align: right;
  span {
    color: #ee2a7b;
  }
}

.ql-snow .ql-editor img {
  max-width: 480px;
}
</style>
