import type { detailInfo } from '@/types/detail'
import http from './http'
// 获取商品详情
export const reqGoodsInfo = (skuId:number) =>
  http.request<detailInfo>({ url: `/item/${skuId}`, method: 'GET' })
