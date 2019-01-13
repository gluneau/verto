<template>
  <div class="flex fit bg-secondary flex-center">

    <q-jumbotron class="flex-center">
      <q-field
        icon="vpn_key"
        label="Password"
        helper="Helper"
        :error="passHasError"
        error-label="Password Cannot Be Null"
        :count="100"
      >
        <q-input v-model="password" />
      </q-field>
      <q-field
        icon="vpn_key"
        label="Confirm Password"
        helper="Helper"
        :error="doesNotMatch"
        error-label="Passwords do not match"
        :count="100"
      >
        <q-input v-model="password" />
      </q-field>
      <q-btn color="primary" @click="submit">Submit</q-btn>
    </q-jumbotron>
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {
      password: '',
      passHasError: false,
      doesNotMatch: false
    }
  },
  methods: {
    submit: function() {
      this.$router.push({path: 'walletBalance'})
    }
  }
}
</script>

<style>
</style>
