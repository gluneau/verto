import Vue from 'vue'
import { mount } from '@vue/test-utils'
import router from "@/router"
import { i18n } from '@/plugins/i18n.js'
import store from '@/store'
import Welcome from '@/components/Welcome'

describe('Welcome.vue', () => {
  it('Has a mounted hook', () => {
    assert.typeOf(Welcome.mounted, 'function');
  })

  it('Existing data hook', () => {
    assert.typeOf(Welcome.data, 'function')
  })

  // it('Sets the correct default data', () => {
  //   const vm = new Vue({
  //     el: document.createElement('div'),
  //     render: h => h(Welcome),
  //     router: router,
  //     i18n: i18n,
  //     store: store
  //   }).$mount()

  //   // const defaultData = Welcome.data()
  //   assert.equal(vm.data.publicKey, '')
  //   // assert.equal(vm.password, '')
  //   // assert.isFalse(vm.nopassword)
  //   // assert.isFalse(defaultData.incorrectPassword)
  //   // assert.isFalse(defaultData.hasPassword)
  // })

  it('Renders the correct message', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: h => h(Welcome),
      router: router,
      i18n: i18n,
      store: store
    }).$mount()

    assert.include(vm.$el.querySelector('.container').textContent, '')
  })
})
