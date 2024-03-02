import { reqAddressInfo, reqOrderInfo } from '@/api/order'
import type { AddressInfo, orderInfo } from '@/types/trade'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTradeStore = defineStore('trade', () => {
  const AddressList = ref<AddressInfo[]>([])
  const getUserAddress = async () => {
    const result = await reqAddressInfo()
    if (result.code === 200) AddressList.value = result.data
  }
  const orderList = ref<orderInfo>()
  const getOrderInfo = async ()=>{
    const result = await reqOrderInfo()
    if(result.code == 200)
        orderList.value = result.data
  }
  return { getUserAddress, AddressList,getOrderInfo,orderList }
})
