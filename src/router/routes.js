
const routes = [
  {
    path: '/',
    component: () => import('layouts/Login.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },{
    path: '/createPassword',
    component: () => import('layouts/NoWallet.vue'),
    children: [
      { path: '', component: () => import('components/vertoManager/CreatePassword.vue') }
    ]
  },{
    path: '/keepYourKeysafe',
    component: () => import('layouts/Default.vue'),
    children: [
      { path: '', component: () => import('components/vertoManager/KeepYourKeysSafe.vue') }
    ]
  },{
    path: '/walletBalance',
    component: () => import('layouts/Default.vue'),
    children: [
      { path: '', component: () => import('components/WalletBalance.vue') }
    ]
  },{
    path: '/one',
    component: () => import('layouts/NoWallet.vue'),
    children: [
      { path: '', component: () => import('pages/One.vue') }
    ]
  },{
    path: '/two',
    component: () => import('layouts/Default.vue'),
    children: [
      { path: '', component: () => import('pages/Two.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
