<template>
  <div :class="className">
    <div class="loading-spinner">
      <div v-if="progress" class="panel-body loader-demo">
        <div class="ball-clip-rotate-pulse">
          <div></div>
          <div></div>
        </div>
      </div>
      <p v-if="text" class="loading-text">{{ loadText }}</p>
      <p v-if="error" class="error-text">{{ errorText}}</p>
      <el-button v-if="refresh"  @click="handleRefresh">刷新</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Loading',
  props: ['loading', 'loadingText', 'marginTop'],
  data() {
    return {
      className: null,
      progress: true,
      error: false,
      text: true,
      refresh: false,
      loadText: '正在载入..',
      errorText: ''
    }
  },
  created() {
    if (!this.marginTop) {
      this.className = 'loading-mask'
    } else {
      this.className = 'loading-mask1'
    }
  },
  methods: {
    handleError() {
      setTimeout(() => {
        this.progress = false
        this.text = false
        this.errorText = JSON.stringify(this.loadingText.message)
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
<style scoped>
.loading-mask {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  left: 0;
  background-color: rgba(255, 255, 255, 0.8);
}
.loading-mask1 {
  position: absolute;
  top: 60px;
  bottom: -60px;
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.8);
}
.loading-text {
  color: #83c0ff;
  padding-left: 5px;
}
.loader-demo {
  height: 90px;
}
.loading-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  text-align: center;
  margin-top: -60px;
  margin-left: -100px;
}
.error-text {
  color: red;
  padding-top: 20px;
}
</style>
