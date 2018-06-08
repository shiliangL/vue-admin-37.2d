<template>
    <div class="toView">
          <div class="row-item">
            <div class="row-title">基本信息</div>
            <div class="row-content">
              
            </div>
          </div>
          <div class="row-item">
            <div class="row-title">发票信息</div>
            <div class="row-content"></div>
          </div>
          <div class="row-item">
            <div class="row-title">收货信息</div>
            <div class="row-content"></div>
          </div>
          <div class="row-item">
            <div class="row-title">商品信息</div>
            <div class="row-content"></div>
          </div>
          <div class="row-item">
            <div class="row-title">费用信息</div>
            <div class="row-content"></div>
          </div>
    </div>
</template>

<script>
export default {
  name: 'toView'
}
</script>

<style scoped lang="scss">
  .row-item {
    padding: 4px 0;
    .row-title {
      border-left: 2px solid #1cbc9c;
      padding-left: 8px;
    }
    .row-content {
    }
  }
</style>