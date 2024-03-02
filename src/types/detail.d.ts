export type spuSaleAttrSpec = {
  id: number
  spuId: number
  baseSaleAttrId: number
  saleAttrName: string
  saleAttrValueName: string
  isChecked: string
}

export type spuSaleAttrInfo = {
  id: number
  spuId: number
  baseSaleAttrId: number
  saleAttrName: string
  spuSaleAttrValueList: Array<spuSaleAttrSpec>
}

// 全带？是因为空数组的情况 其他同理
export type skuImageInfo = {
  id?: number
  skuId?: number
  imgName?: string
  imgUrl?: string
  spuImgId?: number
  isDefault?: number
}
export type skuAttrInfo = {
  id: number
  attrId: number
  valueId: number
  skuId: number
}
export type skuInformation = {
  id: number
  spuId: number
  price: number
  skuName: string
  skuDesc: string
  weight: string
  tmId: number
  category3Id: number
  skuDefaultImg: string
  isSale: number
  skuImageList: skuImageInfo[]
  skuAttrValueList: skuAttrInfo[]
  skuSaleAttrValueList: null
}

// 服务器返回商品详情
export type detailInfo = {
  valuesSkuJson: string
  price: number
  // 导航路径
  categoryView: {
    id?: number
    category1Id?: number
    category1Name?: string
    category2Id?: number
    category2Name?: string
    category3Id?: number
    category3Name?: string
  }
  spuSaleAttrList?: spuSaleAttrInfo[]
  skuInfo: skuInformation
}

