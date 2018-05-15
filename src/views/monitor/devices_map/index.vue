<template>
    <div>
        <baidu-map class="bm-view" ak="vUHITq2fmXpfwoeezVGNh2VCfbT02tY7" center="深圳">
          <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
          <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true" @locationSuccess="locationSuccess"></bm-geolocation>
          <bm-marker :position="{lng: position.lng, lat: position.lat}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE"></bm-marker>
        </baidu-map>
    </div>
</template>

<script>
import { BmlMarkerClusterer, BmNavigation, BmGeolocation, BmMarker, BmLabel } from 'vue-baidu-map'
import BaiduMap from 'vue-baidu-map/components/Map/Map.vue'
export default {
  name: 'dcMap',
  components: {
    BaiduMap,
    BmlMarkerClusterer,
    BmNavigation,
    BmGeolocation,
    BmLabel,
    BmMarker
  },
  data() {
    return {
      position: {
        lng: null,
        lat: null
      }
    }
  },
  methods: {
    locationSuccess(pos) {
      if (pos) {
        const { position } = this
        position.lng = pos.point.lat
        position.lat = pos.point.lng
      }
    }
  }
}
</script>

<style scoped>
.bm-view {
  width: 100%;
  height: 500px;
}
</style>