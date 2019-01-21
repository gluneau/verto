<template>
  <q-page class="flex flex-center text-white bg-main">
    <q-card style="max-width: 700px;" flat>
      <q-card-title class="text-weight-bold">
        <big class="titillium">{{ $t('ChangeVertoPassword.header') }}</big>
      </q-card-title>
      <q-card-main class="text-left">
        <q-field
          :error="vertoPasswordWrong"
          v-bind:error-label="$t('Welcome.incorrect')"
          :count="100"
        >
            <q-input type="password" v-model="originalPassword" dark color="yellow" v-bind:float-label="$t('ChangeVertoPassword.current')"/>
        </q-field>
        <br>
        <hr style="height:1px; border:none; color:blue; background-color:blue;">
        <q-field
          :error="newPasswordNull"
          v-bind:error-label="$t('ChangeVertoPassword.required')"
          :count="100"
        >
            <q-input type="password" v-model="userPassword" dark color="yellow" v-bind:float-label="$t('ChangeVertoPassword.new')"/>
        </q-field>
        <q-field
          :error="newPasswordDontMatch"
          v-bind:error-label="$t('CreateVertoPassword.mustmatch')"
          :count="100"
        >
            <q-input type="password" v-model="checkPassword" dark color="yellow" v-bind:float-label="$t('ChangeVertoPassword.confirm')"/>
        </q-field>

        <div class="row gutter-sm justify-center">
          <div class="col-auto">
            <q-btn outline rounded @click="$router.push({path: 'wallet'})">Cancel</q-btn>
          </div>
          <div class="col-auto">
            <q-btn outline rounded v-bind:label="$t('CreateVertoPassword.save')" @click="submit"/>
          </div>
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
      userPassword: '',
      checkPassword: '',
      originalPassword: '',
      vertoPasswordWrong: false,
      newPasswordNull: false,
      newPasswordDontMatch: false
    }
  },
  methods: {
    submit: function () {
      this.vertoPasswordWrong = false
      this.newPasswordNull = false
      this.vertoPasswordWrong = false
      if (!this.originalPassword) {
        this.vertoPasswordWrong = true
        return
      }
      if (!this.userPassword) {
        this.newPasswordNull = true
        return
      }
      if (this.userPassword !== this.checkPassword) {
        this.newPasswordDontMatch = true
        return
      }
      const result = this.$configManager.changeVertoPassword(this.originalPassword, this.userPassword)
      if (!result.success) {
        this.vertoPasswordWrong = true
      } else {
        this.$router.push({path: 'wallet'})
      }
    }
  }
}
</script>

<style>
</style>
