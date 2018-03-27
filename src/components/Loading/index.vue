<template>
  <div class="Loading" v-if="value">
    <div class="mc">
      <div class="progress">
          <i v-if="progress" class="el-icon-loading"></i>
          <p v-if="text" class="loading-text">{{ loadText }}</p>
          <p v-if="error" class="error-text">{{ errorText }}</p>
          <el-button size="medium" type="primary" v-if="refresh"  @click="clickRefresh">刷新</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loading',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isLoading: false,
      progress: true,
      error: false,
      text: true,
      refresh: false,
      loadText: '正在载入..',
      errorText: ''
    }
  },
  created() {
    // console.log(this.value)
  },
  methods: {
    clickRefresh() {
      this.$emit('refresh')
    }
  }
}
</script>

<style lang="scss">
#app .Loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: hsla(0, 0%, 100%, 0.9);
  transition: opacity 0.3s;
  z-index: 9;
  width: 100%;
  height: 100%;
  .mc {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .progress {
      text-align: center;
      font-size:16px;
      color: #4091e9;
    }
  }
}
</style>
