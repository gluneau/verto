<template>
  <section class="hero is-fullheight has-background-darkgreen  is-bold" >
    <div class="">
      <div class="container top-bg">
        <div class="container p-l-lg p-r-lg p-b-md">
          <div class="container p-l-lg p-r-lg p-b-md">
            <div class="p-t-lg p-b-lg has-text-centered">
              <!-- <div class="is-pulled-left is-vcentered is-flex m-t-md">
                <router-link to="/welcome">
                  <font-awesome-icon icon="arrow-left" class="fa-sm has-text-white m-l-sm"/>
                </router-link>
              </div>
              <img src="~@/assets/img/wallet-logo.png" class="logo"> -->
              <span class="is-marginless is-size-1 has-text-white font-gibson"> {{ walletName }}</span>
              <div class="is-pulled-right is-vcentered is-flex m-t-md m-r-md">
                <a @click="isCardModalActive = true">
                  <qrcode :value="wallet" :options="{ size: 40 }" class="has-text-centered"></qrcode>
                </a>
              </div>
              <br>
              <span class="is-marginless is-size-1 has-text-white font-gibson"> {{ balance }} VTX </span>


              <div class="has-text-centered is-size-2 has-text-white m-l-md">
                    <p >
                      <span class="has-text-centered has-text-primary">{{ currentBtcValue.toFixed(4) }} BTC </span>
                      <font-awesome-icon icon="sync-alt" class="is-size-3" style="cursor:pointer" @click="refreshContent"/>
                    </p>
                  </div>
            </div>
          </div>
        </div>
      </div>
        <div class="has-text-white container p-b-md has-text-centered" >
          <div v-if="approvedToBuyVtx" class="whitelist-header">
            {{ $t('Main.approvedMessage') }}
          </div>
          <div class="is-marginless is-mobile has-background-darkgreen p-l-lg p-r-lg p-t-sm p-b-sm has-text-centered">
            <a :disabled="awaitingFinalApproval" class="button is-size-5 is-primary" @click="getVtx()">
              <p class="p-l-md p-r-md has-text-weight-bold has-text-centered is-size-6">{{ $t('Main.getvtx') }}</p>
            </a>
            <div v-if="approvedToBuyVtx">
              <br>
              <pending-counter/>
            </div>
            <div v-if="awaitingFinalApproval" class="whitelist-header">
              {{ $t('Main.waitingForApproval') }}
            </div>
          </div>
        </div>
    </div>
    <div class="hero-body is-paddingless has-background-darkgreen">
      <div class="container w-main-b-graident">
        <div class="columns is-marginless p-b-md">
          <div v-if="loadingData" class="p-l-lg p-r-md p-t-md is-size-4 has-text-grey-light wallet-transactions-window">
            <p>
              {{ $t('Main.loading') }}...
            </p>
          </div>
          <div v-if="hasTransactions" class="wallet-transactions-window">
            <div class="p-l-md p-r-md m-t-md p-b-none is-size-4 has-text-grey-light">
              {{ $t('Main.history') }}
            </div>
            <div v-for="transaction in transactions" :key="transaction.id" class="transaction_list column is-paddingless list-item">
              <router-link :to="{ name: 'TransactionDetails', params: { transaction, wallet } }">
                <div class="columns is-marginless is-mobile p-t-md p-b-md p-r-md p-l-md">
                  <div class="column is-6 is-paddingless is-size-7 font-calibri">
                        <div class="level is-mobile has-text-white">
                          <div class="level-left">
                            {{ transaction.timestamp | formatDate }}
                          </div>
                          <div class="level-right">
                            {{ transaction.timestamp | formatTime }}
                          </div>
                      </div>
                        <div class="wallet-address has-text-grey-light" >
                          <span v-html="$t('Main.number')"/>: {{ transaction.sToKey }}
                        </div>
                  </div>
                  <div class="column is-5 is-paddingless is-flex level level-right has-text-primary is-size-5 m-l-md">
                    {{ parseFloat(transaction.amount) >= 0 ? '+' : '' }}{{ parseFloat(transaction.amount).toFixed(2) }} VTX
                  </div>
                </div>
              </router-link>
            </div>
          </div>
          <div v-if="noTransactions" class="wallet-transactions-window p-t-md">
            <p class="has-text-grey is-size-5 m-l-lg has-text-weight-bold">
              {{ $t('Main.transactions') }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- <a class="button is-fullwidth is-size-5 is-primary" @click="openZixipay"> -->
    <!-- <div class="has-background-darkgreen">
      <router-link to="/getvtx">
        <a class="button is-fullwidth is-size-5 is-primary" href="https://zixipay.com">
          <p class="p-l-md p-r-md has-text-weight-bold is-size-6">{{ $t('Main.getvtx') }}</p>
        </a>
      </router-link>
    </div> -->
    <b-modal :active.sync="isCardModalActive" class="">
      <div class="card has-text-centered has-background-black has-text-white">
          <div class="card-content qr-modal image qr-modal">
            <div class="modal-header  is-size-1">
              <slot name="header">
                {{ $t('Main.address') }}
              </slot>
            </div>
            <div>
              <br>
              <ul>
                <li>
                   <qrcode :value="wallet" :options="{ size: 220 }" class="has-text-centered"></qrcode>
                </li>
                <li>
                  <br>
                  <b-tooltip :label="wallet" position="is-bottom" class="m-l-lg" type="is-white" style="width:80%">
                    <div class="column is-11 is-paddingless wallet-address is-size-7 font-calibri">
                      <span id="wallet-address">{{ wallet }}</span>
                    </div>
                  </b-tooltip>
                  <br>
                  <br>
                  <a v-clipboard:copy="wallet" id="button-copy-wallet-address" @click="toast">
                    <font-awesome-icon icon="copy" class="is-size-3 has-text-white"/>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

    </b-modal>
  </section>
</template>

<script>
import Ledger from "volentix-ledger";
import axios from 'axios'
import PendingCounter from '@/components/GetVtx/PendingCounter'

const chainId = process.env.CHAIN_ID
const httpEndpoint = process.env.HTTP_ENDPOINT
const myaccount = process.env.ACCOUNT_NAME

let ledger = {};

export default {
  data() {
    return {
      open: false,
      approvedToBuyVtx: false,
      needsWhitelisting: false,
      awaitingFinalApproval: false,
      transactions: [
        {
          s: "",
          key: 0,
          Id: 0,
          sToKey: "",
          fromAccount: "",
          toAccount: "",
          fromKey: "",
          currency: "",
          amount: 0,
          iVal: null,
          fVal: null,
          comment: "",
          nonce: "",
          timestamp: 0
        }
      ],
      messages: "",
      isCardModalActive: false,
      wallet: "",
      balance: "0.00",
      transactionLink: "/transactiondetails",
      hasTransactions: false,
      noTransactions: false,
      appVersion: this.$appVersion,
      appName: this.$appName,
      loadingData: true,
      currentBtcValue: 0.0,
      walletName: ""
    };
  },
  components: {
    'pending-counter': PendingCounter
  },
  mounted() {
    ledger = new Ledger({
      httpEndpoint: httpEndpoint,
      chainId: chainId
    },
    process.env.LEDGER_ACCOUNT_NAME);
    this.setWallet();
    this.confimApprovalOfGetVtx();
    this.refreshBalance();
    this.getTransactionHistory();
  },
  methods: {
    async confimApprovalOfGetVtx() {
      this.approvedToBuyVtx = false;
      this.needsWhitelisting = false;
      this.awaitingFinalApproval = false;
      let url = process.env.CROWDFUND_URL + "/public/api/allocate-native-chain/?verto_public_address=" + this.$store.state.currentWallet.key;
      const response = await axios.get(url);
      const message = response.data.message;
      if (message === 'wallet_not_allocated' || message === 'wallet_allocated') {
        this.approvedToBuyVtx = true;
      } else if (message === 'wallet_not_whitelisted') {
        this.needsWhitelisting = true;
      } else if (message === 'purchase_not_allowed') {
        this.awaitingFinalApproval = true;
      }
      console.log("DATA MESSAGE: " + response.data.message)
    },
    getVtx: function() {
      if (this.awaitingFinalApproval) {
        return;
      }
      this.$router.push({ path: "begingetvtx" })
    },
    setWallet: function() {
      this.walletName = this.$store.state.currentWallet.name;
      this.wallet = this.$store.state.currentWallet.key
    },
    async getTransactionHistory() {
      this.hasTransactions = false;
      this.noTransactions = false;
      try {
        const userTransactions = await ledger.retrieveTransactions({
          account: myaccount,
          wallet: this.wallet
        });
        this.loadingData = false;
        if (userTransactions.transactions.length > 0) {
          this.transactions = userTransactions.transactions;
          this.hasTransactions = true;
          this.noTransactions = false;
          this.getDate();
        } else {
          this.noTransactions = true;
        }
      } catch (error) {
        console.log(error)
        this.noTransactions = true;
        this.loadingData = false;
      }
    },
    getDate() {
      for (let i = 0; i < this.transactions.length; i++) {
        this.transactions[i].timestamp =
          parseInt(this.transactions[i].timestamp) / 1000;
      }
    },
    async refreshBalance() {
      this.loadingData = true;
      this.balance = "0.00";
      this.currentBtcValue = 0.00
      try {
        // TODO: Remove the hardcoding of vltxtgevtxtr
        const balance = await ledger.retrieveBalance({
          account: myaccount,
          wallet: this.wallet
        },
        "vltxtgevtxtr");
        this.balance = parseFloat(balance.amount).toFixed(2);
        if (this.balance > 0) {
          let results = await axios.get(process.env.CROWDFUND_URL + "/public/api/summary/");
          this.currentBtcValue = ((results.data.current_price * this.balance) / 100000000)
        }
      } catch (error) {
        this.loadingData = false;
      }
    },
    removeToast: function() {
      this.isCopied = false;
    },
    copiedClicked: function() {
      this.isCopied = true;
      setTimeout(this.removeToast, 2000);
    },
    toast() {
      this.$toast.open({
        type: "is-white",
        message: this.$t('Main.copied'),
        duration: 2000
      });
    },
    openZixipay() {
      const shell = require("electron").shell;
      event.preventDefault();
      shell.openExternal("https://zixipay.com");
    },
    refreshContent() {
      this.refreshBalance();
      this.getTransactionHistory();
    }
  }
};
</script>

<style scoped>
.whitelist-header {
  color: #f4f4f4;
  font-size: 30pt;
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
.transaction_list {
  max-width: 40rem;
  margin: 0 auto !important;
}
.transaction_list .level {
  margin-bottom: 0 !important;
}
.wallet-transactions-window {
  margin: 0 auto;
  min-height: 20vh;
}

.hero.is-fullheight {
  min-height: 80vh !important;
}
</style>
