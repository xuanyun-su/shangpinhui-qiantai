import { reqGetCode, reqUserInfo, reqUserLogin, reqUserLogout, reqUserRegister } from '@/api/user'
import type { loginInfo, registerInfo, userInfo } from '@/types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const code = ref<string>()
  const token = ref<string>()
  const userInfo = ref<userInfo | null>()
  const getCode = async (phone: string) => {
    const result = await reqGetCode(phone)
    if (result.code === 200) {
      // console.log(result)
      code.value = result.data
      //   console.log(code.value)
    } else Promise.reject(new Error('false'))
  }

  const userRegister = async (data: registerInfo) => {
    const result = await reqUserRegister(data)
    if (result.code === 200) return 'ok'
    else Promise.reject(new Error('false'))
  }

  const userLogin = async (data: loginInfo) => {
    const result = await reqUserLogin(data)
    if (result.code === 200) {
      token.value = result.data.token
      sessionStorage.setItem('token', token.value)
      return 'ok'
    } else return Promise.reject(new Error('faile'))
  }

  const getUserInfo = async () => {
    const result = await reqUserInfo()
    if (result.code == 200) {
      userInfo.value = result.data
      return 'ok'
    }
    else return Promise.reject(new Error('faile'))
  }

  const logout = async () => {
    const result = await reqUserLogout()
    if (result.code == 200) {
      token.value = ''
      userInfo.value = null
      sessionStorage.removeItem('token')
      return 'ok'
    }else return Promise.reject(new Error('faile'))
  }
  return { code, getCode, userRegister, userLogin, getUserInfo, userInfo, logout }
})
