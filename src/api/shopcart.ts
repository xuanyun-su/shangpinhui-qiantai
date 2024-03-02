import type { shopcart1 } from '@/types/shopcart'
import http from './http'

export const reqAddOrUpdateShopCart = (skuId: number, skuNum: number) =>
  http.request({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'POST'
  })

export const reqShopCartList = () =>
  http.request<Array<shopcart1>>({ url: '/cart/cartList', method: 'GET' })

export const reqDeleteCartByID = (skuId: number) =>
  http.request({ url: `/cart/deleteCart/${skuId}`, method: 'DELETE' })

export const reqUpdateCartStatus = (skuId:number,isChecked:number) => http.request({url:`cart/checkCart/${skuId}/${isChecked}`,method:'GET'})
