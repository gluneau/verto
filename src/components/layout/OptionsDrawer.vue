<template>
  <div class="fit text-white text-center bg-primary">
    <div class="q-pa-xl" v-if="showCurrentWallet" @click="route('wallet')">
      <q-icon name="account_balance_wallet" size="2rem"/>
      <div class="q-headline">Current Wallet</div>
    </div>
    <div v-if="hasWallets()">
      <div class="q-pa-xl" v-if="showWalletManager" @click="route('vertomanager')">
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
    <div class="q-pa-xl" @click="logout()">
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
    return {
      showCurrentWallet: false,
      showWalletManager: false
    }
  },
  mounted() {
    this.showCurrentWallet = this.$router.currentRoute.path === '/wallet'
    this.showWalletManager = this.$router.currentRoute.path === '/vertomanager'
  },
  methods: {
    hasWallets: function() {
      return this.$store.state.currentwallet.wallet
    },
    showingCurrentWallet: function() {
      return this.$router.currentRoute.path === '/wallet'
    },
    route: function(route) {
      this.showCurrentWallet = true
      this.showWalletManager = true
      if (route === 'wallet') {
        this.showCurrentWallet = false
      }
      if (route === 'vertomanager') {
        this.showWalletManager = false
      }
      this.$router.push({path: route})
    },
    logout: function() {
      console.log('Logout')
      configManager.logout()
      this.$router.push({path: '/'})
    }
  }
}
</script>

<style>
</style>
