
const routes = [
  {
    path: '/',
    redirect: 'login'
  },
  {
    name: 'intro',
    path: '/intro',
    component: () => import('layouts/Intro.vue'),
    children: [
      {
        name: 'login',
        path: '/login',
        component: () => import('pages/Login.vue')
      },
      {
        name: 'create-password',
        path: '/create-password',
        component: () => import('pages/CreatePassword.vue')
      },
      {
        name: 'keep-your-key-safe',
        path: '/keep-your-key-safe',
        component: () => import('components/createwallet/KeepYourKeysSafe.vue')
      },
      {
        name: 'save-to-file',
        path: '/save-to-file',
        component: () => import('components/createwallet/SaveToFile.vue')
      }
    ]
  },
  {
    path: '/writeItDown',
    component: () => import('layouts/Default.vue'),
    children: [
      { path: '', component: () => import('components/createwallet/WriteItDown.vue') }
    ]
  },
  {
    path: '/wallet',
    component: () => import('layouts/Default.vue'),
    children: [
      { path: '', component: () => import('components/vertoManager/Wallet.vue') }
    ]
  },
  {
    path: '/vertomanager',
    component: () => import('layouts/Default.vue'),
    children: [
      { path: '', component: () => import('components/vertoManager/VertoManager.vue') }
    ]
  },
  {
    path: '/beginGetVtx',
    component: () => import('layouts/Default.vue'),
    children: [
      { path: '', component: () => import('components/getvtx/BeginGetVtx.vue') }
    ]
  },
  {
    path: '/requestNativeChainAddress',
    component: () => import('layouts/Default.vue'),
    children: [
      { path: '', component: () => import('components/getvtx/RequestNativeChainAddress.vue') }
    ]
  },
  {
    path: '/getvtx',
    component: () => import('layouts/Default.vue'),
    children: [
      { path: '', component: () => import('components/getvtx/GetVtx.vue') }
    ]
  },
  {
    path: '/blocktopusCreate',
    component: () => import('layouts/NoWallet.vue'),
    children: [
      { path: '', component: () => import('components/blocktopus/Create.vue') }
    ]
  },
  {
    path: '/blocktopusAssociate',
    component: () => import('layouts/NoWallet.vue'),
    children: [
      { path: '', component: () => import('components/blocktopus/Associate.vue') }
    ]
  },
  {
    path: '/kycError',
    component: () => import('layouts/Default.vue'),
    children: [
      { path: '', component: () => import('components/blocktopus/KycError.vue') }
    ]
  },
  {
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
