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
  id: null
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
