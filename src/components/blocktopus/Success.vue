<template>
  <div class="fixed-center text-center bg-primary">
    <p>
      <img
        src="~assets/img/congrats.png"
        style="width:30vw;max-width:150px;"
      >
    </p>
    <p class="text-white">Update Verto Configuration With This Association<strong></strong></p>
    <div class="text-left q-pa-sm text-white">
        <q-field
        :error="passHasError"
        v-bind:error-label="$t('Welcome.incorrect')"
        :count="100"
        >
            <q-input type="password" dark v-model="password" color="yellow" v-bind:float-label="$t('ChangeVertoPassword.current')"/>
        </q-field>
    </div>
    <div class="text-left q-pa-lg text-white">
        <q-btn
        color="secondary"
        style="width:200px;"
        @click="$router.push('/wallet')"
        >NotNow</q-btn>
        <q-btn color="yellow" outline rounded @click="submit">Submit</q-btn>
    </div>
    <q-modal v-model="modal" minimized ref="modalRef">
      <div style="padding: 50px" class="text-center">
        <div class="q-display-1 q-mb-md">Unknown Error</div>
        <div class="q-pa-sm">
          Please contact the group on Telegram
        </div>
        <div class="q-pa-sm">
          <q-btn outline rounded  @click="ok">OK</q-btn>
        </div>
      </div>
    </q-modal>
  </div>
</template>

<script>
import configManager from '../../util/ConfigManager'

export default {
  name: 'Blocktopus Congrats',
  data () {
    return {
      password: '',
      passHasError: false,
      modal: false
    }
  },
  methods: {
    submit: function () {
      console.log('Submitting')
      this.passHasError = false
      const result = configManager.addAssociationToWallet(this.$store.state.currentwallet.wallet.key, this.password, 'Blocktopus', {})
      if (result.success) {
        this.$router.push('/wallet')
      } else if (result.message === 'bad_password') {
        this.passHasError = true
      } else {
        this.modal = true
      }
    },
    ok: function () {
      this.$router.push({path: '/wallet'})
    }
  }
}
</script>
