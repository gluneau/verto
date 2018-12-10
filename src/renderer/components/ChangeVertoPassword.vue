<template>
  <section>
  <div class="hero is-fullheight is-paddingless has-blur-background">
    <div class="hero-head p-t-sm p-l-lg">
      <div class="has-text-centered">
        <div class="has-text-centered is-size-1 has-text-white">
          {{ $t('ChangeVertoPassword.header') }}
          </div>
      </div> 
      <div class="change-password p-t-xl">
        <div class="field">
          <div class="control">
            <div v-if="incorrectpassword">
              <p class="has-text-danger m-t-md">
                {{ $t('Welcome.incorrect') }}
              </p>
            </div>
            <input v-model="originalPassword" :class="{ 'is-danger' : incorrectpassword }" class="input is-medium" type="password" :placeholder="$t('ChangeVertoPassword.current')">
          </div>
        </div>
        <hr style="height:1px; border:none; color:#000; background-color:#000;">
        <div class="field">
          <div class="control">
            <div v-if="notMatchingPass">
              <p class="has-text-danger m-t-md">
                {{ $t('CreateVertoPassword.mustmatch') }}
              </p>
            </div>
            <div v-if="fillAllFields">
              <p class="has-text-danger m-t-md">
                {{ $t('ChangeVertoPassword.required') }}
              </p>
            </div>
            <input v-model="userPassword" :class="{ 'is-danger' : notMatchingPass }" class="input is-medium" type="password" :placeholder="$t('ChangeVertoPassword.new')">
            <input v-model="checkPassword" :class="{ 'is-danger' : notMatchingPass }" class="input m-t-md is-medium" type="password" :placeholder="$t('ChangeVertoPassword.confirm')">
          </div>
        </div>
        <div class="level is-mobile m-t-md">
          <div class="has-text-dark level-left">
            <a  @click="$router.push({ path: 'main' })" class="button m-t-md green is-centered has-text-white">
              <p class="is-size-6">
                {{ $t('WalletManager.cancel') }}
              </p>
            </a>
          </div>
          <div class="has-text-dark level-right">
            <a class="button m-t-md green is-right has-text-white" @click="updatePassword">
              <p class="is-size-6">
                {{ $t('CreateVertoPassword.save') }}
              </p>
            </a>
          </div>
        </div>
      </div>
      <b-modal :active.sync="isInstructionsActive">
        <div class="card">
          <div class="card-content">
            <div class="modal-header">
              <slot name="header">
                {{ $t('ChangeVertoPassword.change') }}
              </slot>
            </div>
            <div>
              <ul>
                <li>
                  {{ $t('ChangeVertoPassword.recommended') }} <router-link to="/backupwallet"><span style="text-decoration:underline;">{{ $t('ChangeVertoPassword.here') }}</span></router-link>.
                </li>
                <li>
                  {{ $t('ChangeVertoPassword.access') }}
                </li>

                <li>
                  <p v-html="$t('CreateVertoPassword.note')"></p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </b-modal>
      </div>
    </div>
  </section>
</template>

<script>
import sjcl from "sjcl";

export default {
  data() {
    return {
      userPassword: "",
      checkPassword: "",
      notMatchingPass: false,
      fillAllFields: false,
      incorrectpassword: false,
      originalPassword: "",
      isInstructionsActive: false
    };
  },
  methods: {
    updatePassword: function() {
      this.notMatchingPass = false;
      this.fillAllFields = false;
      let fs = require("fs");
      let path = require("path")
      let electron = require("electron")
      let filePath = path.join(electron.remote.app.getPath('userData'), '/verto.config');
      const databack = fs.readFileSync(filePath, 'utf-8');
      let config = {};
      try {
        config = JSON.parse(sjcl.decrypt(this.originalPassword, databack));
      } catch (error) {
        this.incorrectPassword = true
        console.log("3" + error)
        return;
      }
      console.log("4")
      if (this.userPassword.length > 0 && this.checkPassword.length > 0) {
        if (this.userPassword === this.checkPassword) {
          const router = this.$router;
          const store = this.$store;
          fs.writeFile(filePath, sjcl.encrypt(this.userPassword, JSON.stringify(config)), 'utf-8', () => {
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
.input {
  width: 90%;
}
.hero-body.choose-password {
  background-color: #f7f7fa !important;
}
.myLink {
	color: #f00;
}
.active {
	color: #0f0;
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
.change-password .button.green {
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
.notices.is-top {
  top: 18rem !important;
  left: 18.5rem;
}
.notices .toast {
  padding: 0.3rem 0.6rem;
  border-radius: 0.5rem;
}
.is-vcentered {
  align-items: center;
}
.top-bg {
  background-image: url(~@/assets/img/wallet-main-top-bg.jpg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.dark-blue-gradient {
  background: linear-gradient(
    to bottom,
    rgba(41, 137, 216, 0) 0%,
    rgba(255, 255, 255, 0) 10%,
    rgba(34, 52, 53, 1) 100%
  );
}
.w-main-b-graident {
  background: linear-gradient(
    to bottom,
    rgba(34, 52, 53, 1) 0%,
    rgba(255, 255, 255, 0.05) 20%,
    rgba(255, 255, 255, 0.1) 80%,
    rgba(255, 255, 255, 0) 90%,
    rgba(0, 0, 0, 0.5) 100%
  );
}
.wallet-address {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 1px;
}
.line-height-md {
  line-height: 1rem;
}
.logo {
  height: 3.5rem;
}
.list-item {
  border-bottom: solid 1px rgba(55, 202, 189, 0.3);
}
.hero-body {
  position: relative;
  top: 0;
  bottom: 0;
  width: 100%;
  align-items: flex-start !important;
}
.hero-body > .container {
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}
.hero-foot {
  border-top: none;
}
.hero.is-fullheight .hero-body {
  flex: 1;
}
.level {
  width: 90%;
}
.hero.is-fullheight {
  min-height: 80vh !important;
}
hr {
  width: 90%;
}
.change-password {
  max-width: 35rem;
  margin: 0 auto;
}
</style>
