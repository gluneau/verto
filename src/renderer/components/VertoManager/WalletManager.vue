<template>
  <section>
  <div class="hero is-fullheight is-paddingless has-blur-background ">
    <div class="hero-head p-t-sm p-l-lg p-r-md ">
      <nav class="navbar is-dark is-logo">
        <div class="navbar-brand">
          <div class="navbar-item header has-text-centered is-centered  has-text-white">
            {{ $t('WalletManager.header') }}
          </div>
          <a class="navbar-burger  is-white" @click="open = !open">
            <span aria-hidden="true" ></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div class="navbar-menu" :class="{'is-active': open}">
          <div class="navbar-end">
            <div class="justify-center">
              <a class="has-text-white mr2 f6 link br1 bw1  ph3 pv1 dib white-40 items-center justify-center w4" @click="showAddKey = !showAddKey">
                  {{ $t('CreateVertoPassword.addwallet') }}
              </a>
              <a class="has-text-white mr2 f6 link br1 bw1  ph3 pv1 dib white-40 items-center justify-center w4" @click="generateKey">
                  {{ $t('CreateVertoPassword.createwallet') }}
              </a>
            </div>
          </div>
        </div>
      </nav>
        <div v-if="showAddKey" class="container has-text-centered add-wallet">
          <div class="header has-text-white has-text-centered m-t-lg">
          {{ $t('CreateVertoPassword.addwallet') }}
          </div>
          <form>
            <div v-if="keyalreadysaved">
              <p class="has-text-danger m-t-md">
                {{ $t('WalletManager.used') }}
              </p>
            </div>
            <div v-if="missingInput">
              <p class="has-text-danger m-t-md">
                {{ $t('WalletManager.both') }}
              </p>
            </div>
            <input v-model="keyname" class="input m-b-sm" type="text" :placeholder="$t('DisplayKey.walletname')">
            <input v-model="publicKey" class="input m-b-sm" type="text" :placeholder="$t('WalletManager.keyhere')">
            <input v-model="walletpassword" class="input m-b-sm" type="password" :placeholder="$t('CreateVertoPassword.vertopassword')">
            <div v-if="incorrectPassword">
              <p class="has-text-danger m-t-md">
                {{ $t('Welcome.incorrect') }}
              </p>
            </div>
            <div class="level is-mobile m-t-md">
              <div class="has-text-dark level-left">
                <a class="button  is-primary m-t-md green is-centered has-text-white" @click="cancelAddPublicKey">
                  <p class="is-size-6">
                    {{ $t('WalletManager.cancel') }}
                  </p>
                </a>
              </div>
              <div class="has-text-dark level-right">
                <a class="button m-t-md green is-primary is-centered has-text-white" @click="addpublickey">
                  <p>
                    {{ $t('WalletManager.submit') }}
                  </p>
                </a>
              </div>
            </div>
          </form>
        </div>
        <br>
        <div v-if="existingKeys.length > 0 && !showAddKey">
          <div v-if="showdeletekeypassword" class="has-text-centered container delete-key">

            <input v-model="deletekeypassword" class="input m-b-sm" type="password" :placeholder="$t('CreateVertoPassword.vertopassword')">
            <div v-if="lastwarningBeforeDelete">
              <p class="has-text-danger">
                {{ $t('WalletManager.cannotrecover') }}
              </p>
            </div>
            <div v-if="incorrectdeletekeypassword">
              <p class="has-text-danger">
                {{ $t('Welcome.incorrect') }}
              </p>
            </div>
            <div class="level is-mobile m-t-md">
              <div class="has-text-dark level-left">
                <a class="button  is-primary m-t-md green is-centered has-text-white" @click="cancelDeleteKey">
                  <p class="is-size-6">
                    {{ $t('WalletManager.cancel') }}
                  </p>
                </a>
              </div>
              <div class="has-text-dark level-right">
                <a class="button m-t-md green is-primary is-centered has-text-white" @click="removeKey">
                  <p>
                    {{ $t('WalletManager.delete') }}
                  </p>
                </a>
              </div>
            </div>
          </div>
          <div class="keys-container container" v-if="!showdeletekeypassword">
            <div class="header has-text-centered is-centered  has-text-white has-text-centered">
              {{ $t('CreateVertoPassword.wallets') }}
            </div>
            <div v-for="key in existingKeys" class="keys-list m-t-md">
              <nav class="level is-mobile">
                <div class="level-item has-text-centered">
                  <font-awesome-icon icon="key" class="fa-sm has-text-primary m-l-sm"/>
                </div>
                <div class="level-item has-text-centered">
                  <a class="is-size-6 m-md key has-text-white" @click="openMain(key)"> {{ key.name }} </a>
                </div>
                <div class="level-item has-text-centered">
                  <b-checkbox v-model="key.defaultKey" @change.native="chooseDefault(key)">
                    </b-checkbox>
                </div>
                <div class="level-item has-text-centered">
                  <a @click="deleteKey(key.name)">
                    <font-awesome-icon icon="trash" class="fa-md has-text-grey-light m-l-sm trash-bin is-pulled-right m-r-sm"/>
                  </a>
                </div>
              </nav>
            </div>

          </div>
            <br>
          </div>
        </div>
      </div>
      <b-modal :active.sync="isInstructionsActive">
        <div class="card">
          <div class="card-content">
            <div class="modal-header">
              <slot name="header">
                {{ $t('CreateVertoPassword.addwallet') }}
              </slot>
            </div>
            <div>
              {{ $t('CreateVertoPassword.onlysupport') }}
            </div>
            <br>
            <div class="modal-header">
              <slot name="header">
                {{ $t('CreateVertoPassword.createwallet') }}
              </slot>
            </div>
            <div>
              <p v-html="$t('CreateVertoPassword.createkey')"></p>
            </div>
            <br>
            <div class="modal-header">
              <slot name="header">
                {{ $t('CreateVertoPassword.wallets') }}
              </slot>
            </div>
            <div>
              {{ $t('CreateVertoPassword.choose') }}
            </div>
            <div class="modal-header">
              <slot name="header">
                {{ $t('CreateVertoPassword.delete') }}
              </slot>
            </div>
            <div>
              <ul>
                <li>
                  {{ $t('CreateVertoPassword.trash') }} <font-awesome-icon icon="trash" class="fa-md has-text-grey-light m-l-sm trash-bin is-pulled-right m-r-sm"/>
                </li>
                <li>
                  {{ $t('CreateVertoPassword.enter') }}
                </li>
                <li>
                  <p v-html="$t('CreateVertoPassword.note')"></p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </b-modal>
      <b-modal :active.sync="isChangingDefault">
        <div class="card has-text-centered has-background-black has-text-white">
          <div class="card-content">
            <div class="modal-header is-size-1">
              <slot name="header">
                {{ newDefaultKey.name }} As Default
              </slot>
            </div>
            <br>
            <div>
              <input v-model="walletpassword" class="input m-b-sm" type="password" :placeholder="$t('CreateVertoPassword.vertopassword')">
            </div>
            <div v-if="changeDefaultMissingPassword">
              <p class="has-text-danger m-t-md">
                You must provide a password
              </p>
            </div>
            <div v-if="incorrectDefaultChangePassword">
              <p class="has-text-danger m-t-md">
                {{ $t('Welcome.incorrect') }}
              </p>
            </div>
            <div class="has-text-dark">
                <a class="button m-t-md green is-primary is-centered has-text-white" @click="changeDefault">
                  <p>
                    {{ $t('WalletManager.submit') }}
                  </p>
                </a>
              </div>
            <br>
          </div>
        </div>
      </b-modal>
    </div>
  </section>
</template>

<script>
import sjcl from "sjcl";

export default {
  data() {
    return {
      open: false,
      userPassword: "",
      checkPassword: "",
      notMatchingPass: false,
      fillAllFields: false,
      keyname: "",
      publicKey: "",
      showAddKey: false,
      missingInput: false,
      keyalreadysaved: false,
      existingKeys: [],
      incorrectPassword: false,
      walletpassword: "",
      showdeletekeypassword: false,
      deletekeypassword: "",
      keyfordelete: "",
      incorrectdeletekeypassword: false,
      isInstructionsActive: false,
      lastwarningBeforeDelete: false,
      showParentNavOptions: false,
      showDeleteKey: false,
      isChangingDefault: false,
      newDefaultKey: {},
      changeDefaultMissingPassword: false,
      incorrectDefaultChangePassword: false
    };
  },
  mounted() {
    this.existingKeys = this.$store.state.keys;
    if (!this.existingKeys || this.existingKeys.length <= 0) {
      this.$router.push({ path: "keepyourkeyssafe" });
    }
  },
  methods: {
    showChildren: function() {
      this.showParentNavOptions = false;
    },
    showParents: function() {
      this.showParentNavOptions = true;
    },
    chooseDefault: function(key) {
      this.newDefaultKey = key;
      this.walletpassword = "";
      this.isChangingDefault = true;
    },
    changeDefault: function() {
      this.changeDefaultMissingPassword = false;
      this.incorrectDefaultChangePassword = false;
      if (this.walletpassword === "") {
        this.changeDefaultMissingPassword = true;
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
        this.incorrectDefaultChangePassword = true
        return;
      }
      let i;
      for (i = 0; i < config.keys.length; i++) {
        const key = config.keys[i];
        if (key.name.toLowerCase() === this.newDefaultKey.name.toLowerCase()) {
          key.defaultKey = true;
        } else {
          key.defaultKey = false;
        }
      }
      this.$store.dispatch("setKeys", config.keys);
      this.existingKeys = this.$store.state.keys;
      fs.writeFileSync(filePath, sjcl.encrypt(this.walletpassword, JSON.stringify(config)), 'utf-8');
      this.walletpassword = "";
      this.existingKeys = config.keys;
      this.isChangingDefault = false;
    },
    openvideo: function() {
      var open = require("open");
      open("https://www.youtube.com/embed/u8qDkInJHaI");
    },
    openMain: function(key) {
      this.$store.commit("save", key.address);
      this.$store.dispatch("setCurrentWallet", key);
      this.$router.push({ path: "main" });
    },
    addpublickey: function() {
      this.incorrectPassword = false;
      this.keyalreadysaved = false;
      this.missingInput = false;
      if (this.keyname === "" || this.publicKey === "") {
        this.missingInput = true;
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
        if (key.name.toLowerCase() === this.keyname.toLowerCase() || key.key === this.publicKey) {
          this.keyalreadysaved = true;
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
      this.existingKeys = this.$store.state.keys;
      fs.writeFileSync(filePath, sjcl.encrypt(this.walletpassword, JSON.stringify(config)), 'utf-8');
      this.walletpassword = "";
      this.existingKeys = config.keys;
      this.showAddKey = false;
    },
    cancelAddPublicKey: function() {
      this.showAddKey = false;
    },
    generateKey: function() {
      this.$router.push({ path: "keepyourkeyssafe" });
    },
    deleteKey(key) {
      this.keyfordelete = key;
      this.showdeletekeypassword = true;
      this.lastwarningBeforeDelete = false;
      this.showDeleteKey = true;
    },
    cancelDeleteKey() {
      this.keyfordelete = "";
      this.deletekeypassword = "";
      this.showdeletekeypassword = false;
      this.lastwarningBeforeDelete = false;
    },
    removeKey() {
      this.incorrectdeletekeypassword = false;
      let fs = require("fs");
      let path = require("path")
      let electron = require("electron")
      let filePath = path.join(electron.remote.app.getPath('userData'), '/verto.config');
      const databack = fs.readFileSync(filePath, 'utf-8');
      let config = {};
      try {
        config = JSON.parse(sjcl.decrypt(this.deletekeypassword, databack));
      } catch (error) {
        this.incorrectdeletekeypassword = true
        return;
      }
      if (this.lastwarningBeforeDelete) {
        let keyIndex;
        let newKeysArray = [];
        for (let i = 0; i < config.keys.length; i++) {
          if (config.keys[i].name !== this.keyfordelete) {
            newKeysArray.push({name: config.keys[i].name, key: config.keys[i].key});
          }
        }
        config.keys = newKeysArray;
        fs.writeFileSync(filePath, sjcl.encrypt(this.deletekeypassword, JSON.stringify(config)), 'utf-8');
        this.existingKeys = newKeysArray;
        this.keyfordelete = "";
        this.deletekeypassword = "";
        this.showdeletekeypassword = false;
      } else {
        this.lastwarningBeforeDelete = true;
      }
    }
  }
};
</script>

<style scoped>
.navbar-menu.is-active {
  background-color: transparent !important;
}
.navbar-burger{
  color: #ffffff !important;
}
.hero-body.select-key {
  background-color: #f7f7fa !important;
}
.modal-header {
  margin-top: 0;
  color: #42b983;
}
.hero-body.select-key .font-gibson-semibold {
  color: #454f63;
}
.hero-body.select-key .font-gibson {
  color: #78849e;
  font-size: 11pt;
}
.header {
  color: #78849e;
  font-size: 20pt;
}
.hero-body.select-key .keys-list {
  border-bottom: solid 1px hsl(0, 0%, 86%);
  padding: 0.5rem !important;
}
.keys-container {
  max-width: 40rem;
  overflow-y: scroll;
}
.hero-body.select-key .key:hover {
  color: hsl(171, 100%, 41%) !important;
}
.hero-body.select-key .trash-bin:hover {
  color: hsl(171, 100%, 41%) !important;
  cursor: pointer;
}
.hero-body.select-key .button.green {
  background-color: #00a6a6 !important;
  border: solid #00a6a6 1pt !important;
  border-radius: 0.5rem;
  height: 2.5rem;
  width: 100%;
}
.hero-body.select-key .button.is-primary {
  height: 3rem;
}
.hero-body.select-key .choose-file {
  border-radius: 0.5rem;
}
.hero-body.select-key .button.green p {
  color: #ffffff !important;
}
.b-checkbox {
  margin-top: 0.6rem;
}
.hero-body.select-key input {
  border-radius: 0.5rem;
}
.add-wallet {
  max-width: 35rem;
}
.hero.is-fullheight {
  min-height: 80vh !important;
}
.delete-key {
  max-width: 30rem;
}
</style>
