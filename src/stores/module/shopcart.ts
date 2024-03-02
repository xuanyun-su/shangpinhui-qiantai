import {
  reqAddOrUpdateShopCart,
  reqDeleteCartByID,
  reqShopCartList,
  reqUpdateCartStatus
} from '@/api/shopcart'
import type { shopcart, shopcart1 } from '@/types/shopcart'

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useShopCartStore = defineStore('shopcart', () => {
  const cartList = ref<shopcart1[]>([{ cartInfoList: [] }])
  // 获取购物城列表
  const getCartList = async () => {
    const result = await reqShopCartList()
    // console.log(result)
    cartList.value = result.data
  }

  const realcartList = computed(() => {
    if (cartList.value[0]) {
      return cartList.value[0].cartInfoList
    }
    return [{ couponInfoList: [] }]
  })
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
    // @ts-ignore
    const PromiseAll = []
    // @ts-ignore
    realcartList.value.forEach((item) => {
      // console.log(item.isChecked)
      // @ts-ignore
      const result = item.isChecked == 1 ? deleteShopCart(item.skuId) : ''
      PromiseAll.push(result)
    })
    // @ts-ignore
    return Promise.all(PromiseAll)
  }

  const updateCheckCartById = async (skuId: number, isChecked: number) => {
    const result = await reqUpdateCartStatus(skuId, isChecked)
    if (result.code === 200) return 'ok'
    return Promise.reject(new Error('fail'))
  }

  const updateAllcheceked = (isChecked:number) => {
    // @ts-ignore
    const PromiseAll = []
    // 对哦 foreach可以直接map
    realcartList.value?.forEach(item=>{
      // @ts-ignore
      const result =  updateCheckCartById(item.skuId,isChecked)
      PromiseAll.push(result)
    })
    //@ts-ignore
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
