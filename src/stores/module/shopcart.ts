import {
  reqAddOrUpdateShopCart,
  reqDeleteCartByID,
  reqShopCartList,
  reqUpdateCartStatus
} from '@/api/shopcart'
import type { shopcart, shopcart1, shopcartItem } from '@/types/shopcart'

import { defineStore } from 'pinia'
import { computed, ref, type ComputedRef } from 'vue'

export const useShopCartStore = defineStore('shopcart', () => {
  const cartList = ref<shopcart1[]>([{ cartInfoList: [] }])
  // 获取购物城列表
  const getCartList = async () => {
    const result = await reqShopCartList()
    cartList.value = result.data
  }

  const realcartList = computed(() => {
    if (cartList.value[0]) {
      return cartList.value[0].cartInfoList as shopcartItem
    }
    return null
  })as ComputedRef<shopcartItem[]>;
  const addOrUpdateSHopCart = async (data: shopcart) => {
    const result = await reqAddOrUpdateShopCart(data.skuID, data.skuNum)
    if (result.code === 200) return 'ok'
    return Promise.reject(new Error('fail'))
  }
  const deleteShopCart = async (skuID: number) => {
    const result = await reqDeleteCartByID(skuID)
    if (result.code == 200) return 'ok'
    else return Promise.reject(new Error('fail'))
  }

  const deleteAllCheckedCart = () => {
    const PromiseAll: Array<Promise<string>> = []
    if (Array.isArray(realcartList.value)) {
      realcartList.value.forEach((item) => {
        if (item.isChecked === 1) {
          const result = deleteShopCart(item.skuId!)
          PromiseAll.push(result)
        }
      })
    }
    return Promise.all(PromiseAll)
  }

  const updateCheckCartById = async (skuId: number, isChecked: number) => {
    const result = await reqUpdateCartStatus(skuId, isChecked)
    if (result.code === 200) return 'ok'
    return Promise.reject(new Error('fail'))
  }

  const updateAllcheceked = (isChecked: number) => {
    const PromiseAll: Array<Promise<String>> = []
    // 对哦 foreach可以直接map
    if (Array.isArray(realcartList.value)) {
      realcartList.value.forEach((item) => {
        const result = updateCheckCartById(item.skuId!, isChecked)
        PromiseAll.push(result)
      })
    }
    return Promise.all(PromiseAll)
  }
  return {
    getCartList,
    realcartList,
    addOrUpdateSHopCart,
    deleteShopCart,
    deleteAllCheckedCart,
    updateCheckCartById,
    updateAllcheceked
  }
})
