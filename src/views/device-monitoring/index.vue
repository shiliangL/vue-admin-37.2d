<template>
  <div class="deviceMonitoring">
    <h1>测试产品地图</h1>
    <!-- <div class="test" @wheel.prevent="handleScroll" :style="{top: top + 'px'}">
      <div> 测试 </div>
      <div> 测试 </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'deviceMonitoring',
  props: {
    text: {
      text: String,
      default: '标签'
    }
  },
  data () {
    return {
      top: 0
    }
  },
  methods: {
    handleScroll (e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 3
      if (eventDelta > 0) {
        console.log(1)
        this.top += 10
      } else {
        console.log(2)
        this.top -= 10
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .test {
    position: relative;
    >div {
      width: 60px;
      height: 60px;
      background: #333;
      margin-bottom: 20px;
    }
  }
</style>
