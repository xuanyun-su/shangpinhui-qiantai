import { createRouter, createWebHistory } from 'vue-router'

import routes from './routes'
import pinia, { useUserStore } from '@/stores'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

const userStore = useUserStore(pinia)

router.beforeEach(async (to) => {
  // console.log(to,from)
  const token = sessionStorage.getItem('token')
  if (token) {
    // console.log(to.fullPath)
    try {
      await userStore.getUserInfo()
    } catch (error: any) {
      // token 失效 因为是sessiStore可能没啥事 也会有事
      alert(error.message)
      sessionStorage.removeItem('token')
    }
    if (to.path == '/login' || to.path == '/register') return '/home'
  }
  // return to.fullPath
})

export default router
