import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
// const requests = axios.create({
//   baseURL: '/api',
//   timeout: 5000
// })
// requests.interceptors.request.use((config) => {
//   nProgress.start()
//   return config
// })

// requests.interceptors.response.use(
//   (res) => {
//     nProgress.done()
//     return res.data
//   },
//   (err) => {
//     nProgress.done()
//     return Promise.reject(new Error(err))
//   }
// )

// export default requests

type Result<T> = {
  code: number
  message: string
  data: T
  ok: boolean
}
// 或者js封装 类型用到vue的返回值上 而不是axios的返回值上
export class http {
  instance: AxiosInstance
  baseConfig: AxiosRequestConfig = { baseURL: '/api', timeout: 6000 }
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(Object.assign(this.baseConfig, config))
    this.instance.interceptors.request.use((config) => {
      nProgress.start()
      const uuid_token = localStorage.getItem('UUIDTOKEN')
      const token = sessionStorage.getItem('token')
      if (uuid_token) config.headers.userTempId = uuid_token
      if(token) config.headers.token = token
      // console.log(uuid_token)
      return config
    })
    this.instance.interceptors.response.use(
      (res) => {
        nProgress.done()
        return res.data
      },
      (err) => {
        nProgress.done()
        // 这里用来处理http常见错误，进行全局提示
        /*         let message = "";
         switch (err.response.status) {
           case 400:
             message = "请求错误(400)";
             break;
           case 401:
             message = "未授权，请重新登录(401)";
             // 这里可以做清空storage并跳转到登录页的操作
             break;
           case 403:
             message = "拒绝访问(403)";
             break;
           case 404:
             message = "请求出错(404)";
             break;
           case 408:
             message = "请求超时(408)";
             break;
           case 500:
             message = "服务器错误(500)";
             break;
           case 501:
             message = "服务未实现(501)";
             break;
           case 502:
             message = "网络错误(502)";
             break;
           case 503:
             message = "服务不可用(503)";
             break;
           case 504:
             message = "网络超时(504)";
             break;
           case 505:
             message = "HTTP版本不受支持(505)";
             break;
           default:
             message = `连接出错(${err.response.status})!`;
         } */
        // 这里错误消息可以使用全局弹框展示出来
        // 比如element plus 可以使用 ElMessage
        // ElMessage({
        //   showClose: true,
        //   message: `${message}，请检查网络或联系管理员！`,
        //   type: "error",
        // });
        // 这里是AxiosError类型，所以一般我们只reject我们需要的响应即可
        return Promise.reject(err.response)
      }
    )
  }
  //  Promise<AxiosResponse<Result<T>>>
  public request<T>(config: AxiosRequestConfig): Promise<Result<T>> {
    return this.instance.request(config)
  }
}

export default new http({})
