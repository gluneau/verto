<template>
  <div class="layout-padding">
    <div>Begin Get VTX</div>
  </div>
</template>

<script>
import axios from 'axios'
import { scrypt } from 'crypto';

export default {
  data() {
    return {
    };
  },
  mounted() {
    console.log('HERE!!!!!!!!!!!!!!!')
    let url = process.env.CROWDFUND_URL + "/public/api/allocate-native-chain/?verto_public_address=" + this.$store.state.currentwallet.wallet.key;
    console.log('URL: ' + url)
    const router = this.$router;
    axios.get(url).then(function (response) {
      console.log(response.data.message)
      /*
      if (response.data.message === 'wallet_not_whitelisted') {
        router.push({ path: "whitelist" })
      } else if (response.data.message === 'wallet_not_allocated') {
        router.push({ path: "requestnativechainaddress" })
      } else if (response.data.message === 'wallet_allocated') {
        router.push(
          "/getvtx?native_chain_address=" + response.data.data.native_chain_address +
          "&valid_until=" + response.data.data.valid_until +
          "&native_chain_name=" + response.data.data.native_chain_name +
          "&server_time=" + response.data.data.server_time
        )
      } else if (response.data.message === 'purchase_not_allowed') {
        router.push({ path: "notapprovedforpurchase" })
      }
      */
    })
      .catch(function (error) {
        console.log(error);
      });
    
  }
};
</script>
<style>
</style>
