<template>
  <section>
    <div class="has-blur-background has-text-white">
  <div class="hero is-fullheight is-paddingless">
    <div class="hero-head p-t-sm p-l-lg">
      <div class="has-text-centered">
        <div class="has-text-centered is-size-1 has-text-white">
          {{ $t('DisplayKey.header') }} 
          </div>
          <img src="~@/assets/img/written.jpeg">
      </div> 
      <br>
      <div class="container font-gibson has-text-centered">
        <a @click="showPrivate = !showPrivate">
          <span v-if="!showPrivate" class="is-size-6 has-text-aqua p-l-sm">{{ $t('DisplayKey.showPrivate') }} </span>
          <span v-else class="is-size-6 has-text-aqua p-l-sm">{{ $t('DisplayKey.hidePrivate') }} </span>
        </a>
        <br>
        <div v-if="showPrivate" class="has-text-white">
          <div class="generated-keys p-md">
                <span class="is-size-7 has-text-white p-l-sm"> {{ privateKey }} </span>
          </div>
        </div>
        <br>
        <a @click="showPublic = !showPublic">
          <span v-if="!showPublic" class="is-size-6 has-text-aqua p-l-sm m-t-md">{{ $t('DisplayKey.showPublic') }} </span>
          <span v-else class="is-size-6 has-text-aqua p-l-sm m-t-md">{{ $t('DisplayKey.hidePublic') }} </span>
        </a>
        <div v-if="showPublic" class="has-text-white">
          <div class="generated-keys p-md">
                <span class="is-size-7 has-text-white p-l-sm"> {{ publicKey }} </span>
          </div>
        </div>
        <div class="m-t-md has-text-centered">
          <div v-if="keyalreadyused">
            <p class="has-text-danger m-t-md">
              {{ $t('DisplayKey.already') }}
            </p>
          </div>
          <div v-if="keynameempty">
            <p class="has-text-danger m-t-md">
              {{ $t('DisplayKey.mustname') }}
            </p>
          </div>
          <input v-model="keyname" class="input m-b-sm" type="text" :placeholder="$t('DisplayKey.walletname')">
          <div v-if="incorrectPassword">
            <p class="has-text-danger m-t-md">
              {{ $t('Welcome.incorrect') }}
            </p>
          </div>
          <input v-model="walletpassword" class="input m-b-sm" type="password" :placeholder="$t('CreateVertoPassword.vertopassword')">

        <b-checkbox native-value="write" v-model="isEnabled">
          {{ $t('DisplayKey.understand') }}
        </b-checkbox>
          <div class="is-mobile m-t-md has-text-centered">

            <div class="has-text-dark has-text-centered">
              <a :disabled="!isEnabled" class="button is-primary m-t-md is-size-5 aqua" @click="goToCongratsScreen">
                <p class="p-l-sm p-r-sm font-gibson-semibold is-size-7">{{ $t('CreateVertoPassword.done') }}</p>
              </a>
            </div>
        </div>
        </div>
      </div>
      <b-modal :active.sync="isKeyModalActive">
        <div class="card">
          <div class="card-content">
            <p>
              {{ $t('DisplayKey.writedown') }}
            </p>
            <br>
            <p>
              {{ $t('DisplayKey.privkey') }}: {{ privateKey }}
            </p>
            <br>
            <p>
              {{ $t('DisplayKey.pubkey') }}: {{ publicKey }}
            </p>
          </div>
        </div>
      </b-modal>
      <b-modal :active.sync="isInstructionsActive">
        <div class="card">
          <div class="card-content">
            <div class="modal-header">
              <slot name="header">
                {{ $t('DisplayKey.recommended') }}
              </slot>
            </div>
            <div>
              <ul>
                <li>
                  * {{ $t('DisplayKey.goodpen') }}
                </li>
                <li>
                  * {{ $t('DisplayKey.goodpaper') }}
                </li>
                <li>
                  * {{ $t('DisplayKey.polaroid') }}
                </li>
              </ul>
            </div>
            <br>
            <div class="modal-header">
              <slot name="header">
                {{ $t('DisplayKey.once') }}
              </slot>
            </div>
            <div>
              <ul>
                <li>
                  * {{ $t('DisplayKey.look') }}
                </li>
                <li>
                  * {{ $t('DisplayKey.provisions') }}
                </li>
              </ul>
            </div>
            <br>
            <div class="modal-header">
              <slot name="header">
                {{ $t('DisplayKey.donot') }}
              </slot>
            </div>
            <div>
              <ul>
                <li>
                  * {{ $t('DisplayKey.fold') }}
                </li>
                <li>
                  * {{ $t('DisplayKey.share') }}
                </li>
                <li>
                  * {{ $t('DisplayKey.picture') }}
                </li>
                <li>
                  * {{ $t('DisplayKey.screenshot') }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </b-modal>
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
      checkedAnswers: 0,
      isKeyModalActive: false,
      privateKey: "",
      publicKey: "",
      requiredText: this.$t('DisplayKey.copied'),
      textInput: "",
      clicked: false,
      keynameempty: false,
      keyalreadyused: false,
      keyname: "",
      walletpassword: "",
      incorrectPassword: false,
      isInstructionsActive: false,
      showPrivate: false,
      showPublic: false
    };
  },
  mounted() {
    this.generateKeys();
  },
  methods: {
    generateKeys() {
      const ecc = require("eosjs-ecc");
      ecc.randomKey().then(privateKey => {
        this.privateKey = privateKey; // wif
        this.publicKey = ecc.privateToPublic(privateKey); // EOSkey...
        this.$store.commit("save", this.publicKey);
      });
    },
    goToCongratsScreen() {
      if (!this.isEnabled) {
        return;
      }
      this.keynameempty = false;
      this.keyalreadyused = false;
      this.incorrectPassword = false;
      if (this.keyname === "") {
        this.keynameempty = true;
        return;
      }
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
      let defaultKey = false;
      if (config.keys.length <= 0) {
        defaultKey = true;
      }
      const key = {name: this.keyname, key: this.publicKey, defaultKey: defaultKey};
      config.keys.push(key);
      this.$store.dispatch("setKeys", config.keys);
      this.$store.dispatch("setCurrentWallet", key);
      fs.writeFileSync(filePath, sjcl.encrypt(this.walletpassword, JSON.stringify(config)), 'utf-8');
      this.$router.push("congratsscreen");
    }
  }
};
</script>

<style scoped>
.display-keys {
  background-color: #162929;
  border-radius: 0.6rem;
  padding: 1rem !important;
}
.modal-header {
  margin-top: 0;
  color: #42b983;
}
.generated-keys {
  background-color: #1a4a48;
  border-radius: 0.6rem;
  border: solid #3acce1 1.2pt;
  overflow-wrap: break-word;
}
.hero-body.save-your-keys {
  background-color: #f7f7fa !important;
  padding-top: 0.3rem !important;
}
.hero-head.save-your-keys {
  background-color: #f7f7fa !important;
}
.save-your-keys .font-gibson-semibold {
  color: #454f63;
}
.hero-body.save-your-keys p.font-gibson-semibold.second {
  color: #ffffff;
}
.hero-body.save-your-keys .button.green {
  background-color: #00a6a6 !important;
}
.hero-body.save-your-keys .button.aqua {
  background-color: #2cfee6 !important;
}
.hero-body.save-your-keys .font-gibson {
  color: #78849e;
  font-size: 10.5pt;
}
.hero-body.save-your-keys .button {
  border-radius: 0.7rem;
}
.b-checkbox {
  margin-top: 0.6rem;
}
.level-left .button {
  width: 10rem;
  height: 3rem;
}
.level-right .button {
  width: 10rem;
  height: 3rem;
}
.container {
  max-width: 35rem;
}
.hero.is-fullheight {
  min-height: 80vh !important;
}
</style>
