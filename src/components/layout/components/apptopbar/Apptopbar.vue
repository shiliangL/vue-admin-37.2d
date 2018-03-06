<template>
  <div class="apptopbar">
    <div class="isCollapse">
      <i class="el-icon-tickets"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Apptopbar',
  props: {},
  components: {},
  data () {
    return {}
  }
}
</script>

<style lang="scss">
.apptopbar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 10;
  padding: 0 16px 0 0;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.3);
  background: #1976d2;
  color: #fff;
  height: 60px;
  display: flex;
  align-items: center;
  .isCollapse {
    cursor: pointer;
    font-size: 26px;
    width: 70px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    &:hover {
      background: #0a63bb;
    }
  }
}
</style>
