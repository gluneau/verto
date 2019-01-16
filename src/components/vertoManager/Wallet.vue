<template>
  <div>
      <q-jumbotron class=" bg-white text-primary">
        <div class="text-left text-weight-bold uppercase q-pa-lg">
          <big>Wallet / {{ walletName }}</big>
        </div>
        <div class="row gutter wrap justify-stretch content-center ">
          <div class="col-2 text-center">
            <p class="q-caption">VTX Balance</p>
            <p class="q-title"> {{ balance }} </p>
          </div>
          <div class="col-2 text-center">
            <p class="q-caption">Value In BTC</p>
            <p class="q-title">0.0</p>
          </div>
          <div class="col-8 text-right">
            <q-btn outline style="color: dark;" label="Scan QR"/>
          </div>
        </div>
        <br>
        <div class="row items-center">
        <q-table
          title="Wallets"
          :data="tableData"
          :columns="columns"
          row-key="name"

        >
          <q-tr  :id="props.row.id" slot="body" slot-scope="props" :props="props" class="cursor-pointer">
            <q-td
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              <div v-if="col.name === 'icon'" class="text-center">
                <div v-if="col.value === 'SEND'">
                  <q-icon name="cloud_upload" size="2rem" color='red'/>
                </div>
                <div v-else>
                  <q-icon name="cloud_download" size="2rem" color='blue'/>
                </div>
              </div>
              <div v-if="col.name === 'vtx'" class="text-center">
                <div v-if="col.value === 'SEND'">
                  - {{ col.value }} VTX
                </div>
                <div v-else>
                  + {{ col.value }} VTX
                </div>

              </div>
              <div v-else>
                {{ col.value }}
              </div>
            </q-td>
          </q-tr>
        </q-table>
        </div>
      </q-jumbotron>
  </div>
</template>

<script>
import configManager from '../../util/ConfigManager'
import Ledger from "volentix-ledger"

const chainId = process.env.CHAIN_ID
const httpEndpoint = process.env.HTTP_ENDPOINT
const myaccount = process.env.ACCOUNT_NAME
let ledger = {}

export default {
  // name: 'ComponentName',
  data () {
    return {
      walletName: '',
      columns: [
        {
        name: 'date',
        required: true,
        align: 'center',
        field: 'date',
        sortable: false,
        classes: 'my-class',
        style: 'width: 500px'
      },{
        name: 'icon',
        required: true,
        align: 'center',
        field: 'type',
        sortable: false,
        classes: 'my-class',
        style: 'width: 10px'
      },
      {
        name: 'desc',
        required: true,
        align: 'center',
        field: 'name',
        sortable: false,
        classes: 'my-class',
        style: 'width: 500px'
      },
      {
        name: 'vtx',
        required: true,
        align: 'center',
        field: 'calories',
        sortable: true,
        classes: 'my-class',
        style: 'width: 500px'
      }
    ],
    tableData: [],
    balance: 0
    }
  },
  mounted() {
    this.walletName = this.$store.state.currentwallet.wallet.name
    ledger = new Ledger({
      httpEndpoint: httpEndpoint,
      chainId: chainId
    },
    process.env.LEDGER_ACCOUNT_NAME)
    this.retrieveBalance()
    this.getTransactionHistory()
  },
  methods: {
    async retrieveBalance() {
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
        console.log(this.balance);
      } catch (error) {
        console.log("Can't retrieve the balance");
      }
    },
    async getTransactionHistory() {
      try {
        const userTransactions = await ledger.retrieveTransactions({
          account: myaccount,
          wallet: this.wallet
        });
        if (userTransactions.transactions.length > 0) {
          this.transactions = userTransactions.transactions;
          this.getDate();
        }
      } catch (error) {
        console.log(error)
      }
    },
  }
}
</script>

<style lang="styl">
.q-data-table th {
    text-align:right;
}</style>
