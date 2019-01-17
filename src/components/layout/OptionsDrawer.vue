<template>
  <div class="fit text-white text-center bg-primary">
    <div class="q-pa-lg" v-if="showCurrentWallet" @click="route('wallet')">
      <q-icon name="account_balance_wallet" size="2rem"/>
      <div>Current Wallet</div>
    </div>
    <div v-if="showWalletManager">
      <div class="q-pa-lg" @click="route('vertomanager')">
        <q-icon name="all_inbox" size="2rem"/>
        <div>Wallet Manger</div>
      </div>
      <div class="q-pa-lg" @click="route('beginGetVtx')" v-if="showGetVtx">
        <q-icon name="add_shopping_cart" size="2rem"/>
        <div>Get VTX {{ getvtxmessage }}</div>
      </div>
      <div class="q-pa-lg" @click="minimizedModal = !minimizedModal" v-if="!showGetVtx">
        <q-icon name="add_shopping_cart" size="2rem"/>
        <div>KYC</div>
      </div>
      <div class="q-pa-lg" @click="route('beginGetVtx')">
        <q-icon name="compare_arrows" size="2rem"/>
        <div>Associate Wallet</div>

      </div>
      </div>
      <div>
      <div class="q-pa-lg">
        <q-icon name="security" size="2rem"/>
        <div>Password</div>
      </div>
    </div>
    <div class="q-pa-lg" @click="logout()">
      <q-icon name="exit_to_app" size="2rem"/>
      <div>Logout</div>
    </div>

    <q-modal v-model="minimizedModal" minimized ref="modalRef">
      <div style="padding: 50px" class="text-center">
        <div class="q-display-1 q-mb-md">KYC With Blocktopus</div>
        <p></p>
        <div class="q-pa-md">
          <q-btn outline rounded color="primary" v-close-overlay label="Create New Account" @click="route('blocktopusCreate')"/>
        </div>
        <div class="q-pa-sm">
          <q-btn outline rounded  color="primary" v-close-overlay label="Associate Existing Account" @click="route('blocktopusAssociate')"/>
        </div>
      </div>
    </q-modal>
  </div>
</template>

<script>
import configManager from '../../util/ConfigManager'
import getVtxHelper from '../../util/GetVtxHelper'

export default {
  name: 'OptionsDrawer',
  data () {
    return {
      showCurrentWallet: false,
      showWalletManager: false,
      getvtxmessage: '',
      showGetVtx: true,
      minimizedModal: false
    }
  },
  mounted () {
    this.showCurrentWallet = this.$router.currentRoute.path === '/wallet'
    this.showWalletManager = this.$router.currentRoute.path === '/vertomanager'
    const self = this
    getVtxHelper.getWalletStatus(this.$store.state.currentwallet.wallet.key, function (response) {
      self.showGetVtx = true
      if (response.success) {
        if (response.message === 'wallet_not_allocated' || response.message === 'wallet_allocated') {
          self.getvtxmessage = self.$t('Main.approvedMessage')
        } else if (response.message === 'wallet_not_whitelisted') {
          self.getvtxmessage = 'wallet not associated'
          self.showGetVtx = false
        } else if (response.message === 'purchase_not_allowed') {
          self.getvtxmessage = self.$t('Main.waitingForApproval')
        }
        console.log('success')
      } else {
        console.log('fail')
      }
    })

  // blocktopusCreate
  // blocktopusAssociate

    /*
    if (message === 'wallet_not_allocated' || message === 'wallet_allocated') {
        this.approvedToBuyVtx = true;
      } else if (message === 'wallet_not_whitelisted') {
        this.needsWhitelisting = true;
      } else if (message === 'purchase_not_allowed') {
        this.awaitingFinalApproval = true;
      }
      */
  },
  methods: {
    hasWallets: function () {
      return this.$store.state.currentwallet.wallet
    },
    showingCurrentWallet: function () {
      return this.$router.currentRoute.path === '/wallet'
    },
    route: function (route) {
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
    logout: function () {
      console.log('Logout')
      configManager.logout()
      this.$router.push({path: '/'})
    }
  }
}
</script>

<style>
</style>
