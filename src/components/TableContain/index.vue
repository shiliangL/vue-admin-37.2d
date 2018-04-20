<template>
  <div class="tableContain" :class="{'border':border}">
      <slot ref="table" name="table"></slot>
      <slot ref="page" name="page"></slot>
  </div>
</template>

<script>
export default {
  name: 'TableContain',
  props: {
    border: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    window.addEventListener('resize', this.resizeHeight)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHeight)
  },
  methods: {
    resizeHeight() {
      setTimeout(() => {
        this.computeHight()
      }, 100)
    },
    computeHight() {
      const table = this.$slots.table[0] || 0
      const page = this.$slots.page[0] || 0
      const innerHieght = window.innerHeight
      const tableTop = table.elm.getBoundingClientRect().top
      let maxHeight = innerHieght - tableTop
      if (page) {
        const footerHeight = page.elm.offsetHeight
        maxHeight = innerHieght - footerHeight - tableTop
      }
      setTimeout(() => {
        this.$emit('update:height', maxHeight)
      }, 100)
    }
  }
}
</script>

<style scoped>
.border{
  border: 1px solid #ebebeb;
}
</style>
 