<template>
  <div class="fit text-white text-center bg-primary">
    <div class="q-pa-xl" v-if="hasCurrentWallet()">
      <q-icon name="account_balance_wallet" size="2rem"/>
      <div class="q-headline">Current Wallet</div>
    </div>
    <div v-if="hasWallets()">
      <div class="q-pa-xl">
        <q-icon name="all_inbox" size="2rem"/>
        <div class="q-headline">Wallet Manger</div>
      </div>
      <div class="q-pa-xl">
        <q-icon name="add_shopping_cart" size="2rem"/>
        <div class="q-headline">Get VTX</div>
      </div>
      <div class="q-pa-xl">
        <q-icon name="security" size="2rem"/>
        <div class="q-headline">Password</div>
      </div>
    </div>
    <div class="q-pa-xl">
      <q-icon name="exit_to_app" size="2rem"/>
      <div class="q-headline">Logout</div>
    </div>
  </div>
</template>

<script>
import configManager from '../../util/ConfigManager'
export default {
  name: 'OptionsDrawer',
  data () {
    return {}
  },
  methods: {
    hasWallets: function() {
      return configManager.hasWallets()
    },
    hasCurrentWallet: function() {
      return configManager.hasCurrentWallet()
    }
  }
}
</script>

<style>
</style>
