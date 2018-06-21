<template>
   <div class="loading loading-group">
        <div class="sk-cube-grid" v-if="progress">
          <div class="sk-cube sk-cube1"></div>
          <div class="sk-cube sk-cube2"></div>
          <div class="sk-cube sk-cube3"></div>
          <div class="sk-cube sk-cube4"></div>
          <div class="sk-cube sk-cube5"></div>
          <div class="sk-cube sk-cube6"></div>
          <div class="sk-cube sk-cube7"></div>
          <div class="sk-cube sk-cube8"></div>
          <div class="sk-cube sk-cube9"></div>
        </div>
        <p v-if="text" class="loading-text">{{ loadText }}</p>
        <p v-if="error" class="error-text">{{ errorText}} </p>
        <el-button type="primary" size="mini" v-if="refresh"  @click="handleRefresh">刷新</el-button>
      </div>
</template>

<script>
export default {
  name: 'Loading',
  props: ['loading', 'loadingText'],
  data() {
    return {
      progress: true,
      error: false,
      text: true,
      refresh: false,
      loadText: '正在载入..',
      errorText: ''
    }
  },
  methods: {
    handleError() {
      setTimeout(() => {
        this.progress = false
        this.text = false
        // this.errorText = JSON.stringify(this.loadingText.msg)
        this.errorText = this.loadingText.msg
        this.error = true
        this.refresh = true
      }, 1000)
    },
    handleRefresh() {
      this.error = false
      this.refresh = false
      this.text = '正在载入..'
      this.text = true
      this.progress = true
      this.$emit('loadingRefresh', -1)
    }
  },
  watch: {
    loadingText() {
      this.handleError()
    }
  }
}
</script>

<style scoped lang="scss">
.loading-group {
  min-width: 100%;
  min-height: 100%;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #757f9a;
  background: -webkit-linear-gradient(to top, #d7dde8, #757f9a);
  background: linear-gradient(to top, #d7dde8, #757f9a);
}
.loading-text {
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 10px;
  letter-spacing: 0.2em;
}

.error-text{
  color:red; padding-top: 20px;
}

.sub-title {
  color: #fff;
  font-size: 10px;
}
.sk-cube-grid {
  width: 30px;
  height: 30px;
}

.sk-cube-grid .sk-cube {
  width: 10px;
  height: 10px;
  background-color: #fff;
  float: left;
  -webkit-animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
  animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
}
.sk-cube-grid .sk-cube1 {
  border-top-left-radius: 4px;
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}
.sk-cube-grid .sk-cube2 {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}
.sk-cube-grid .sk-cube3 {
  border-top-right-radius: 4px;
  -webkit-animation-delay: 0.4s;
  animation-delay: 0.4s;
}
.sk-cube-grid .sk-cube4 {
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s;
}
.sk-cube-grid .sk-cube5 {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}
.sk-cube-grid .sk-cube6 {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}
.sk-cube-grid .sk-cube7 {
  border-bottom-left-radius: 4px;
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
}
.sk-cube-grid .sk-cube8 {
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s;
}
.sk-cube-grid .sk-cube9 {
  border-bottom-right-radius: 4px;
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}

@-webkit-keyframes sk-cubeGridScaleDelay {
  0%,
  70%,
  100% {
    -webkit-transform: scale3D(1, 1, 1);
    transform: scale3D(1, 1, 1);
  }
  35% {
    -webkit-transform: scale3D(0, 0, 1);
    transform: scale3D(0, 0, 1);
  }
}

@keyframes sk-cubeGridScaleDelay {
  0%,
  70%,
  100% {
    -webkit-transform: scale3D(1, 1, 1);
    transform: scale3D(1, 1, 1);
  }
  35% {
    -webkit-transform: scale3D(0, 0, 1);
    transform: scale3D(0, 0, 1);
  }
}
</style>