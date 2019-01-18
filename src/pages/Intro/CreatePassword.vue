<template>
<q-page class="flex flex-center text-white bg-main">
  <q-card style="max-width: 700px;" flat>
    <q-card-title class="text-weight-bold">
      <big class="titillium">{{ $t('CreateVertoPassword.header') }}</big>
    </q-card-title>
    <q-card-main class="text-left">
      <div class="text-left q-py-lg">
        <span class="display-inline text-yellow">
          <q-icon name="error" size="1.2rem" color="yellow" class="q-mr-xs q-mb-sm"/>
          <span class="q-title">
            {{ $t('CreateVertoPassword.important') }}:
          </span>
        </span>
        <span class="q-subheading">
          {{ $t('CreateVertoPassword.important_warning') }}
        </span>
      </div>
      <div class="text-left q-py-lg text-white">
        <q-field :error="passHasError" error-label="Password Cannot Be Null" :count="100" >
          <q-input type="password" dark v-model="password" color="yellow" float-label="Verto Password"/>
        </q-field>
        <q-field :error="doesNotMatch" error-label="Passwords do not match" :count="100" >
          <q-input type="password" dark v-model="confirmPassword" color="yellow" float-label="Confirm Verto Password"/>
        </q-field>
      </div>
      <div class="text-left q-py-lg">
        <q-checkbox v-model="checked" color="yellow">&nbsp;{{ $t('CreateVertoPassword.i_understand') }}</q-checkbox>
      </div>
      <div class="text-right q-py-lg">
        <q-btn color="yellow" outline rounded @click="submit">Submit</q-btn>
      </div>
    </q-card-main>
  </q-card>
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
        .then(() => this.$router.replace('/keep-your-key-safe'))
    }
  }
}
</script>

<style lang="stylus" scoped>
  input
    color white
</style>
