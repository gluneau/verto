<template>
  <div class="flex fit flex-center q-pa-sm">

    <q-jumbotron class="text-center bg-primary text-white">
      <div class="text-weight-bold uppercase q-pa-lg">
        <big>{{ $t('ChoosePassword.header') }}</big>
      </div>
      <q-card inline style="width: 700px" class="text-left">
        <q-card-separator />

          <q-list>
            <div class="text-left q-pa-lg">
                <q-icon name="warning" size="3rem" color="yellow"/>
                <div class="text-weight-bold uppercase text-yellow">
                  {{ $t('CreateVertoPassword.important') }}:
                </div>
                <div class="q-pa-sm">
                  {{ $t('CreateVertoPassword.important_warning') }}
                </div>
                <div class="q-pa-sm">
                  <q-field
                    :error="errors.walletNameEmpty"
                    error-label="Wallet Name is Required"
                    :count="100"
                  >
                    <q-input v-model="walletName" :error="errors.walletNameEmpty" dark color="yellow" float-label="Give Wallet A Name. ie: Savings"  />
                  </q-field>
                </div>
                <div class="q-pa-sm">
                  <q-field
                    :error="errors.vertoPasswordEmpty"
                    error-label="Wallet Name Is Required."
                    :count="100"
                  >
                    <q-input v-model="password" type="password" :error="errors.passwordEmpty" dark color="yellow" float-label="Choose Wallet Passwords" />
                  </q-field>
                </div>
                <div class="q-pa-sm">
                  <q-field
                    :error="errors.vertoPasswordEmpty"
                    error-label="Passwords Do Not Match"
                    :count="100"
                  >
                    <q-input v-model="confirmPassword" type="password" :error="errors.passwordsDontMatch" dark color="yellow" float-label="Confirm Wallet Password" />
                  </q-field>
                </div>
                <div class="q-pa-sm">
                  <q-field
                    :error="errors.vertoPasswordEmpty"
                    error-label="Verto Password Required"
                    :count="100"
                  >
                    <q-input v-model="vertoPassword" type="password" :error="errors.vertoPasswordEmpty" dark color="yellow" float-label="Verto Password" />
                  </q-field>
                </div>
                <div class="q-pa-md">
                  <q-field
                    helper=""
                    :error="errors.iunderstandFalse"
                    error-label="Please Agree Before Continuing"
                    :count="10"
                  >
                     <q-checkbox v-model="iunderstand" :error="errors.iunderstandFalse" dark  color="yellow">&nbsp;{{ $t('DisplayKey.understand') }}</q-checkbox>
                  </q-field>

                </div>
                <div class="text-right q-pa-lg">
                  <q-btn  color="yellow" outline rounded @click="submit">{{ $t('SaveYourKeys.create') }}</q-btn>
                </div>
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
      privateKey: '',
      publicKey: '',
      walletName: '',
      password: '',
      confirmPassword: '',
      vertoPassword: '',
      errors: {
        walletNameEmpty: false,
        passwordEmpty: false,
        passwordsDontMatch: false,
        vertoPasswordEmpty: false,
        iunderstandFalse: false
      },
      iunderstand: false,
      iunderstandFalse: false
    }
  },
  mounted () {
    const ecc = require('eosjs-ecc')
    ecc.randomKey().then(privateKey => {
      this.privateKey = privateKey
      this.publicKey = ecc.privateToPublic(privateKey)
    })
  },
  methods: {
    resetErrors () {
      this.errors.walletNameEmpty = false
      this.errors.passwordEmpty = false
      this.errors.passwordsDontMatch = false
      this.errors.vertoPasswordEmpty = false
      this.errors.iunderstandFalse = false
    },
    hasError: function () {
      // let hasError = false
      if (!this.walletName) {
        this.errors.walletNameEmpty = true
        return true
      }
      if (!this.password) {
        this.errors.passwordEmpty = true
        return true
      }
      if (!this.confirmPassword || this.password !== this.confirmPassword) {
        this.errors.passwordsDontMatch = true
        return true
      }
      if (!this.vertoPassword) {
        this.errors.vertoPasswordEmpty = true
        return true
      }
      if (!this.iunderstand) {
        this.errors.iunderstandFalse = true
        return true
      }
    },
    submit: function () {
      console.log('Submitting')
      this.resetErrors()
      if (this.hasError()) {
        return
      }
      const { dialog } = require('electron').remote
      var savePath = dialog.showSaveDialog({
        title: this.$t('ChoosePassword.file')
      })
      const result = configManager.saveWalletAndKey(this.walletName, this.vertoPassword, this.password, this.publicKey, this.privateKey, savePath)
      if (result.success) {
        this.$router.push('wallet')
      } else {
        console.log(result.message)
      }
    }
  }
}
</script>

<style>
</style>
