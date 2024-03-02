import type { logSuccess, loginInfo, registerInfo, userInfo } from '@/types/user'
import http from './http'

export const reqGetCode = (phone: string) =>
  http.request<string>({ url: `/user/passport/sendCode/${phone}`, method: 'GET' })

export const reqUserRegister = (data: registerInfo) =>
  http.request<null>({ url: '/user/passport/register', method: 'POST', data })

export const reqUserLogin = (data: loginInfo) =>
  http.request<logSuccess>({ url: '/user/passport/login', data, method: 'POST' })

export const reqUserInfo = () =>
  http.request<userInfo>({ url: '/user/passport/auth/getUserInfo', method: 'GET' })


export const reqUserLogout = ()=> http.request({url:'/user/passport/logout',method:'GET'})