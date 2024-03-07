// 收货人信息
export type AddressInfo = {
  consignee: string
  fullAddress: string
  id: number
  isDefault: string
  phoneNum: string
  provinceId: number
  regionId: number
  userAddress: string
  userId: number
}

// 订单商品
export type detailArray = {
  activityRule: null
  couponInfoList: null
  createTime: Date | null
  hasStock: null
  id: number
  imgUrl: string
  orderId: null
  orderPrice: number
  refundStatus: string
  refundStatusString: string
  skuId: number
  skuName: string
  skuNum: number
  sourceId: number
  sourceType: string
  splitActivityAmount: null
  splitCouponAmount: null
  splitTotalAmount: null
}

export type orderDetailVo = {
  activityRule: null
  orderDetailList: detailArray[]
}

// 订单支付信息
export type orderInfo = {
  activityReduceAmount: number
  couponInfoList: Array
  detailArrayList: detailArray[]
  orderDetailVoList: orderDetailVo[]
  originalTotalAmount: number
  totalAmount: number
  totalNum: number
  tradeNo: string
  userAddressList: AddressInfo[]
}

// 提交订单数据
export type submitorderinfo = {
  consignee: string
  consigneeTel: string
  deliveryAddress: string
  paymentWay: string
  orderComment: string
  orderDetailList: detailArray[]
}

// 获取到的支付信息
export type PayInfomation = {
  codeUrl?: string
  orderId?: number
  resultCode?: string
  totalFee?: number
}

// 我的订单的信息
export type myorderInfo = Partial<{
  current: number
  pages: Number
  records: Array<orderone>
  searchCount: boolean
  size: number
  total: number
}>

export type orderone = {
  activityReduceAmount: null
  consignee: string
  cosigneeTel: string
  couponInfo: null | string
  createTime: Date
  deliveryAddress: string
  expireTime: Date
  feightFee: null
  feightFeeReduce: null
  id: number
  imgUrl: null | string
  operateTime: null | Date
  orderCommnet: string
  orderDetailList: detailArray[]
  orderDetailVoList: null | Array
  orderStatus: string
  orderStatusName: string
  originalTotalAmount: null | number
  outTradeNo: string
  parentOrderId: null | number
  paymentWay: string
  processSatus: string
  provinceId: null | number
  refundableTime: null | Date
  totalAmount: number
  trackingNo: null | number
  tradeBody: string
  userId: number
  wareId: null | number
}
