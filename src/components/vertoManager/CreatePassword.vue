<template>
  <div class="flex fit flex-center q-pa-sm">

    <q-jumbotron class="text-center text-white">
      <div class="text-weight-bold uppercase q-pa-lg">
        <big>{{ $t('CreateVertoPassword.header') }}</big>
      </div>


      <q-card inline style="width: 700px" class="full-height text-left">
        <q-card-separator />
          <q-list>
            <div class="text-left q-pa-lg">
                <q-icon name="warning" size="3rem" color="yellow"/>
                <div class="text-weight-bold uppercase text-yellow">
                  {{ $t('CreateVertoPassword.important') }}:
                </div>
                <div>
                  {{ $t('CreateVertoPassword.important_warning') }}
                </div>
            </div>
            <div class="text-left q-pa-lg text-white">
              <q-field
                :error="passHasError"
                error-label="Password Cannot Be Null"
                :count="100"
              >
                <q-input type="password" dark v-model="password" color="yellow" float-label="Verto Password"/>
              </q-field>
              <q-field
                :error="doesNotMatch"
                error-label="Passwords do not match"
                :count="100"
              >
                <q-input type="password" dark v-model="confirmPassword" color="yellow" float-label="Confirm Verto Password"/>
              </q-field>
            </div>
            <div class="text-left q-pa-lg">
              <q-checkbox v-model="checked" color="yellow">&nbsp;{{ $t('CreateVertoPassword.i_understand') }}</q-checkbox>
            </div>
            <div class="text-right q-pa-lg">
              <q-btn color="yellow" outline rounded @click="submit">Submit</q-btn>
            </div>
          </q-list>
      </q-card>
    </q-jumbotron>
  </div>
</template>

<script>
import configManager from '../../util/ConfigManager'

export default {
  // name: 'ComponentName',
  data () {
    return {
      password: '',
      confirmPassword: '',
      passHasError: false,
      doesNotMatch: false,
      checked: false
    }
  },
  methods: {
    submit: function() {
      this.doesNotMatch = false
      this.passHasError = false
      if (this.password.length > 0) {
        if (this.password === this.confirmPassword) {
          configManager.createWallet(this.$router, this.password)
        } else {
          this.doesNotMatch = true;
        }
      } else {
        this.passHasError = true;
      }
      // this.$router.push({path: 'walletBalance'})
    }
  }
}
</script>

<style>
input { color: 'white'; }
</style>
