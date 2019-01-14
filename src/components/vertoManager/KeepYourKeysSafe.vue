<template>
  <div class="flex fit bg-secondary flex-center q-pa-sm">

    <q-jumbotron class="text-center bg-secondary text-white">
      <div class="text-weight-bold uppercase q-pa-lg">
        <big>{{ $t('KeepYourKeysSafe.keepsafe') }}</big>
      </div>

      <q-card inline style="width: 700px" class="text-left">
        <q-card-separator />
        
          <q-list>
            <q-collapsible icon="explore" label="Know More">
              <div class="q-pa-sm">
                {{ $t('KeepYourKeysSafe.before') }}
              </div>
              <div class="q-pa-sm">
                {{ $t('KeepYourKeysSafe.choices') }}
              </div>
              <div class="q-pa-sm">
                {{ $t('KeepYourKeysSafe.first') }}
              </div>
              <div class="q-pa-sm">
                {{ $t('KeepYourKeysSafe.second') }}
              </div>
              <div class="q-pa-sm">
                {{ $t('SaveYourKeys.strategy') }}
              </div>
              <div class="q-pa-sm">
                <p v-html="$t('SaveYourKeys.physical')"></p>
              </div>
              <div class="q-pa-sm">
                <p v-html="$t('SaveYourKeys.legacy')"></p>
              </div>
            </q-collapsible>
          </q-list>
          <div class="q-pa-sm">
            <div class="q-pa-sm">
              <q-checkbox v-model="checkOne" native-value="first" color="yellow">&nbsp;{{ $t('SaveYourKeys.agree') }}</q-checkbox>
              <q-checkbox v-model="checkTwo" native-value="second" color="yellow">&nbsp;{{ $t('SaveYourKeys.responsible') }}</q-checkbox>
              <q-checkbox v-model="checkThree" native-value="second" color="yellow">&nbsp;{{ $t('SaveYourKeys.access') }}</q-checkbox>
              <q-checkbox v-model="checkFour" native-value="second" color="yellow">&nbsp;{{ $t('SaveYourKeys.wifi') }}</q-checkbox>
            </div>
          </div>
          <div class="q-pa-sm">
            <div class="q-pa-sm">
              <q-select
                dark
                color="white"
                separator
                v-model="select"
                :options="options"
              />
            </div>
          </div>
      </q-card>

      
    </q-jumbotron>
  </div>
</template>

<script>
import configManager from '../../util/ConfigManager'

export default {
  // name: 'ComponentName',
  data () {
    return {
      checkOne: false,
      checkTwo: false,
      checkThree: false,
      checkFour: false,
      createtype: "FILE",
      buttonsAreDisabled: true,
      quizOptions: 0,
      select: '',
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
    disableWiFi() {
      if (!this.buttonsAreDisabled) {
        let command = "networksetup -setairportpower airport off";
        let exec = require("child_process").exec;
        exec(command);
        if (this.createtype === 'FILE') {
          this.$router.push('/choosepassword');
        } else {
          this.$router.push('/displaykey');
        }
      }
    }
    
  }
}
</script>

<style>
</style>
