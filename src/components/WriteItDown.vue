<template>
  <q-page class="flex flex-center text-white bg-main">
    <q-card style="max-width: 700px;" flat>
      <q-card-title class="text-weight-bold">
        <big class="titillium">{{ $t('DisplayKey.header') }}</big>
      </q-card-title>
      <q-card-main class="text-left">
        Private Key: {{ privateKey }}
        <br>
        Public Key: {{ publicKey }}
        <div class="q-py-xs">
          <q-field :error="errors.walletNameEmpty" error-label="Wallet Name is Required" :count="100" >
            <q-input v-model="walletName" :error="errors.walletNameEmpty" dark color="yellow" float-label="Give Wallet A Name. ie: Savings"  />
          </q-field>
        </div>
        <div class="q-py-xs">
          <q-field :error="errors.vertoPasswordEmpty" error-label="Wallet Name Is Required." :count="100" >
            <q-input v-model="vertoPassword" type="password" :error="errors.vertoPasswordEmpty" dark color="yellow" float-label="Choose Wallet Passwords" />
          </q-field>
        </div>
        <div class="q-pt-md">
          <q-field helper="" :error="errors.iunderstandFalse" error-label="Please Agree Before Continuing" >
              <q-checkbox v-model="iunderstand" :error="errors.iunderstandFalse" dark  color="yellow">&nbsp;{{ $t('DisplayKey.understand') }}</q-checkbox>
          </q-field>
        </div>
        <div class="text-right q-pt-md">
          <q-btn  color="yellow" outline rounded dense style="min-width: 150px;" @click="submit">{{ $t('SaveYourKeys.create') }}</q-btn>
        </div>
      </q-card-main>
    </q-card>
  </q-page>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {
      isEnabled: false,
      checkedAnswers: 0,
      isKeyModalActive: false,
      privateKey: '',
      publicKey: '',
      requiredText: this.$t('DisplayKey.copied'),
      textInput: '',
      clicked: false,
      keynameempty: false,
      keyalreadyused: false,
      walletName: '',
      vertoPassword: '',
      incorrectPassword: false,
      isInstructionsActive: false,
      showPrivate: true,
      showPublic: true,
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
    this.generateKeys()
  },
  methods: {
    resetErrors: function () {
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
      if (!this.vertoPassword) {
        this.errors.vertoPasswordEmpty = true
        return true
      }
      if (!this.iunderstand) {
        this.errors.iunderstandFalse = true
        return true
      }
    },
    generateKeys () {
      const ecc = require('eosjs-ecc')
      ecc.randomKey().then(privateKey => {
        this.privateKey = privateKey
        this.publicKey = ecc.privateToPublic(privateKey)
      })
    },
    submit: function () {
      this.resetErrors()
      if (this.hasError()) {
        return
      }
      console.log('Submitting....')
      const result = this.$configManager.saveWalletAndKey(this.walletName, this.vertoPassword, null, this.publicKey, this.privateKey, null)
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
