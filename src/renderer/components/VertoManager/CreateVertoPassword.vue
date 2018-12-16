<template>
  <section>
  <div class="hero is-fullheight is-paddingless has-blur-background">
    <div class="hero-head p-t-sm p-l-lg">
      <div class="has-text-centered">
        <div class="has-text-centered is-size-1 has-text-white">
          {{ $t('CreateVertoPassword.header') }}
          </div>
      </div> 
     
        <br>
        <div class="field create-password">
          <div class="control">
            <div class="is-size-5  important-red">
              <b>{{ $t('CreateVertoPassword.important') }}:</b> 
            </div>
            <div class="has-text-white">
              {{ $t('CreateVertoPassword.important_warning') }}
            </div>
            <br>
            <b-checkbox native-value="write" v-model="isEnabled" class="has-text-white">
              {{ $t('CreateVertoPassword.i_understand') }}
            </b-checkbox>
            <br>
            <br>
            <input v-model="userPassword" :class="{ 'is-danger' : notMatchingPass }" class="input is-medium" type="password" :placeholder="$t('CreateVertoPassword.vertopassword')">
            <input v-model="checkPassword" :class="{ 'is-danger' : notMatchingPass }" class="input m-t-md is-medium" type="password" :placeholder="$t('CreateVertoPassword.confirm')">
            <div v-if="fillAllFields">
              <p class="has-text-danger m-t-md has-text-centered">
                {{ $t('CreateVertoPassword.fillall') }}
              </p>
            </div>
            <div v-if="notMatchingPass">
              <p class="has-text-danger m-t-md has-text-centered">
                {{ $t('CreateVertoPassword.mustmatch') }}
              </p>
            </div>
            <div class="has-text-centered">
              <a :disabled="!isEnabled" class="button is-primary m-t-md is-size-5 green" @click="savePassword">
                <p class="p-l-sm p-r-sm is-size-7 font-gibson-semibold second">{{ $t('CreateVertoPassword.save') }}</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import sjcl from "sjcl";
import fileManager from "../FileManager.js";

export default {
  data() {
    return {
      userPassword: "",
      checkPassword: "",
      notMatchingPass: false,
      fillAllFields: false,
      isInstructionsActive: false,
      isEnabled: false
    };
  },
  mounted() {
    fileManager.sayHello()
  },
  methods: {
    savePassword: function() {
      if (!this.isEnabled) {
        return;
      }
      this.notMatchingPass = false;
      this.fillAllFields = false;
      if (this.userPassword.length > 0 && this.checkPassword.length > 0) {
        if (this.userPassword === this.checkPassword) {
          let fs = require("fs");
          let path = require("path")
          let electron = require("electron")
          let filePath = path.join(electron.remote.app.getPath('userData'), '/verto.config');
          const payload = JSON.stringify({keys: []});
          const router = this.$router;
          const store = this.$store;
          fs.writeFile(filePath, sjcl.encrypt(this.userPassword, payload), 'utf-8', () => {
            store.dispatch("login", true);
            router.push({ path: "walletmanager" });
          });
        } else {
          this.notMatchingPass = true;
        }
      } else {
        this.fillAllFields = true;
      }
    }
  }
};
</script>

<style scoped>
.create-password {
  max-width: 35rem;
  margin: 0 auto;
}
.hero-body.choose-password {
  background-color: #f7f7fa !important;
}
.modal-header {
  margin-top: 0;
  color: #42b983;
}
.hero-body.choose-password .font-gibson-semibold {
  color: #454f63;
}
.hero-body.choose-password .font-gibson {
  color: #78849e;
  font-size: 11pt;
}
.hero-body.choose-password .button.green {
  background-color: #00a6a6 !important;
  border: solid #00a6a6 1pt !important;
  border-radius: 0.5rem;
}
.hero-body.choose-password .choose-file {
  border-radius: 0.5rem;
}
.hero-body.choose-password .button.green p {
  color: #ffffff !important;
}
.b-checkbox {
  margin-top: 0.6rem;
}
.hero-body.choose-password input {
  border-radius: 0.5rem;
}
</style>
