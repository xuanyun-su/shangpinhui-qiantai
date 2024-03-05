// 这里想办法表上类型 RouteRecordRaw[]
export default [
  {
    path: '/center',
    component: () => import('@/views/PersonCenter/PersonCenter.vue'),
    meta: { show: true },
    children: [
      {
        path: 'myorder',
        component: () => import('@/views/PersonCenter/pages/MyOrder.vue')
      },
      {
        path: 'grouporder',
        component: () => import('@/views/PersonCenter/pages/GroupOrder.vue')
      },
      {
        path: '/center',
        component: () => import('@/views/PersonCenter/pages/MyOrder.vue')
      }
    ]
  },
  {
    path: '/home',
    component: () => import('@/views/ShopHome/ShopHome.vue'),
    meta: { show: true }
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    name: 'search',
    path: '/search/:keyword?',
    component: () => import('@/views/shopSearch/ShopSearch.vue'),
    meta: { show: true },
    // props: true
    // 这里类型有点问题待调整
    props: (route: { query: { q: any }; params: { keyword: any } }) => ({
      q: route.query.q,
      keyword: route.params.keyword
    })
  },
  {
    path: '/login',
    component: () => import('@/views/UserLogin/UserLogin.vue'),
    meta: { show: false }
  },
  {
    path: '/register',
    component: () => import('@/views/UserRegister/UserRegister.vue'),
    meta: { show: false }
  },
  {
    name: 'detail',
    path: '/detail/:skuId',
    component: () => import('@/views/GoodsDetail/GoodsDetail.vue'),
    props: true
  },
  {
    path: '/addcartsuccess',
    name: 'addcartsuccess',
    component: () => import('@/views/AddCartSuccess/AddCartSuccess.vue'),
    meta: { show: true },
    props: (route: { query: { skuNum: number } }) => ({
      skuNum: route.query.skuNum
    })
  },
  {
    path: '/shopcart',
    name: 'shopcart',
    component: () => import('@/views/ShopCart/ShopCart.vue'),
    meta: { show: true }
  },
  {
    path: '/trade',
    name: 'trade',
    component: () => import('@/views/OrderTrade/OrderTrade.vue'),
    meta: { show: true }
  },
  {
    path: '/pay',
    name: 'pay',
    component: () => import('@/views/OrderPay/OrderPay.vue'),
    meta: { show: true },
    props: (route: { query: { orderId: number } }) => ({
      orderId: route.query.orderId
    })
  },
  {
    path: '/paysuccess',
    name: 'paysuccess',
    component: () => import('@/views/PaySuccess/PaySuccess.vue'),
    meta: { show: true }
  }
]
