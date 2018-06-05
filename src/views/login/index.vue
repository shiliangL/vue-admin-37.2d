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

            <el-button type="primary" style="width:100%;margin-bottom:30px;" class="button-login" :loading="loading" @click.native.prevent="handleLogin">{{$t('login.logIn')}}</el-button>

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
        <div class="copyright">
          <p> Copyright © www.chumanduo.com, All Rights Reserved. </p>
        </div>
      </div>
    
    </div>
  </div>
</template>

<script>
import { LangSelect } from '@/components/base.js'
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
  },
  methods: {
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
  background-color: #1cbc9c;
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

  .form-group {
    background: transparent;
    width: 300px; // 重新设置卡片阴影
    .title-container{
      text-align: center;
      .title{
        font-size: 18px;
        padding: 10px 0;
        display: block;
        color: #1cbc9c;
      }
    }
    .el-card {
      width: 350px;
      background-color: rgba(255, 255, 255, 1);
      border: none;
      border-radius: 10px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.349019607843137);
      font-family: '微软雅黑 Bold', '微软雅黑 Regular', '微软雅黑';
      font-weight: 700;
      font-style: normal;
      font-size: 16px;
      color: #999999;
      text-align: left;
      line-height: 20px;

      .el-card__body {
        padding-top: 70px;
      }
    } // 登陆按钮
    .button-login {
      width: 100%;
      background-color: #1cbc9c;
      border: none;
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

    .copyright{
      width: 100%;
      color: #fff;
      font-size: 12px;
    }
  }
}
</style>
