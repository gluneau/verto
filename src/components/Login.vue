<template>
  <div>
    <q-jumbotron class="text-center bg-primary text-white">
      <div class="logo-welcome">
        <img src="../assets/img/white-logo-with-text.png" >
      </div>
      <div class="q-pa-lg">
        <small>{{ $t('Welcome.subtitle_message') }}</small>
      </div>
      <div class="text-weight-bold uppercase q-pa-lg">
        <big>{{ $t('Welcome.join_message') }}</big>
      </div>
      <div v-if="hasConfig">
        <q-field
          :error="passHasError"
          v-bind:error-label="$t('Welcome.incorrect')"
          :count="100"
        >
          <q-input type="password" dark v-model="password" color="yellow" v-bind:float-label="$t('Welcome.password')"/>
        </q-field>
        <div class="q-pa-lg">
          <q-btn outline rounded  @click="login">{{ $t('Welcome.login') }}</q-btn>
        </div>
      </div>
      <div v-else>
        <q-btn outline rounded  @click="createUser">{{ $t('Welcome.create') }}</q-btn>
      </div>
    </q-jumbotron>
  </div>

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
  mounted() {
    this.hasConfig = configManager.hasVertoConfig()
    console.info(process.env)
  },
  methods: {
    login() {
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
      this.$router.push({path: 'createPassword'})
    }
  }
}
</script>

<style>
.logo-welcome img {
  width: 100%;
  max-width: 20rem;
}
</style>
