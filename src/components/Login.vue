<template>
  <div class="flex flex-center">
    <q-jumbotron class="flex-center">
      <div class="q-display-3">Transalated Property-&gt; {{ $t('success') }}</div>
      <div class="q-subheading">
        This is a simple hero unit, a simple jumbotron-style component for calling extra
        attention to featured content or information.
      </div>
      <hr class="q-hr q-my-lg">
      <div class="q-title q-mb-md">Check out Quasar Framework components.</div>
      <q-btn color="primary" label="New item" @click="createUser"/>
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
</style>
