
const routes = [
  {
    path: '/',
    redirect: { name: 'login' }
  },
  {
    name: 'intro',
    path: '/intro',
    component: () => import('layouts/Intro.vue'),
    children: [
      {
        name: 'login',
        path: '/login',
        component: () => import('pages/Intro/Login.vue')
      },
      {
        name: 'create-password',
        path: '/create-password',
        component: () => import('pages/Intro/CreatePassword.vue')
      },
      {
        name: 'keep-your-key-safe',
        path: '/keep-your-key-safe',
        component: () => import('pages/Intro/KeepYourKeysSafe.vue')
      },
      {
        name: 'save-to-file',
        path: '/save-to-file',
        component: () => import('pages/Intro/SaveToFile.vue')
      }
    ]
  },
  {
    path: '/associateVenue',
    component: () => import('layouts/Default.vue'),
    children: [
      { path: '', component: () => import('components/vertoManager/AssociateVenue.vue') }
    ]
  },
  {
    path: '/crowdsale',
    component: () => import('layouts/Default.vue'),
    children: [
      { path: '', component: () => import('components/getvtx/Crowdsale.vue') }
    ]
  },
  {
    path: '/writeItDown',
    component: () => import('layouts/Default.vue'),
    children: [
      { path: '', component: () => import('components/WriteItDown.vue') }
    ]
  },
  // {
  //   path: '/createPassword',
  //   component: () => import('layouts/NoWallet.vue'),
  //   children: [
  //     { path: '', component: () => import('components/vertoManager/CreatePassword.vue') }
  //   ]
  // },
  // {
  //   path: '/keepYourKeysafe',
  //   component: () => import('layouts/Default.vue'),
  //   children: [
  //     { path: '', component: () => import('components/createwallet/KeepYourKeysSafe.vue') }
  //   ]
  // },
  {
    path: '/pendingTransactions',
    component: () => import('layouts/Default.vue'),
    children: [
      { path: '', component: () => import('components/vertoManager/PendingTransactions.vue') }
    ]
  },
  // {
  //   path: '/saveToFile',
  //   component: () => import('layouts/Default.vue'),
  //   children: [
  //     { path: '', component: () => import('components/createwallet/SaveToFile.vue') }
  //   ]
  // },
  {
    path: '/wallet',
    component: () => import('layouts/Default.vue'),
    children: [
      { path: '', component: () => import('components/vertoManager/Wallet.vue') }
    ]
  },
  {
    path: '/changePassword',
    component: () => import('layouts/Default.vue'),
    children: [
      { path: '', component: () => import('components/vertoManager/ChangePassword.vue') }
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
    component: () => import('layouts/NoWallet.vue'),
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
