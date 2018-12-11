<template>
  <div class="hero is-fullheight is-paddingless has-blur-background">
    <div class="hero-head p-t-sm p-l-lg max-width">
      <p class="has-text-centered is-size-1 has-text-white">
        {{ $t('VenueAssignAddress.header') }}
      </p>
      <div class="is-size-5  important-red">
        <b>{{ $t('CreateVertoPassword.important') }}:</b> 
      </div>
      <p class="has-text-white">
        {{ $t('VenueAssignAddress.important_info') }}
      </p>
      <br>
      <div class="field create-password">
        <input v-model="venueUserName" :class="{ 'is-danger' : notMatchingPass }" class="input is-medium" type="text" :placeholder="$t('VenueAssignAddress.venue_username')">
        <input v-model="venuePassword" :class="{ 'is-danger' : notMatchingPass }" class="input m-t-md is-medium" type="password" :placeholder="$t('VenueAssignAddress.venue_password')">
      </div>
      <div v-if="wrongCredentials">
        <p class="has-text-danger m-t-md has-text-centered">
          {{ $t('VenueAssignAddress.bad_credentials') }}
        </p>
      </div>
      <div v-if="fillAllFields">
        <p class="has-text-danger m-t-md has-text-centered">
          {{ $t('ChangeVertoPassword.required') }}
        </p>
      </div>
      <div v-if="emailVerificationRequired">
        <p class="has-text-danger m-t-md has-text-centered">
          {{ $t('VenueAssignAddress.email_verification_required') }}
        </p>
      </div>
      <div v-if="addressNotUnique">
        <p class="has-text-danger m-t-md has-text-centered">
          {{ $t('VenueAssignAddress.verto_address_not_unique') }}
        </p>
      </div>
      <div v-if="userDeactivated">
        <p class="has-text-danger m-t-md has-text-centered">
          {{ $t('VenueAssignAddress.user_deactivated') }}
        </p>
      </div>
      <div class="has-text-centered">
          <a class="button is-primary m-t-md is-size-5 green" @click="associateWithVenue">
            <p class="p-l-sm p-r-sm is-size-7 font-gibson-semibold second">{{ $t('CreateVertoPassword.save') }}</p>
          </a>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      appVersion: this.$appVersion,
      appName: this.$appName,
      notMatchingPass: false,
      venueUserName: "",
      venuePassword: "",
      fillAllFields: false,
      wrongCredentials: false,
      emailVerificationRequired: false,
      addressNotUnique: false,
      userDeactivated: false,
      blocktopusUrl: process.env.BLOCKTOPUS_URL + '/token_buyers/sign_up?verto_public_address=' + this.$store.state.currentWallet.key
    };
  },
  mounted() {
  },
  methods: {
    associateWithVenue: function() {
      this.fillAllFields = false;
      this.wrongCredentials = false;
      if (this.venueUserName === "" || this.venuePassword === "") {
        this.fillAllFields = true;
        return;
      }
      const self = this;
      axios.post(
        process.env.VENUE_URL + "/api/assign-verto-address/",
        {
          verto_address: self.$store.state.currentWallet.key,
          username: self.venueUserName,
          password: self.venuePassword
        }
      ).then(function(res) {
        self.$router.push("congratsscreen");
      }).catch(function(err) {
        if (err.response.data.error_code === "wrong_credentials") {
          self.wrongCredentials = true;
        } else if (err.response.data.error_code === "email_verification_required") {
          self.emailVerificationRequired = true;
        } else if (err.response.data.error_code === "verto_address_not_unique") {
          self.addressNotUnique = true;
        } else if (err.response.data.error_code === "user_deactivated") {
          self.userDeactivated = true;
        }
      });
    },
    checkBlocktopus: function() {
      console.log(this.blocktopusUrl)
      console.log(__dirname)
    },
    openTelegram: function() {
      var open = require("open");
      open("http://t.me/volentix");
    },
    logout: function() {
      this.$store.dispatch("login", false);
      this.$store.dispatch("setKeys", []);
      this.$router.push({ path: "welcome" });
    }
  }
};
</script>
<style>
.settings-list span:hover {
  color: hsl(171, 100%, 41%) !important;
  cursor: pointer;
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
.copy-button {
  width: 100%;
}
.has-blur-background {
  background-image: url(~@/assets/img/transaction-back-screen.jpg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.has-text-aqua {
  color: #2cfee6;
}
.size-smaller {
  font-size: 0.75rem;
}
.is-vcentered {
  align-items: center;
}
.line-height-md {
  line-height: 1rem;
}
.list-item {
  border-bottom: solid 1px rgba(55, 202, 189, 0.3);
}
.hero-foot {
  border-top: solid 1px rgba(55, 202, 189, 0.3);
}
</style>
