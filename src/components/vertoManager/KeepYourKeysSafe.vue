<template>
  <div class="flex fit bg-secondary flex-center">

    <q-jumbotron class="text-center bg-primary text-white">
      <div class="text-weight-bold uppercase q-pa-lg">
        <big>{{ $t('KeepYourKeysSafe.keepsafe') }}</big>
      </div>
      
    </q-jumbotron>
  </div>
</template>

<script>
import configManager from '../../util/ConfigManager'

export default {
  // name: 'ComponentName',
  data () {
    return {}
  },
  methods: {
    
  }
}
</script>

<style>
input { color: 'white'; }
</style>
