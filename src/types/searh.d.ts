// 搜索商品需要的参数
export type seachgoodsparams = {
  category1Id?: string
  category2Id?: string
  category3Id?: string
  categoryName?: string
  keyword?: string
  props?: Array<stirng>
  trademark?: string
  order?: string
  pageNo?: number
  pageSize?: number
}
// 商品属性
export type goosparams = {
  attrId: number
  attrName: string
  attrValueList: Array<string>
}

// 商品的信息
export type goosinformation = {
  attrs?: string
  category1Id?: number
  category2Id?: number
  category3Id?: number
  category1Name?: string
  category2Name?: string
  category3Name?: string
  createTime?: Date
  defaultImg: string
  hotScore: number
  id: number
  price: number
  title: string
  tmId?: number
  tmName?: string
}

// 品牌信息
export type tradeInformation = {
    tmId:number
    tmName:string
}

// 搜索商品得到的结果
export type searchgoodsResult = {
  attrsList: Array<goosparams>
  goodsList: Array<goosinformation>
  pageNo:number
  pageSize:number
  total:number
  totalPages:number
  trademarkList:Array<tradeInformation>
}
