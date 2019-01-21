<template>
<q-page class="flex flex-center text-white bg-main">
  <q-card style="max-width: 700px;" flat>
    <q-card-title class="text-weight-bold">
      <big class="titillium">{{ $t('KeepYourKeysSafe.keepsafe') }}</big>
    </q-card-title>
    <q-card-main class="text-left">
      <div class="q-py-sm">
        {{ $t('KeepYourKeysSafe.before') }}
      </div>
      <q-collapsible icon="explore" label="Learn More">
        <div class="q-py-sm">
          {{ $t('KeepYourKeysSafe.choices') }}
        </div>
        <div class="q-py-sm">
          {{ $t('KeepYourKeysSafe.first') }}
        </div>
        <div class="q-py-sm">
          {{ $t('KeepYourKeysSafe.second') }}
        </div>
        <div class="q-py-sm">
          {{ $t('SaveYourKeys.strategy') }}
        </div>
        <div class="q-py-sm">
          <p v-html="$t('SaveYourKeys.physical')"></p>
        </div>
        <div class="q-py-sm">
          <p v-html="$t('SaveYourKeys.legacy')"></p>
        </div>
      </q-collapsible>
      <div class="q-py-sm">
        <div class="q-py-sm">
          <q-checkbox v-model="checkOne" native-value="first" color="yellow">&nbsp;{{ $t('SaveYourKeys.agree') }}</q-checkbox>
          <q-checkbox v-model="checkTwo" native-value="second" color="yellow">&nbsp;{{ $t('SaveYourKeys.responsible') }}</q-checkbox>
          <q-checkbox v-model="checkThree" native-value="second" color="yellow">&nbsp;{{ $t('SaveYourKeys.access') }}</q-checkbox>
          <q-checkbox v-model="checkFour" native-value="second" color="yellow">&nbsp;{{ $t('SaveYourKeys.wifi') }}</q-checkbox>
        </div>
      </div>
      <div class="q-pa-sm">
        <div class="q-py-sm">
          <q-select dark color="white" separator v-model="createtype" :options="options" />
        </div>
        <div class="text-right q-pa-lg">
          <q-btn color="yellow" outline rounded @click="submit">{{ $t('SaveYourKeys.create') }}</q-btn>
        </div>
      </div>
    </q-card-main>
  </q-card>
</q-page>
</template>

<script>
// import configManager from '@/util/ConfigManager'

export default {
  // name: 'ComponentName',
  data () {
    return {
      checkOne: false,
      checkTwo: false,
      checkThree: false,
      checkFour: false,
      createtype: 'FILE',
      buttonsAreDisabled: true,
      quizOptions: 0,
      options: [
        {
          label: 'Save To File',
          value: 'FILE'
        },
        {
          label: 'Write It Down',
          value: 'WRITTEN'
        }
      ]
    }
  },
  methods: {
    isDisabled: function () {
      return !this.checkOne || !this.checkTwo || !this.checkThree || !this.checkFour
    },
    submit () {
      // if (this.checkOne && this.checkTwo && this.checkThree && this.checkFour) {
      let command = 'networksetup -setairportpower airport off'
      let exec = require('child_process').exec
      exec(command)
      if (this.createtype === 'FILE') {
        this.$router.push('save-to-file')
      } else {
        this.$router.push('writeItDown')
      }
    }
  }
}
</script>

<style>
</style>
