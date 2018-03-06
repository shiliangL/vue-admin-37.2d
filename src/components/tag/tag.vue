<template>
  <div class="tag">
    <span class="ivu-tag-dot-inner"></span>
    <span><slot></slot></span>
  </div>
</template>

<script>
export default {
  name: 'tag',
  props: {
    text: {
      text: String,
      default: '标签'
    }
  },
  data () {
    return {}
  }
}
</script>
<style scoped>
.tag .ivu-tag-dot-inner {
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-right: 8px;
  border-radius: 50%;
  background: #e9eaec;
  position: relative;
  top: 1px;
}
</style>
