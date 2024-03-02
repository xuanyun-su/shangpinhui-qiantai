import http from './http'
import type { seachgoodsparams, searchgoodsResult } from '@/types/searh'

export const reqsearchgoods = (d:seachgoodsparams) =>
  http.request<searchgoodsResult>({ url: '/list', method: 'POST', data:d })
