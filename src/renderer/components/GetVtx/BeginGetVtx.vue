<template>
  <div class="hero is-fullheight is-paddingless has-blur-background">
    <div class="hero-head p-t-sm">
      <div class="p-l-lg m-t-md">
        <div class="is-pulled-left is-vcentered is-flex m-t-md">
          <router-link to="/main">
            <font-awesome-icon icon="arrow-left" class="fa-sm has-text-white m-l-sm"/>
          </router-link>
        </div>
        <img src="~@/assets/img/verto-logo-white.png" class="logo m-l-md p-t-sm p-l-sm p-r-sm">
      </div>
      <div class="field">
        <div class="control p-md has-text-centered">
          <div class="container has-text-white p-md">
            {{ $t('BeginGetVtx.header') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
    };
  },
  mounted() {
    this.$router.push({ path: "notwhitelisted" })
    /**/
    //
    //               KEEP the logic below as it will be uncommented once the Get Vtx is finalized.
    //
    let url = process.env.CROWDFUND_URL + "/public/api/allocate-native-chain/?verto_public_address=" + this.$store.state.currentWallet.key;
    const router = this.$router;
    axios.get(url).then(function (response) {
      if (response.data.message === 'wallet_not_whitelisted') {
        router.push({ path: "notwhitelisted" })
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
    })
      .catch(function (error) {
        console.log(error);
      });
  },
  methods: {
  },
  created: function() {
  }
};
</script>

<style scoped>
.button {
  border-radius: 0.6rem;
  width: 9rem;
}
input {
  border-radius: 0.7rem;
}
.is-size-custom-header {
  font-size: 1.7rem;
}
.logo {
  height: 3.3rem;
  border-top: solid 0.2rem rgba(55, 202, 189, 0.3);
}
.is-size-vtx-amount {
  font-size: 2.7rem;
}
.has-blur-background {
  background-image: url(~@/assets/img/transaction-back-screen.jpg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>
