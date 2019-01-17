<template>
<q-page class="flex flex-center bg-blue-grey-10 text-white">
  <q-card class="bg-dark q-pa-lg">
    <q-card-main>
       <div class="text-center">
        <div class="logo-welcome">
          <img src="../assets/img/white-logo-with-text.png" >
        </div>
        <div class="q-mb-lg">
          <small class="titillium" style="letter-spacing 0.2rem">{{ $t('Welcome.subtitle_message') }}</small>
        </div>
        <div class="flex flex-center">
        <div class="text-weight-bold uppercase q-pa-lg" style="max-width: 15rem; font-size: 2rem;">
          <div class="titillium">{{ $t('Welcome.join_message') }}</div>
        </div>
        </div>
        <div v-if="hasConfig">
          <q-field :error="passHasError" v-bind:error-label="$t('Welcome.incorrect')" :count="100" >
            <q-input type="password" dark v-model="password" color="yellow" v-bind:float-label="$t('Welcome.password')"/>
          </q-field>
          <div class="q-pa-lg">
            <q-btn outline rounded  @click="login">{{ $t('Welcome.login') }}</q-btn>
          </div>
        </div>
        <div v-else class="q-pt-lg">
          <q-btn outline rounded dense @click="createUser" style="min-width: 150px;">{{ $t('Welcome.create') }}</q-btn>
        </div>
      </div>
    </q-card-main>
  </q-card>
</q-page>
</template>

<script>
import configManager from '../util/ConfigManager'

export default {
  name: 'Login',
  data () {
    return {
      hasConfig: '',
      passHasError: false,
      password: ''
    }
  },
  mounted () {
    this.hasConfig = configManager.hasVertoConfig()
    console.info(process.env)
  },
  methods: {
    login () {
      this.passHasError = false
      if (!this.password) {
        this.passHasError = true
        return
      }
      const results = configManager.login(this.password)
      if (results.success) {
        this.$router.push({path: 'wallet'})
      } else {
        if (results.message === 'no_default_key') {
          this.$router.push({path: 'vertomanager'})
        } else {
          this.passHasError = true
        }
      }
    },
    createUser () {
      // createPassword
      this.$router.push({name: 'create-password'})
    }
  }
}
</script>

<style lang="stylus" scoped>
.logo-welcome
  width 100%
  max-width 250px
  margin 0 auto
  img
    width 100%

</style>
