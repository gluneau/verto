// Configuration for your app
const webpack = require('webpack')
const path = require('path')

// Get our env variables
const envparser = require('./src/util/envparser')

module.exports = function (ctx) {
  return {
    // app plugins (/src/plugins)
    plugins: [
      'i18n',
      'axios'
    ],
    css: [
      'app.styl'
    ],
    extras: [
      ctx.theme.mat ? 'roboto-font' : null,
      'material-icons' // optional, you are not bound to it
      // 'ionicons',
      // 'mdi',
      // 'fontawesome'
    ],
    supportIE: false,
    build: {
      scopeHoisting: true,
      env: envparser(),
      // vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack (cfg) {
      }
    },
    devServer: {
      // https: true,
      // port: 8080,
      open: true // opens browser window automatically
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      components: [
        'QLayout',
        'QLayoutHeader',
        'QLayoutDrawer',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QList',
        'QListHeader',
        'QItem',
        'QItemMain',
        'QItemSide',
        'QScrollArea',
        'QTabs',
        'QTab',
        'QTabPane',
        'QRouteTab',
        'QLayoutFooter',
        'QJumbotron',
        'QField',
        'QInput',
        'QItemTile',
        'QCheckbox',
        'QCard',
        'QCardTitle',
        'QCardMain',
        'QCardMedia',
        'QCardSeparator',
        'QCardActions',
        'QCollapsible',
        'QSelect',
        'QTable',
        'QTr',
        'QTd'
      ],
      directives: [
        'Ripple'
      ],
      // Quasar plugins
      plugins: [
        'Notify'
      ]
      // iconSet: ctx.theme.mat ? 'material-icons' : 'ionicons'
      // i18n: 'de' // Quasar language
    },
    // animations: 'all' --- includes all animations
    animations: [],
    ssr: {
      pwa: false
    },
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      bundler: 'builder', // or 'packager'
      extendWebpack (cfg) {
        // do something with Electron process Webpack cfg
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
        "productName": "Verto",
        "appId": "io.volentix.verto",
        // "directories": {
        //   "output": "build"
        // },
        // "files": [
        //   "dist/electron/**/*"
        // ],
        "extraResources": [
          "resources/**"
        ],
        "dmg": {
          "contents": [{
              "x": 410,
              "y": 150,
              "type": "link",
              "path": "/Applications"
            },
            {
              "x": 130,
              "y": 150,
              "type": "file"
            }
          ]
        },
        "mac": {
          "icon": "icons/mac/icon.icns",
          "target": [
            "zip",
            "dmg"
          ],
          "extendInfo": {
            "NSAppTransportSecurity": {
              "NSAllowsArbitraryLoads": true
            },
            "NSExceptionDomains": {
              "localhost": {
                "NSTemporaryExceptionAllowsInsecureHTTPSLoads": false,
                "NSIncludesSubdomains": false,
                "NSTemporaryExceptionAllowsInsecureHTTPLoads": true,
                "NSTemporaryExceptionMinimumTLSVersion": "1.0",
                "NSTemporaryExceptionRequiresForwardSecrecy": false
              }
            }
          }
        },
        "win": {
          "icon": "icons/windows/icon.ico",
          "target": "nsis",
          "publisherName": "Volentix Labs, Inc."
        },
        "linux": {
          "category": "Network",
          "description": "A multi-currency crypto wallet with initial support for EOS & VTX",
          "desktop": {
            "Name": "Verto",
            "GenericName": "Verto Wallet",
            "X-GNOME-FullName": "Verto",
            "Comment": "A multi-currency crypto wallet with initial support for EOS & VTX",
            "Type": "Application",
            "Terminal": "false",
            "StartupNotify": "false",
            "Categories": "Network;"
          },
          "icon": "icons/linux",
          "target": "deb"
        },
        "publish": [{
          "owner": "Volentix",
          "provider": "github",
          "releaseType": "draft"
        }]
      }
    }
  }
}
