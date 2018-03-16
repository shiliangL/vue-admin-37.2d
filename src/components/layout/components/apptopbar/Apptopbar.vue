<template>
  <div class="apptopbar">
    <switchButton class="switchButton" :toggleClick="toggleSideBar" :isActive="sidebarShow"></switchButton>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { switchButton } from '@/components/indexExport'
export default {
  name: 'Apptopbar',
  props: {},
  components: {
    switchButton
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters([
      'getSidberIsCollapse'
    ]),
    sidebarShow () {
      return !this.$store.state.layout.sidberIsCollapse
    }
  },
  methods: {
    ...mapActions([
      'setSidberIsCollapse'
    ]),
    toggleSideBar () {
      this.setSidberIsCollapse(!this.getSidberIsCollapse)
    }
  },
  beforeCreate () {
    console.log('beforeCreate')
  },
  created () {
    console.log('created')
  },
  beforeMount () {
    console.log('beforeMount')
  },
  mounted () {
    console.log('mounted')
  },
  beforeUpdate () {
    console.log('beforeUpdate')
  },
  updated () {
    console.log('updated')
  },
  beforeDestroy () {
    console.log('beforeDestroy')
  },
  destroyed () {
    console.log('destroyed')
  }

}
</script>

<style lang="scss">
.apptopbar {
  width: 100%;
  padding: 0 16px;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 9999999999;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.3);
  color: #fff;
  height: 60px;
  display: flex;
  align-items: center;
  .switchButton {
    cursor: pointer;
  }
}
</style>
