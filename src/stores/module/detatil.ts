import { reqGoodsInfo } from '@/api/detail'
import { reqAddOrUpdateShopCart } from '@/api/shopcart'
import type { detailInfo } from '@/types/detail'
import type { shopcart } from '@/types/shopcart'
import { getUUID } from '@/utils/uuid_token'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useDetailStore = defineStore('detail', () => {
  const goodsInfo = ref<detailInfo>()
  const getGoodInfo = async (skuId: number) => {
    const result = await reqGoodsInfo(skuId)
    goodsInfo.value = result.data
  }
  const categoryView = computed(() => goodsInfo.value?.categoryView || {})
  const skuInfo = computed(() => goodsInfo.value?.skuInfo) // 加不了{}很奇怪
  const spuSaleAttrList = computed(() => goodsInfo.value?.spuSaleAttrList || [])
  const addOrUpdateSHopCart = async (data: shopcart) => {
    const result = await reqAddOrUpdateShopCart(data.skuID, data.skuNum)
    if (result.code === 200) return 'ok'
    return Promise.reject(new Error('fail'))
  }

  const uuid_token = getUUID()

  return { goodsInfo, getGoodInfo, categoryView, skuInfo, spuSaleAttrList, addOrUpdateSHopCart,uuid_token}
})
