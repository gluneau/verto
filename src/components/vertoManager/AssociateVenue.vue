<template>
  <div class="bg-white q-pa-sm">
    <q-jumbotron class="text-center text-primary">
      <div class="text-weight-bold uppercase q-pa-lg">
        <big>{{ $t('VenueAssignAddress.header') }}</big>
      </div>
      {{ $t('CreateVertoPassword.important') }}: {{ $t('VenueAssignAddress.important_info') }}
      <div v-if="emailVerificationRequired">
        <p class="text-red">
          {{ $t('VenueAssignAddress.email_verification_required') }}
        </p>
      </div>
      <div v-if="addressNotUnique">
        <p class="text-red">
          {{ $t('VenueAssignAddress.verto_address_not_unique') }}
        </p>
      </div>
      <div v-if="userDeactivated">
        <p class="text-red">
          {{ $t('VenueAssignAddress.user_deactivated') }}
        </p>
      </div>
       <div v-if="somethingwrong">
        <p class="text-red">
          An unforseen error has occured. Please see your system admin.
        </p>
      </div>
      <q-field
        :error="usernamenull"
        v-bind:error-label="$t('ChangeVertoPassword.required')"
        :count="100"
      >
        <q-input type="text" v-model="venueUserName" color="yellow" v-bind:float-label="$t('VenueAssignAddress.venue_username')"/>
      </q-field>
      <q-field
        :error="wrongCredentials"
        v-bind:error-label="$t('VenueAssignAddress.bad_credentials')"
        :count="100"
      >
        <q-input type="password" v-model="venuePassword" color="yellow" v-bind:float-label="$t('VenueAssignAddress.venue_password')"/>
      </q-field>
      <q-field
        :error="vertoPasswordWrong"
        v-bind:error-label="$t('Welcome.incorrect')"
        :count="100"
        >
            <q-input type="password" v-model="vertopassword" color="yellow" v-bind:float-label="$t('ChangeVertoPassword.current')"/>
        </q-field>
      <br>
      <div class="row gutter-sm justify-center">
        <div class="col-auto">
          <q-btn outline rounded @click="$router.push({path: 'wallet'})">Cancel</q-btn>
        </div>
        <div class="col-auto">
          <q-btn outline rounded color="primary" v-close-overlay v-bind:label="$t('CreateVertoPassword.save')" @click="associateWithVenue"/>
        </div>
      </div>
    </q-jumbotron>
  </div>
</template>

<script>
import configManager from '../../util/ConfigManager'

export default {
  name: 'AssociateVenue',
  data () {
    return {
      vertopassword: '',
      usernamenull: false,
      vertoPasswordWrong: false,
      appVersion: this.$appVersion,
      appName: this.$appName,
      notMatchingPass: false,
      venueUserName: '',
      venuePassword: '',
      fillAllFields: false,
      wrongCredentials: false,
      emailVerificationRequired: false,
      addressNotUnique: false,
      userDeactivated: false,
      somethingwrong: false
    }
  },
  methods: {
    associateWithVenue: function () {
      this.usernamenull = false
      this.wrongCredentials = false
      this.vertoPasswordWrong = false
      this.emailVerificationRequired = false
      this.addressNotUnique = false
      this.userDeactivated = false
      this.somethingwrong = false

      if (this.venueUserName === '') {
        this.usernamenull = true
        return
      }
      if (this.venuePassword === '') {
        this.wrongCredentials = true
        return
      }
      if (this.vertopassword === '') {
        this.vertoPasswordWrong = true
        return
      }
      const result = configManager.getConfig(this.vertopassword)
      if (!result.success) {
        this.vertoPasswordWrong = true
        return
      }
      const self = this
      this.$axios.post(
        process.env.VENUE_URL + '/api/assign-verto-address',
        {
          verto_address: self.$store.state.currentwallet.wallet.key,
          username: self.venueUserName,
          password: self.venuePassword
        }
      ).then(function (res) {
        const result = configManager.addAssociationToWallet(self.$store.state.currentwallet.wallet.key, self.vertopassword, 'Venue', {})
        if (result.success) {
          self.$router.push('/wallet')
        } else {
          console.log(JSON.stringify(result))
          self.somethingwrong = true
        }
      }).catch(function (err) {
        console.log('ERROR: ' + err)
        if (err.response.data.error_code === 'wrong_credentials') {
          self.wrongCredentials = true
        } else if (err.response.data.error_code === 'email_verification_required') {
          self.emailVerificationRequired = true
        } else if (err.response.data.error_code === 'verto_address_not_unique') {
          self.addressNotUnique = true
        } else if (err.response.data.error_code === 'user_deactivated') {
          self.userDeactivated = true
        }
      })
    }
  }
}
</script>

<style>
</style>
