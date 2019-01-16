<template>
  <div class="layout-padding">
    <div>Begin Get VTX</div>
  </div>
</template>

<script>
import getVtxHelper from '../../util/GetVtxHelper';

export default {
  data() {
    return {
    };
  },
  mounted() {
    const self = this
    getVtxHelper.getWalletStatus(this.$store.state.currentwallet.wallet.key, function(response){
      console.log(response.message)
      if (response.success) {
        console.log('success')
        self.$router.push({path: '/requestNativeChainAddress'})
      } else {
        console.log('fail')
      }
    })
  }
};
</script>
<style>
</style>
