import Vue from 'vue'
import VueI18n from 'vue-i18n'
import axios from 'axios'
import Buefy from 'buefy'
import VueQrcode from '@xkeshi/vue-qrcode'
import VueClipboard from 'vue-clipboard2'
import moment from 'moment'

import App from './App'
import router from './router'
import store from './store'
import EventBus from './bus'

import { i18n } from './plugins/i18n.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTelegram } from '@fortawesome/free-brands-svg-icons'
import { faCopy, faCheckCircle, faSyncAlt, faSlidersH, faArrowLeft, faKey, faTrash, faQuestionCircle, faShip, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueCountdown from '@chenfengyuan/vue-countdown';

// import VueParticles from 'vue-particles'
// Vue.use(VueParticles)
import Default from "./layouts/Default.vue";
import NoSidebar from "./layouts/NoSidebar.vue";
import Login from "./layouts/Login.vue";
import BlocktopusFrame from "./layouts/BlocktopusFrame.vue";

Vue.component("default-layout", Default);
Vue.component("no-sidebar-layout", NoSidebar);
Vue.component("login-layout", Login);
Vue.component("blocktopus-layout", BlocktopusFrame);

const { app } = require('electron').remote

Vue.prototype.$appVersion = app.getVersion();
Vue.prototype.$appName = app.getName();

library.add(faCopy, faCheckCircle, faSyncAlt, faSlidersH, faArrowLeft, faKey, faTrash, faQuestionCircle, faShip, faAngleUp)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component(VueCountdown.name, VueCountdown);
// Define a new component called button-counter
Vue.component(VueQrcode.name, VueQrcode)
Vue.use(VueClipboard)
Vue.use(Buefy)
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.filter("formatDate", function (value) {
  if (value) {
    return moment(value).format("MMM DD, YYYY");
  }
});

Vue.filter("formatTime", function (value) {
  if (value) {
    return moment(value).format("h:mm A");
  }
});

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  i18n,
  store,
  template: '<App/>'
}).$mount('#app')
