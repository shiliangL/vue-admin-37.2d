<template>
    <div class="errorPage">
      <div class="content">
        <div>
          <svg-icon style="width: 423px; height: 341px;" icon-class="4044"></svg-icon>
        </div>
        <div>
          <h1 class="num">404</h1>
          <div class="desc">抱歉，你访问的页面不存在</div>
          <el-button type="primary" size="small" @click.stop="clickToBack" > 返回 </el-button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'errorPage',
  methods: {
    clickToBack() {
      this.$router.go(-1)
      // this.$router.push({ path: '/' })
    }
  }
}
</script>

<style scoped lang="scss">
 .errorPage{
   width: 100%;
   height: 100%;
   background: #F0F2F5;
   .content{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .num{
        color: #434e59;
        font-size: 72px;
        font-weight: 600;
        line-height: 72px;
        margin-bottom: 24px;
      }
      .desc{
        color: rgba(0,0,0,.45);
        font-size: 20px;
        line-height: 28px;
        margin-bottom: 16px;
      }
   }
 }
</style>
