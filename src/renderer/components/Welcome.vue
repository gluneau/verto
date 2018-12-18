<template>
  <section class="hero is-fullheight wallet-background">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="box has-text-white is-radiusless is-shadowless">
          <div class="is-size-3">{{ $t('Welcome.welcometo') }}</div>
          <div class="logo-welcome p-l-lg p-r-lg">
            <!-- warning image translation needed -->
            <img src="~@/assets/img/white-logo-with-text.png" >
          </div>
          <div class="m-t-md is-size-5">{{ subtitle_message }}</div>
          <div v-if="hasPassword">
            <div class="is-size-6 m-t-md">{{ $t('Welcome.welcomeback') }}</div>
            <div v-if="nopassword">
              <p class="has-text-danger m-t-md">
                {{ $t('Welcome.nopassword') }}
              </p>
            </div>
            <div v-if="incorrectPassword">
              <p class="has-text-danger m-t-md">
                {{ $t('Welcome.incorrect') }}
              </p>
            </div>
            <form>
              <input  v-model="password" class="input m-b-sm" type="password" :placeholder="$t('Welcome.password')">
              <div class="level-item has-text-centered m-t-sm">
                <a class="p-t-lg button is-success" @click="login"> {{ $t('Welcome.login') }} </a>
              </div>
            </form>
          </div>
          <div v-if="!hasPassword">
            <div class="is-size-6 m-t-md">{{ join_message }}</div>
            <br>
            <a class="p-t-lg button is-primary is-normal" @click="createvertopassword">
              {{ $t('Welcome.create') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import sjcl from "sjcl";

const {ipcRenderer} = require('electron');
ipcRenderer.on('message', function(event, text) {
  var container = document.getElementById('messages');
  var message = document.createElement('div');
  message.innerHTML = text;
  container.appendChild(message);
})

export default {
  // name: 'locale-changer',
  data() {
    return {
      // langs: ['en', 'fr', 'es', 'sr', 'pl', 'el', 'zh', 'nl', 'fil'],
      subtitle_message: this.$t('Welcome.subtitle_message'),
      join_message: this.$t('Welcome.join_message'),
      publicKey: "",
      password: "",
      nopassword: false,
      incorrectPassword: false,
      hasPassword: false
    };
  },
  mounted() {
    let fs = require("fs");
    let path = require("path")
    let electron = require("electron")
    let filePath = path.join(electron.remote.app.getPath('userData'), '/verto.temp');
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    if (fs.existsSync(path.join(electron.remote.app.getPath('userData'), '/verto.config'))) {
      this.hasPassword = true;
    }
  },
  methods: {
    login: function() {
      this.incorrectPassword = false;
      this.nopassword = false;
      let fs = require("fs");
      let path = require("path")
      let electron = require("electron")
      let filePath = path.join(electron.remote.app.getPath('userData'), '/verto.config');
      if (!fs.existsSync(filePath)) {
        this.nopassword = true;
      } else {
        const databack = fs.readFileSync(filePath, 'utf-8');
        try {
          const config = JSON.parse(sjcl.decrypt(this.password, databack));
          this.$store.dispatch("setKeys", config.keys);
          this.$store.dispatch("login", true);
          let foundDefault = false;
          let i;
          for (i = 0; i < config.keys.length; i++) {
            const key = config.keys[i];
            if (key.defaultKey) {
              this.$store.commit("save", key.address);
              this.$store.dispatch("setCurrentWallet", key);
              foundDefault = true;
            }
          }
          if (foundDefault) {
            this.$router.push({ path: "main" });
          } else {
            this.$router.push({ path: "walletmanager" });
          }
        } catch (error) {
          this.incorrectPassword = true
        }
      }
    },
    createvertopassword: function() {
      this.$router.push({ path: "createvertopassword" });
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 30rem;
}
.wallet-background {
  height: 100vh;
  background-image: url(~@/assets/img/wallet-bg.jpg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.box {
  background-color: rgba(0, 0, 0, 0.42);
}
.button {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  border-radius: 0.5rem;
}
.logo-welcome img {
  width: 100%;
  max-width: 320px;
}
.logger {
  overflow: scroll;
  background-color: white;
  color: #000000;
  height: 150px;
}
</style>
