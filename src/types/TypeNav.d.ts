// 三级列表
export type TypeNavPublicItem = {
  categoryId: number
  categoryName: string
}
// 二级列表
export type TypeNavTwoItem = {
  categoryId: number
  categoryName: string
  categoryChild: TypeNavPublicItem[]
}
// 一级列表
export type TypeNavOneItem = {
  categoryId: number
  categoryName: string
  categoryChild: TypeNavTwoItem[]
}
// // 父亲委派处理 和源代码监听冲突
// export interface TargetEvent extends PointerEvent {
//   target: HTMLElement
// }

// 发送请求传参
export type categoryrequest = {
  categoryName: string
  category1Id?: string
  category2Id?: string
  category3Id?: string
}

export type locationall = {
  query?: categoryrequest
  name: string
  params?:{keyword:string}
}
