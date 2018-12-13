<template>
  <section>
    <div class="hero is-fullheight is-paddingless has-blur-background">
      <div class="hero-head p-t-sm p-l-lg container">
      <div class="header has-text-centered  is-size-1  has-text-white has-text-centered">
          {{ $t('ChoosePassword.header') }}
        </div>
        <div class="max-width">
          <div class="field">
            <div class="is-size-5  important-red">
              <b>{{ $t('CreateVertoPassword.important') }}:</b> 
            </div>
            <div class="has-text-white">
              Your keys cannot be recovered by Volentix or any of its partners if you loose them. 
            </div>
            <div class="has-text-white">
              Please make sure you have saved or copied and stored your keys propperly.
            </div>
            <div class="control">
              <input v-model="keyname" class="input is-medium m-t-md" type="text" :placeholder="$t('DisplayKey.walletname')">

              <div v-if="nokeyname">
                <p class="has-text-danger m-t-md has-text-centered">
                  {{ $t('DisplayKey.mustname') }}
                </p>
              </div>

              <div v-if="keyalreadyused">
                <p class="has-text-danger m-t-md has-text-centered">
                  {{ $t('DisplayKey.already') }}
                </p>
              </div>
              <input v-model="userPassword" :class="{ 'is-danger' : notMatchingPass }" class="input is-medium m-t-md" type="password" :placeholder="$t('ChoosePassword.choose')">
              <input v-model="checkPassword" :class="{ 'is-danger' : notMatchingPass }" class="input m-t-md is-medium" type="password" :placeholder="$t('ChoosePassword.confirm')">
              
              <div v-if="notMatchingPass">
                <p class="has-text-danger m-t-md has-text-centered">
                  {{ $t('CreateVertoPassword.mustmatch') }}
                </p>
              </div>

              <div v-if="fillAllFields">
                <p class="has-text-danger m-t-md has-text-centered">
                  {{ $t('CreateVertoPassword.fillall') }}
                </p>
              </div>
              <hr style="height:1px; border:none; color:#f4f4f4; background-color:#f4f4f4;">
              <input v-model="walletpassword" class="input is-medium m-t-md" type="password" :placeholder="$t('CreateVertoPassword.vertopassword')">
              <div v-if="incorrectPassword">
                <p class="has-text-danger m-t-md has-text-centered">
                  {{ $t('Welcome.incorrect') }}
                </p>
              </div>
            </div>
          </div>
          <b-checkbox native-value="write" v-model="isEnabled" class="has-text-white">
            {{ $t('DisplayKey.understand') }}
          </b-checkbox>
          <div class="level is-mobile m-t-md">
            <div class="has-text-dark level-left">
              <a  @click="$router.push({ path: 'walletmanager' })" class="button is-primary m-t-md green is-centered has-text-white">
                <p class="is-size-6">
                  {{ $t('WalletManager.cancel') }}
                </p>
              </a>
            </div>
            <div class="has-text-dark level-right">
              <a :disabled="!isEnabled" class="button is-primary m-t-md is-size-5 green is-pulled-right" @click="encrypt">
                <p class="p-l-sm p-r-sm is-size-7 font-gibson-semibold second">{{ $t('ChoosePassword.save') }}</p>
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

export default {
  data() {
    return {
      isEnabled: false,
      userFile: "",
      userPassword: "",
      checkPassword: "",
      privateKey: "",
      publicKey: "",
      notMatchingPass: false,
      fillAllFields: false,
      test: "",
      filePath: "Choose file",
      keyname: "",
      keyalreadyused: false,
      nokeyname: false,
      incorrectPassword: false,
      walletpassword: "",
      isInstructionsActive: false
    };
  },
  mounted() {
    const ecc = require("eosjs-ecc");
    ecc.randomKey().then(privateKey => {
      this.privateKey = privateKey;
      this.publicKey = ecc.privateToPublic(privateKey);
      this.$store.commit("save", this.publicKey);
    });
  },
  methods: {
    encrypt() {
      const { dialog } = require("electron").remote;
      this.notMatchingPass = false;
      this.fillAllFields = false;
      this.keyalreadyused = false;
      this.nokeyname = false;
      this.incorrectPassword = false;
      if (this.keyname === "") {
        this.nokeyname = true;
        return;
      }
      if (this.userPassword.length > 0 && this.checkPassword.length > 0) {
        if (this.userPassword === this.checkPassword) {
          let fs = require("fs");
          let path = require("path")
          let electron = require("electron")
          let filePath = path.join(electron.remote.app.getPath('userData'), '/verto.config');
          const databack = fs.readFileSync(filePath, 'utf-8');
          let config = {};
          try {
            config = JSON.parse(sjcl.decrypt(this.walletpassword, databack));
          } catch (error) {
            this.incorrectPassword = true
            return;
          }
          let i;
          for (i = 0; i < config.keys.length; i++) {
            const key = config.keys[i];
            if (key.name.toLowerCase() === this.keyname.toLowerCase()) {
              this.keyalreadyused = true;
              return;
            }
          }
          var savePath = dialog.showSaveDialog({
            title: this.$t('ChoosePassword.file')
          });
          let defaultKey = false;
          if (config.keys.length <= 0) {
            defaultKey = true;
          }
          const key = {name: this.keyname, key: this.publicKey, defaultKey: defaultKey};
          config.keys.push(key);
          // write the file.
          const walletInfo = JSON.stringify({name: this.keyname, publickey: this.publicKey, privatekey: this.privateKey})
          fs.writeFileSync(savePath, sjcl.encrypt(this.userPassword, walletInfo), 'utf-8');
          // Write the config file.
          fs.writeFileSync(filePath, sjcl.encrypt(this.walletpassword, JSON.stringify(config)), 'utf-8');
          this.$store.dispatch("setCurrentWallet", key);
          this.$store.dispatch("setKeys", config.keys);
          this.$router.push("congratsscreen");
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
.hero.is-fullheight {
  min-height: 80vh !important;
}
</style>
