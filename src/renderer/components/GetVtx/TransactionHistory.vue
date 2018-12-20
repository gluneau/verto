<template>
  <section class="hero is-fullheight has-background-darkgreen is-bold" >
    <div class="">
      <div class="container top-bg">
        <div class="container p-l-lg p-r-lg p-b-md">
          <div class="p-t-lg p-b-lg has-text-centered">
            <img src="~@/assets/img/wallet-logo.png" class="logo">
            <br>
            <br>
            <div class="is-size-4 has-text-white m-l-md has-text-centered select">
                <select class=" " v-model="transactionStatus" @change="refreshContent">
                  <option value="CANCELLED">Cancelled</option>
                  <option value="CONVERTED">Pending</option>
                  <option value="CONFIRMED">Accepted</option>
                  <option value="COMPLETED">Completed</option>
                </select>
            </div>
            <br>
            <br>
            <div class="has-text-white is-size-3">
              <font-awesome-icon icon="sync-alt" style="cursor:pointer" @click="refreshContent"/>
            </div>
          </div>
        </div>
      </div>

        <div class="has-text-white  p-b-md has-text-centered" >
          <div class="is-marginless is-mobile has-background-darkgreen p-l-lg p-r-lg p-t-sm p-b-sm has-text-centered">
            <div class="is-mobile is-size-5 font-gibson has-text-centered">
                <div class="is-size-4 has-text-white m-l-md has-text-centered">

                  <router-link to="/main" class="return">
                      {{ $t('TransactionHistory.backToWallet') }}
                  </router-link>
                </div>
              </div>
          </div>
        </div>
    </div>
    <div class="hero-body is-paddingless has-background-darkgreen">
      <div class="container w-main-b-graident has-text-centered">
        <div class="transactions-history p-b-md p-t-lg">
          <div v-if="loadingData" class="p-l-lg p-r-md m-t-md is-size-4 has-text-grey-light">
            <p>
              {{ $t('Main.loading') }}...
            </p>
          </div>

          <div v-if="hasTransactions">

            <b-table class="transactions-table"
              v-if="transactionStatus === 'CONVERTED'"
              :data="transactions"
              @click="handleRowClick"
              :columns="columns['CONVERTED']">
              <template slot-scope="props">
                <b-table-column field="status">
                  {{ props.row.status }}
                </b-table-column>
                <b-table-column field="native_transaction_time">
                  {{ props.row.native_transaction_time | formatDate }}
                  {{ props.row.native_transaction_time | formatTime }}
                </b-table-column>
                <b-table-column field="confirmations_count">
                  {{ props.row.confirmations_count }} / 6
                </b-table-column>
                <b-table-column field="vtx_amount">
                  {{ props.row.vtx_amount }}
                </b-table-column>
              </template>
            </b-table>

            <b-table class="transactions-table"
              v-if="transactionStatus === 'CONFIRMED'"
              :data="transactions"
              @click="handleRowClick"
              :columns="columns['CONFIRMED']">
              <template slot-scope="props">
                <b-table-column field="status">
                  {{ props.row.status }}
                </b-table-column>
                <b-table-column field="native_transaction_time">
                  {{ props.row.native_transaction_time | formatDate }}
                  {{ props.row.native_transaction_time | formatTime }}
                </b-table-column>
                <b-table-column field="confirmation_time">
                  {{ props.row.confirmation_time | formatDate }}
                  {{ props.row.confirmation_time | formatTime }}
                </b-table-column>
                <b-table-column field="vtx_amount">
                  {{ props.row.vtx_amount }}
                </b-table-column>
              </template>
            </b-table>

            <b-table class="transactions-table"
              v-if="transactionStatus === 'COMPLETED'"
              :data="transactions"
              @click="handleRowClick"
              :columns="columns['COMPLETED']">
              <template slot-scope="props">
                <b-table-column field="status">
                  {{ props.row.status }}
                </b-table-column>
                <b-table-column field="native_transaction_time">
                  {{ props.row.native_transaction_time | formatDate }}
                  {{ props.row.native_transaction_time | formatTime }}
                </b-table-column>
                <b-table-column field="confirmation_time">
                  {{ props.row.confirmation_time | formatDate }}
                  {{ props.row.confirmation_time | formatTime }}
                </b-table-column>
                <b-table-column field="vtx_amount">
                  {{ props.row.vtx_amount }}
                </b-table-column>
              </template>
            </b-table>

          </div>
          <div v-if="noTransactions">
            <p class="has-text-grey is-size-5 m-l-lg has-text-weight-bold">
              {{ $t('Main.transactions') }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <b-modal :active.sync="isTransactionDetailsActive" class="transaction-details-popup">
      <div class="card-content has-text-centered has-text-white">
        <p class="is-marginless is-size-4 has-text-white font-gibson"> {{ currentTransaction.status }} </p>
        <br>
        <table style="width:100%;">
          <tr>
            <td>
              {{ $t('TransactionHistory.native') }}:
            </td>
            <td class="td-align-right">
              {{ currentTransaction.native_currency.toUpperCase() }}
            </td>
          </tr>
          <tr>
            <td>
              {{ $t('TransactionHistory.amount') }}:
            </td>
            <td class="td-align-right">
              {{ currentTransaction.native_amount }}
            </td>
          </tr>
          <tr>
            <td>
              {{ $t('TransactionHistory.ratio') }}:
            </td>
            <td class="td-align-right">
              {{ currentTransaction.conversion_rate }}
            </td>
          </tr>
          <tr>
            <td>
              {{ $t('TransactionHistory.confirmation') }}:
            </td>
            <td class="td-align-right">
              {{ currentTransaction.confirmations_count }}
            </td>
          </tr>
          <tr v-if="currentTransaction.ledger_transaction_id">
            <td>
              {{ $t('TransactionHistory.transid') }}
            </td>
            <td class="td-align-right ledger-id-wrap">
              {{ currentTransaction.ledger_transaction_id }}
            </td>
          </tr>
        </table>
        <p class="is-marginless is-size-5 has-text-white font-gibson"> VTX </p>
        <br>
        <table style="width:100%;">
          <tr>
            <td>
              {{ $t('TransactionHistory.pre') }}:
            </td>
            <td class="td-align-right">
              {{ currentTransaction.pre_bonus_vtx_amount }}
            </td>
          </tr>
          <tr>
            <td>
              {{ $t('TransactionHistory.phase') }}:
            </td>
            <td class="td-align-right">
              {{ currentTransaction.phase_bonus_vtx_amount }}
            </td>
          </tr>
          <tr>
            <td>
              {{ $t('TransactionHistory.additional') }}:
            </td>
            <td class="td-align-right">
              {{ currentTransaction.additional_bonus_vtx_amount }}
            </td>
          </tr>
          <tr>
            <td>
              {{ $t('TransactionHistory.total') }}:
            </td>
            <td class="td-align-right">
              {{ currentTransaction.vtx_amount }}
            </td>
          </tr>
        </table>
        <p class="is-marginless is-size-5 has-text-white font-gibson">Steps </p>
        <br>
        <table style="width:100%;">
          <tr>
            <td>
              {{ $t('TransactionHistory.received') }}:
            </td>
            <td class="td-align-right">
              {{ currentTransaction.native_transaction_time | formatDate}} {{ currentTransaction.native_transaction_time | formatTime}}
            </td>
          </tr>
          <tr>
            <td>
              {{ $t('TransactionHistory.converted') }}:
            </td>
            <td class="td-align-right"  v-if="currentTransaction.conversion_time">
              {{ currentTransaction.conversion_time | formatDate}} {{ currentTransaction.conversion_time | formatTime}}
            </td>
            <td class="td-align-right"  v-if="!currentTransaction.conversion_time">
              {{ $t('TransactionHistory.pending') }}...
            </td>
          </tr>
          <tr>
            <td>
              {{ $t('TransactionHistory.confirmed') }}:
            </td>
            <td class="td-align-right" v-if="currentTransaction.confirmation_time">
              {{ currentTransaction.confirmation_time | formatDate}} {{ currentTransaction.confirmation_time | formatTime}}
            </td>
            <td class="td-align-right" v-if="!currentTransaction.confirmation_time">
              {{ $t('TransactionHistory.pending') }}...
            </td>
          </tr>
          <tr>
            <td>
              {{ $t('TransactionHistory.approved') }}:
            </td>
            <td class="td-align-right"  v-if="currentTransaction.approved_time">
              {{ currentTransaction.approved_time | formatDate}} {{ currentTransaction.approved_time | formatTime}}
            </td>
            <td class="td-align-right"  v-if="!currentTransaction.approved_time">
              {{ $t('TransactionHistory.pending') }}...
            </td>
          </tr>
        </table>
      </div>
    </b-modal>
  </section>
</template>

<script>
import Ledger from "volentix-ledger";
import axios from 'axios'

const chainId = process.env.CHAIN_ID
const httpEndpoint = process.env.HTTP_ENDPOINT

const myaccount = "vtxtrust";
let ledger = {};

export default {
  data() {
    return {
      transactions: [],
      columns: {
        'CONFIRMED': [
          { field: 'status', label: 'Status' },
          { field: 'native_transaction_time', label: 'Transaction Received' },
          { field: 'confirmation_time', label: 'Confirmation Time' },
          { field: 'vtx_amount', label: 'VTX Amount' }
        ],
        'CONVERTED': [
          { field: 'status', label: 'Status' },
          { field: 'native_transaction_time', label: 'Transaction Received' },
          { field: 'confirmations_count', label: 'Confirmations Count' },
          { field: 'vtx_amount', label: 'VTX Amount' }
        ],
        'COMPLETED': [
          { field: 'status', label: 'Status' },
          { field: 'native_transaction_time', label: 'Transaction Received' },
          { field: 'confirmation_time', label: 'Confirmation Time' },
          { field: 'vtx_amount', label: 'VTX Amount' }
        ],
        'CANCELLED': [
          { field: 'status', label: 'Status' },
          { field: 'cancel_time', label: 'Cancellation Time' },
          { field: 'vtx_amount', label: 'VTX Amount' }
        ]
      },
      messages: "",
      isCardModalActive: false,
      wallet: "",
      hasTransactions: false,
      noTransactions: false,
      appVersion: this.$appVersion,
      appName: this.$appName,
      loadingData: true,
      currentBtcValue: 0.0,
      isTransactionDetailsActive: false,
      transactionStatus: "CONVERTED",
      underOneMinuteLeftInTimer: false,
      currentTransaction: {
        'native_currency': ""
      }
    };
  },
  mounted() {
    this.setWallet();
    this.getPendingTransactions();
  },
  watch: {
    transactionStatus: function () {
      this.hasTransactions = false
      this.transactions = []
    }
  },
  methods: {
    setWallet: function() {
      this.wallet = this.$store.state.currentWallet.key;
    },
    transform(props) {
      Object.entries(props).forEach(([key, value]) => {
        let digits = value < 10 ? `0${value}` : value;
        if (key === 'totalMinutes' && value <= 10) {
          this.underOneMinuteLeftInTimer = true;
        } else if (key === 'totalSeconds' && value <= 0) {
          this.doneCountdown = true;
        }
        props[key] = `${digits}`;
      });

      return props;
    },
    async getPendingTransactions() {
      let results = await axios.get(process.env.CROWDFUND_URL + "/public/api/investor-transactions?verto_public_address=" + this.wallet + "&status_code=" + this.transactionStatus);
      this.loadingData = false;
      this.transactions = [];
      let filteredResults = [];
      if (results.data.length > 0) {
        for (var i = 0; i < results.data.length; i++) {
          const item = results.data[i];
          if (item.status === this.transactionStatus) {
            filteredResults.push(item)
            if (item.status === 'CONVERTED' && item.countdown_time_ends) {
              const serverTime = this.$route.query.server_time;
              const potentialTimeRemaining = Date.parse(item.countdown_time_ends) - Date.parse(item.server_time)
              if (potentialTimeRemaining > 0) {
                item.timeremaining = potentialTimeRemaining;
              }
            }
          }
        }
        this.transactions = filteredResults;
        this.hasTransactions = true;
        this.noTransactions = false;
      } else {
        this.transactions = [];
        this.hasTransactions = false;
        this.noTransactions = true;
      }
    },
    transactionDetails(transaction) {
      this.currentTransaction = transaction;
      this.isTransactionDetailsActive = true;
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
    refreshContent() {
      this.hasTransactions = false
      this.transactions = []
      this.getPendingTransactions();
    },
    handleRowClick(row) {
      this.currentTransaction = row
      this.isTransactionDetailsActive = true
    }
  }
};
</script>

<style scoped>
.return {
  color: #00DEB1;
  font-size: 12pt;
}
.transactions-header {
  color: #00DEB1;
  font-size: 14pt;
}
.td-align-right {
  text-align: right;
  display:block
}
.ledger-id-wrap {
  max-width: 10rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
.hero.is-fullheight {
  height: 100vh;
}
.transactions-history {
  max-width: 45rem;
  margin: 0 auto;
}
.transactions-history .column {
  max-height: 1.5rem;
}
.transactions-table {
  width: 100%;
}
</style>
