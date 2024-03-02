import { reqCategoryList, reqFloorList, reqGetBannerList } from '@/api'
import type { TypeNavOneItem } from '@/types/TypeNav'
import type { bannerdata, floordata } from '@/types/home'
import { defineStore } from 'pinia'
import { ref } from 'vue'
export interface TargetEvent extends PointerEvent {
  target: HTMLElement
}
export const useHomeStore = defineStore('home', () => {
  // 三级列表数据
  const categoryList = ref<TypeNavOneItem[]>([])
  // 三级列表请求
  async function rescategoryList() {
    const res = await reqCategoryList()
    if (res.code == 200) categoryList.value = res.data
  }
  // 轮播图数据
  const bannerList = ref<bannerdata[]>([])
  // 轮播图请求
  async function getBannerList() {
    const result = await reqGetBannerList()
    bannerList.value = result.data
  }
  const floorList = ref<floordata[]>([])
  // floor数据
  async function getFloorList() {
    const result = await reqFloorList()
    floorList.value = result.data
  }
  
  
  
  
  
    return { categoryList, rescategoryList, bannerList, getBannerList,floorList,getFloorList }


})
