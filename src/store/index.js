import Vue from 'vue'
import Vuex from 'vuex'

// we first import the module
import currentwallet from './currentwallet'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    // then we reference it
    currentwallet
  }
})

// if we want some HMR magic for it, we handle
// the hot update like below. Notice we guard this
// code with "process.env.DEV" -- so this doesn't
// get into our production build (and it shouldn't).
if (process.env.DEV && module.hot) {
  module.hot.accept(['./currentwallet'], () => {
    const newCurrentwallet = require('./currentwallet').default
    store.hotUpdate({ modules: { currentwallet: newCurrentwallet } })
  })
}

export default store