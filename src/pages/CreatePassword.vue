<template>
  <q-page class="flex flex-center bg-blue-grey-10 text-white">
    <div class="row flex-center text-center">
      <div class="col-12">
        <div class="text-weight-bold uppercase q-pa-lg">
          <big>{{ $t('CreateVertoPassword.header') }}</big>
        </div>
      </div>

      <div class="col-12 flex flex-center">
        <q-card class="bg-dark" style="max-width: 700px;">
          <q-card-main class="text-left">
            <q-list no-border>
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
          </q-card-main>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import configManager from '@/util/ConfigManager'

export default {
  name: 'CreatePassword',
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
    submit: function () {
      this.doesNotMatch = false
      this.passHasError = false
      if (!this.password) return (this.passHasError = true)
      if (this.password !== this.confirmPassword) return (this.doesNotMatch = true)
      configManager.createWallet(this.password)
        .then(() => this.$router.replace('keep-your-keysafe'))
    }
  }
}
</script>

<style lang="stylus" scoped>
  input
    color white
</style>
