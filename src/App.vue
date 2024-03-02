<script setup lang="ts">
import ShopHeader from './components/ShopHeader/ShopHeader.vue'
import ShopFooter from './components/ShopFooter/ShopFooter.vue'
import { RouterView, useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { useHomeStore } from './stores';

const route = useRoute()
const homeStore = useHomeStore()
onMounted(() => homeStore.rescategoryList())
</script>

<template>
  <ShopHeader />
  <RouterView />
  <!-- show用不了建议使用路由全局解析守卫 -->
  <ShopFooter v-show="route.meta.show" />
</template>

<style scoped></style>
