<template>
	<div class="PictureCard">
		<el-upload v-if="!imgs"
		 	list-type="picture-card"
			action="http://up-z2.qiniu.com" 
			:data="uploadDatas" 
			:on-success="uploadSuccess" 
			:before-upload="beforeAvatarUpload"
			:limit="1" :accept="accept">
			<div class="card">
				<el-button type="text" size="mini">上传</el-button>
			</div>
		</el-upload>
		<div class="card-img" v-else>
			<i class="el-icon-close" @click.stop="handleRemove"></i>
			<img :src="imgs" alt="">
		</div>
	</div>
</template>

<script>
import { fetchToken } from '@/api/layout.js'
import { mapGetters } from 'vuex'

export default {
  name: 'PictureCard',
  data() {
    return {
      uploadDatas: {
        token: null
      },
      imgs: null,
      imgTypes: ['jpeg', 'png', 'jpg', 'bmp']
    }
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
  mounted() {
    this.fetchToken()
  },
  methods: {
    fetchToken() {
      fetchToken().then(({ data }) => {
        this.uploadDatas.token = data.token
      }).catch(e => {
        this.$message({ type: 'error', message: '图片上传参数获取失败,请重新打开页面' })
      })
    },
    uploadSuccess(res, file) {
      console.log(res, file)
      if (res.code === '0' && res.data && res.data.key) {
        this.imgs = `${this.baseImgUrl}${res.data.key}`
      }
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message({
          type: 'warning',
          message: '上传图片大小不能超过 2MB!'
        })
      }
      return isLt2M
    },
    handleRemove() {
      this.imgs = null
    },
    clickToUp() {
    }
  }
}
</script>

<style scoped lang="scss">
	.card {
    position: relative;
		cursor: pointer;
		width: 60px;
		height: 60px;
		border-radius: 4px;
		border: 1px solid #d9d9d9;
		background: #ffff;
		button {
      position: absolute;
      text-align: center;
      left: 15px;
      top: 15px;
		}
	}

	.card-img{
		position: relative;
		cursor: pointer;
		width: 60px;
		height: 60px;
		border-radius: 4px;
		border: 1px solid #d9d9d9;
		background: #ffff;
		overflow: hidden;
		i{
			position: absolute;
			top: 0px;
			right: 0px;
			color:#333;
		}
		img{
			width: 100%;
		}
	}
</style>