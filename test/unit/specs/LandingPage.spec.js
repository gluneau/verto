import Vue from 'vue'
import { mount } from '@vue/test-utils'
import LandingPage from '@/components/LandingPage'
import router from "@/router"

describe('LandingPage.vue', () => {
  it('Has a created hook', () => {
    assert.typeOf(LandingPage.created, 'function');
  })

  it('Sets the correct default data', () => {
    assert.typeOf(LandingPage.data, 'function')
    const defaultData = LandingPage.data()
    assert.equal(defaultData.messages, 'Welcome page')
    assert.isFalse(defaultData.is_login)
  })

  it('Renders the correct message', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: h => h(LandingPage),
      router: router
    }).$mount()

    assert.include(vm.$el.querySelector('.container').textContent, 'Welcome page')
  })
})
