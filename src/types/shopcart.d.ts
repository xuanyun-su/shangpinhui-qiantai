// 购物车所需参数
export type shopcart = {
  skuID: number
  skuNum: number
}
// 怪异购物车数据
export type shopcart1 = {
  activityRuleList?:null
  createTime?:string
  cartInfoList?: shopcartItem[]
}
// 购物车信息
export type shopcartItem = {
  id?: number
  userId?: string
  skuId?: number
  cartPrice?: number
  skuNum?: number
  imgUrl?: string
  skuName?: string
  isChecked?: number
  skuPrice?: number
  orderTime?:Date | null
  isOrdered?: number
  sourceId?:number
  sourceType?:string
  userId?: string
  operateTime?:Date
  createTime?:Date
  couponInfoList?:null
}
