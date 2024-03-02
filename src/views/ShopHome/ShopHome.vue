<template>
  <TypeNav />
  <ListContainer />
  <TodayRecommend />
  <goodsRank />
  <goodsLike />
  <shopFloor v-for="item in homeStore.floorList"  :key="item.id" :list="item"/>
  <shopBrand />
</template>

<script lang="ts" setup>
import ListContainer from '@/views/ShopHome/pages/ListContainer.vue'
import TodayRecommend from './pages/TodayRecommend.vue'
import goodsRank from './pages/goodsRank.vue'
import goodsLike from './pages/goodsLike.vue'
import shopFloor from './pages/shopFloor.vue'
import shopBrand from './pages/shopBrand.vue'
import { useHomeStore, useUserStore } from '@/stores'
import { onMounted } from 'vue'
const homeStore = useHomeStore()
const userStore = useUserStore()
onMounted(() => {
  homeStore.getFloorList()
  userStore.getUserInfo()
})
</script>23

<style scoped></style>
