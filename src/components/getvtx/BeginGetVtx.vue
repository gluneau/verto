<template>
  <div class="layout-padding">
    <div>Begin Get VTX</div>
  </div>
</template>

<script>
import getVtxHelper from '../../util/GetVtxHelper'

export default {
  data () {
    return {
    }
  },
  mounted () {
    const router = this.$router
    getVtxHelper.getWalletStatus(this.$store.state.currentwallet.wallet.key, function (response) {
      console.log(response.message)
      if (response.success) {
        if (response.message === 'wallet_not_whitelisted') {
          router.push({ path: 'whitelist' })
        } else if (response.message === 'wallet_not_allocated') {
          router.push({ path: 'requestnativechainaddress' })
        } else if (response.message === 'wallet_allocated') {
          console.log('RESPONSE DATA: ' + JSON.stringify(response.data))
          router.push(
            '/getvtx?native_chain_address=' + response.data.data.native_chain_address +
            '&valid_until=' + response.data.data.valid_until +
            '&native_chain_name=' + response.data.data.native_chain_name +
            '&server_time=' + response.data.data.server_time
          )
        } else if (response.data.message === 'purchase_not_allowed') {
          router.push({ path: 'notapprovedforpurchase' })
        }
      } else {
        console.log('fail')
      }
    })
  }
}
</script>
<style>
</style>
