
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
      { path: '', component: () => import('components/createwallet/KeepYourKeysSafe.vue') }
    ]
  },{
    path: '/saveToFile',
    component: () => import('layouts/Default.vue'),
    children: [
      { path: '', component: () => import('components/createwallet/SaveToFile.vue') }
    ]
  },{
    path: '/writeItDown',
    component: () => import('layouts/Default.vue'),
    children: [
      { path: '', component: () => import('components/createwallet/WriteItDown.vue') }
    ]
  },{
    path: '/wallet',
    component: () => import('layouts/Default.vue'),
    children: [
      { path: '', component: () => import('components/vertoManager/Wallet.vue') }
    ]
  },{
    path: '/vertomanager',
    component: () => import('layouts/Default.vue'),
    children: [
      { path: '', component: () => import('components/vertoManager/VertoManager.vue') }
    ]
  },{
    path: '/beginGetVtx',
    component: () => import('layouts/Default.vue'),
    children: [
      { path: '', component: () => import('components/getvtx/BeginGetVtx.vue') }
    ]
  },{
    path: '/requestNativeChainAddress',
    component: () => import('layouts/Default.vue'),
    children: [
      { path: '', component: () => import('components/getvtx/RequestNativeChainAddress.vue') }
    ]
  },{
    path: '/getvtx',
    name: 'GetVtx',
    component: require('components/getvtx/GetVtx').default,
    meta: {
      requiresAuth: true
    }
  },{
    path: '/blocktopusCreate',
    component: () => import('layouts/NoWallet.vue'),
    children: [
      { path: '', component: () => import('components/blocktopus/Create.vue') }
    ]
  },{
    path: '/blocktopusAssociate',
    component: () => import('layouts/NoWallet.vue'),
    children: [
      { path: '', component: () => import('components/blocktopus/Associate.vue') }
    ]
  },{
    path: '/kycError',
    component: () => import('layouts/Default.vue'),
    children: [
      { path: '', component: () => import('components/blocktopus/KycError.vue') }
    ]
  },{
    path: '/blocktopusSuccess',
    component: () => import('layouts/Default.vue'),
    children: [
      { path: '', component: () => import('components/blocktopus/Success.vue') }
    ]
  }
]

if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
