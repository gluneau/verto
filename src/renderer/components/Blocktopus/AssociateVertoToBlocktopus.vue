<template>
  <section class="has-background-darkgreen">
    <iframe id="blocktopusiframe" :src="blocktopusLink"/>
  </section>
</template>

<script>
import sjcl from "sjcl"
import EventBus from '../../bus'

export default {
  data() {
    return {
      username: "",
      email: "",
      amount: 0,
      currency: 'BTC',
      blocktopusLink: process.env.BLOCKTOPUS_URL + '/token_buyers/sign_in?verto_public_address=' + this.$store.state.currentWallet.key
    };
  },
  beforeMount() {
    EventBus.addListener(this.callback)
  },
  destroyed() {
    EventBus.removeListener(this.callback)
  },
  methods: {
    signup: function() {
      this.$router.push("walletmanager")
    },
    callback: function(e) {
      if (e.data && (typeof e.data === 'string' || e.data instanceof String)) {
        if (e.data.startsWith('success')) {
          this.$router.push({ path: "blocktopussuccesssful" })
        } else if (e.data.startsWith('cancel')) {
          this.$router.push({ path: "main" })
        } else if (e.data.startsWith('error')) {
          this.$router.push({ path: "kycalreadyassociated" })
        }
      }
    }
  }
};
</script>

<style scoped>
.hero-body.choose-password {
  background-color: #f7f7fa !important;
}
.hero-body.choose-password .font-gibson-semibold {
  color: #454f63;
}
.hero-body.choose-password .font-gibson {
  color: #78849e;
  font-size: 11pt;
}
.hero-body.choose-password .button.green {
  background-color: #00a6a6 !important;
  border: solid #00a6a6 1pt !important;
  border-radius: 0.5rem;
}
.hero-body.choose-password .choose-file {
  border-radius: 0.5rem;
}
.hero-body.choose-password .button.green p {
  color: #ffffff !important;
}
.b-checkbox {
  margin-top: 0.6rem;
}
.hero-body.choose-password input {
  border-radius: 0.5rem;
}
#blocktopusiframe
{
    height:   100%;
    left:     0px;
    position: absolute;
    top:      0px;
    width:    100%;
}
</style>
