// 注册所需信息
export type registerInfo = {
  phone: string
  code: string
  password: string
}

// 登录所需信息
export type loginInfo = {
  phone: string
  password: string
}
// 登录获得信息
export type logSuccess = {
  name: string
  nickName: string
  token: string
  userId: number
}

// 用户信息
export type userInfo = {
  birthday: Date | null
  createTime: Date | null
  email: string | null
  gender: string | null
  headImg: string
  id: number
  loginName: string
  name: string
  nickName: string
  openId: string | null
  operateTime: Date | null
  passwd: string
  phoneNum: string
  status: number
  userLevel: string
}
