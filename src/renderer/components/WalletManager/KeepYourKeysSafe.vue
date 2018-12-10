<template>
  <section>
    <div class="hero-body has-background-darkgreen has-text-white has-blur-background">
      <div class="has-text-centered">
        <div class="has-text-centered is-size-1 has-text-white">{{ $t('KeepYourKeysSafe.keepsafe') }}</div>
        <br>
        <img src="~@/assets/img/saveKeys.png">
      </div>
      <div class="container font-gibson body-text">
        <p class="m-t-sm">
          {{ $t('KeepYourKeysSafe.before') }}
        </p>
        <br>
        <p>
          {{ $t('KeepYourKeysSafe.choices') }}
        </p>
        <ol class="m-l-md">
          <li>
            {{ $t('KeepYourKeysSafe.first') }}
          </li>
          <li>
            {{ $t('KeepYourKeysSafe.second') }}
          </li>
        </ol>
        <p class="m-t-sm">
          {{ $t('SaveYourKeys.strategy') }}
        </p>
        <br>
        <p v-html="$t('SaveYourKeys.physical')"></p>
        <br>
        <p v-html="$t('SaveYourKeys.legacy')"></p>
        <br>
        <div class="p-l-sm">
          <b-checkbox v-model="checkedQuiz" native-value="first" @change.native="enableButtons">
            {{ $t('SaveYourKeys.agree') }}
          </b-checkbox>
          <br>
          <b-checkbox v-model="checkedQuiz" native-value="second" @change.native="enableButtons">
            {{ $t('SaveYourKeys.responsible') }}
          </b-checkbox>
          <br>
          <b-checkbox v-model="checkedQuiz" native-value="third" @change.native="enableButtons">
            {{ $t('SaveYourKeys.access') }}
          </b-checkbox>
          <br>
          <b-checkbox v-model="checkedQuiz" native-value="fourth" @change.native="enableButtons">
            {{ $t('SaveYourKeys.wifi') }}
          </b-checkbox>
        </div>
        <br>
        <div class="has-text-centered">

            <select class="input" v-model="createtype">
              <option value="FILE">Save File</option>
              <option value="WRITTEN">Write It Down</option>
            </select>
          <div class="has-text-dark ">
            <a :disabled="buttonsAreDisabled" class="button is-primary m-t-md is-size-5 aqua" @click="disableWiFi()">
              <p class="p-l-sm p-r-sm font-gibson-semibold is-size-7">{{ $t('SaveYourKeys.create') }}</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      checkedQuiz: [],
      createtype: "FILE",
      buttonsAreDisabled: true,
      quizOptions: 0
    };
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
    },
    enableButtons(event) {
      if (event.target.checked) {
        this.quizOptions++;
      } else {
        this.quizOptions--;
      }
      if (this.quizOptions === 4) {
        this.buttonsAreDisabled = false;
      } else {
        this.buttonsAreDisabled = true;
      }
    }
  }
};
</script>

<style scoped>
.body-text {
  max-width: 40rem;
}
.hero-body.safe-keys {
  background-color: #ffffff !important;
  padding-top: 0 !important;
}
.hero-head.safe-keys {
  background-color: #ffffff !important;
}
.hero-body.safe-keys .font-gibson-semibold {
  color: #454f63;
}
.hero-body.safe-keys .font-gibson {
  color: #78849e;
  font-size: 11pt;
}
.hero-body.safe-keys .button {
  border-radius: 0.7rem;
}
iframe {
  width: 100%;
}
</style>
