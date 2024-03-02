import { reqsearchgoods } from '@/api/search'
import type { seachgoodsparams, searchgoodsResult } from '@/types/searh'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSearchStore = defineStore('search', () => {
  // 返回的数据
  const searchList = ref<searchgoodsResult>({
    attrsList: [],
    goodsList: [],
    pageNo: -1,
    pageSize: -1,
    total: -1,
    totalPages: -1,
    trademarkList: []
  })
  // 获取搜索商品数据
  async function getSearchList(params: seachgoodsparams) {
    const result = await reqsearchgoods(params)
    searchList.value = result.data
  }
  // getters就是计算属性

  return { searchList, getSearchList }
})
