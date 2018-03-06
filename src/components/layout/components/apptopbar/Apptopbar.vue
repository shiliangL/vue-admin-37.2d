<template>
  <div class="apptopbar">
      头部
  </div>
</template>

<script>
export default {
  name: 'Apptopbar',
  props: {},
  components: {

  },
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
}
</style>
