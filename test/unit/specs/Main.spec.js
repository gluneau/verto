import Vue from 'vue'
import { mount } from '@vue/test-utils'
import Main from '@/components/Main'
import router from "@/router"
import { i18n } from '@/plugins/i18n.js'
import store from '@/store'

describe('Main.vue', () => {
  it('Has a mounted hook', () => {
    assert.typeOf(Main.mounted, 'function');
  })

  it('Sets the correct default data', () => {
    assert.typeOf(Main.data, 'function')
    const defaultData = Main.data()
    assert.equal(defaultData.wallet, '')
    assert.equal(defaultData.balance, '0.00')
    assert.isFalse(defaultData.isCardModalActive)
    assert.equal(defaultData.transactionLink, "/transactiondetails")
  })

  it('Renders the correct message', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: h => h(Main),
      router: router,
      i18n: i18n,
      store: store
    }).$mount()

    assert.include(vm.$el.querySelector('.wallet-address').textContent, '')
  })
})
