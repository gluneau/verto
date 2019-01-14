<template>
  <div class=" ">
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
      <q-btn outline rounded  @click="createUser">{{ $t('Welcome.create') }}</q-btn>
    </q-jumbotron>
  </div>
  
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {}
  },
  methods: {
    createUser () {
      this.$router.push({path: 'createPassword'})
    }
  }
}
</script>

<style>
.logo-welcome img {
  width: 100%;
  max-width: 320px;
}
</style>
