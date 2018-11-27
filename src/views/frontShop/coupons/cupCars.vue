<!-- 看板卡片 -->
<template>
  <div class="cupCars">

    <el-row :gutter="12">
      <el-col :xs="24" :sm="12" :md="4" :lg="4" v-for="(item,index) in data" :key="index">
        <el-card shadow="hover">
          <div class="car-item">

            <div class="card-panel-icon" :class="item.class">


            </div>

            <div class="card-panel-num">
              <div class="title" v-cloak> {{item.title}} </div>
              <div class="car-num">
                <count-to :startVal="0" :endVal="item.number" :duration="3000"></count-to>
                <span  v-cloak class="unit"> {{ item.unit }} </span>
              </div>
              <!-- <div v-cloak class="unit"> {{ item.unit }}</div> -->
            </div>

          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import CountTo from 'vue-count-to'
export default {
  name: 'cupCars',
  components: {
    CountTo
  },
  props: {
    data: {
      type: Array
    }
  },
  methods: {
    clickCallBack(item, index) {
      if (!item) return
      this.$emit('callBack', item)
    }
  }
}
</script>

<style scoped lang="scss">
  .cupCars{
    padding: 5px;
    font-size: 14px;
    cursor: pointer;
    // font-weight: 400;
    background: #3adcb40f;
    .car-num{
      text-align: center;
      padding-left: 10px;
      font-weight: bold;
      color: #fa6e85;
      font-size: 22px;
      .unit{
        font-size: 14px;
      }
    }
    .unit{
      text-align: right;
    }
}
</style>
