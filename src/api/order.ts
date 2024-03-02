// 地址和订单

import type { AddressInfo, PayInfomation, orderInfo, submitorderinfo } from '@/types/trade'
import http from './http'

export const reqAddressInfo = () =>
  http.request<AddressInfo[]>({ url: '/user/userAddress/auth/findUserAddressList', method: 'GET' })

export const reqOrderInfo = ()=>http.request<orderInfo>({url:'/order/auth/trade',method:'GET'})


export const reqSubmitOrder = (tradeNo:string,data:submitorderinfo)=>http.request<number>({url:`order/auth/submitOrder?tradeNo=${tradeNo}`,method:'POST',data})

export const reqPayInfo = (orderId:number)=>http.request<PayInfomation>({url:`/payment/weixin/createNative/${orderId}`,method:'GET'})

export const reqPayStatus = (orderId:number)=>http.request({url:`payment/weixin/queryPayStatus/${orderId}`,method:'GET'})