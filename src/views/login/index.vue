<template>
  <div class="login-container">
    <div class="container">
      <!-- logo部分 -->
      <!-- 表单部分 -->
      <div class="form-group">
        <el-card class="box-card">
          <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
            <div class="title-container">
              <span class="title">{{$t('login.title')}}</span>
            </div>
            <el-form-item prop="username">
              <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="username" />
            </el-form-item>

            <el-form-item prop="password">
              <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="password" />
            </el-form-item>

            <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="handleLogin">{{$t('login.logIn')}}</el-button>

            <!-- <div class="tips">
              <span>{{$t('login.username')}} : admin</span>
              <span>{{$t('login.password')}} : {{$t('login.any')}}</span>
            </div>
            <div class="tips">
              <span style="margin-right:18px;">{{$t('login.username')}} : editor</span>
              <span>{{$t('login.password')}} : {{$t('login.any')}}</span>
            </div> -->

            <!-- <el-button class="thirdparty-button" type="primary" @click="showDialog=true">{{$t('login.thirdparty')}}</el-button> -->
          </el-form>
        <!-- <el-dialog :title="$t('login.thirdparty')" :visible.sync="showDialog" append-to-body>
          {{$t('login.thirdpartyTips')}}
        </el-dialog> -->
        </el-card>
      </div>
    
    </div>
  </div>
</template>

<script>
import { LangSelect } from '@/components/base.js'
import config from './config'
export default {
  components: {
    LangSelect
  },
  name: 'login',
  data() {
    return {
      loginForm: {
        username: 'test',
        password: '11111111'
      },
      loginRules: {},
      passwordType: 'password',
      loading: false,
      showDialog: false
    }
  },
  mounted() {
    // 初始化例子插件
    require('particles.js')
    this.$nextTick(() => {
      // this.init()
    })
  },
  methods: {
    init() {
      if (!window.particlesJS) return
      window.particlesJS('canvas', config)
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('LoginByUsername', this.loginForm)
            .then(() => {
              this.loading = false
              this.$router.push({ path: '/' })
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return
        }
      })
    },
    afterQRScan() {
      // const hash = window.location.hash.slice(1)
      // const hashObj = getQueryObject(hash)
      // const originUrl = window.location.origin
      // history.replaceState({}, '', originUrl)
      // const codeMap = {
      //   wechat: 'code',
      //   tencent: 'code'
      // }
      // const codeName = hashObj[codeMap[this.auth_type]]
      // if (!codeName) {
      //   alert('第三方登录失败')
      // } else {
      //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
      //     this.$router.push({ path: '/' })
      //   })
      // }
    }
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  background-color: #edf4fa;
  height: 100%;
  width: 100%;
  
  .container{
    z-index: 10;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  } 

  .canvas {
    height: 100%;
    width: 100%;
    margin: 0px;
    padding: 0px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: #edf4fa;
  }
    
  .form-group {
    background: transparent;
    width: 300px; // 重新设置卡片阴影
    .title-container{
      text-align: center;
      .title{
        font-size: 18px;
        padding: 10px 0;
        display: block;
      }
    }
    .el-card {
      box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
        0 2px 4px 0 rgba(232, 237, 250, 0.5);
      .el-card__body {
        padding-top: 70px;
      }
    } // 登陆按钮
    .button-login {
      width: 100%;
    } // 输入框左边的图表区域缩窄
    .el-input-group__prepend {
      padding: 0px 14px;
    }
    .login-code {
      height: 40px - 2px;
      display: block;
      margin: 0px -20px;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
  }
}
</style>
