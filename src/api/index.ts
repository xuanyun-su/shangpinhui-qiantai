import type { TypeNavOneItem } from '@/types/TypeNav'
import http from './http'
import mockhttp from './mockhttp'
import type { bannerdata, floordata } from '@/types/home'

// home的文件
// /api/product/getBaseCategoryList

export const reqCategoryList = () => http.request<TypeNavOneItem[]>({url:'/product/getBaseCategoryList',method:"GET"})


// 获取Banner
export const reqGetBannerList = ()=> mockhttp.request<bannerdata[]>({url:'/banner',method:'GET'})

// 获取floor数据
export const reqFloorList = ()=>mockhttp.request<floordata[]>({url:'/floor',method:'GET'})