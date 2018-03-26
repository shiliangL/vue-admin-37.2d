<template>
  <div class="login-container">
    <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
      class="card-box login-form">
      <h3 class="title"> Design影响力的Web设计</h3>
      <el-form-item prop="account">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="account" type="text" v-model.trim="loginForm.account" placeholder="用户名" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model.trim="loginForm.password" placeholder="密码"></el-input>
          <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
      <div class="tips">
         <!-- 提示登录、第三方登录、注册 -->
      </div>
    </el-form>

      <VParticles
        color="#fff"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="4"
        linesColor="#2E639E"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.6"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push">
    </VParticles>
    
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import { VParticles } from '@/components/indexEx.js'

export default {
  name: 'login',
  components: {
    VParticles
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        account: 'test',
        password: '11111111'
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password'
    }
  },
  created() {
    // console.log(this.$jq, 'vue实例')
  },
  methods: {
    getCookie(name) {
      const strcookie = document.cookie // 获取cookie字符串
      const arrcookie = strcookie.split('; ') // 分割
      for (let i = 0; i < arrcookie.length; i++) {
        const arr = arrcookie[i].split('=')
        if (arr[0] === name) {
          return arr[1]
        }
      }
      return ''
    },
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          // this.$jq.post('rtusapi/users/login', param, function(text, status) {
          //   console.log(text, status)
          // })
          // this.$http.post('rtusapi/users/login', param, (response, status) => {
          //   console.log(this.$util.getCookie('connect.sid'), 'dd')
          //   this.loading = false
          //   if (status && response.data.result === 'ok') {
          //     this.$message({ type: 'success', message: '登录成功' })
          //     this.$router.push({ path: '/' })
          //   } else {
          //     this.$message({ type: 'error', message: '未知错误登录失败' })
          //   }
          // })

          // this.$axios.post('rtusapi/users/login', this.newUserInfo, {
          //   headers: {
          //     'Content-Type': 'application/x-www-form-urlencoded'
          //   }
          // })
          //   .then(function(response) {
          //     console.log(response)
          //   })
          //   .catch(function(error) {
          //     console.log(error)
          //   })

          // const param = {
          //   account: this.loginForm.username,
          //   password: this.loginForm.password
          // }

          this.$store
            .dispatch('Login', this.loginForm)
            .then(() => {
              this.loading = false
              this.$router.push({ path: '/' })
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          this.$message({ type: 'warning', message: '请核对表单' })
          return
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #333;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  background-image: url("../../assets/imgs/b_g.svg");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
    -webkit-text-fill-color: #fff !important;
  }
  input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    color: $light_gray;
    height: 47px;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 410px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
</style>
