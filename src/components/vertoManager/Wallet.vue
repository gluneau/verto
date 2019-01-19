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
            <p class="q-title"> {{ currentBtcValue }} </p>
          </div>
          <div class="col-8 text-right">
            <q-btn outline label="Scan QR" @click="isCardModalActive = true"/>
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
        <q-modal v-model="isCardModalActive">
          <q-btn flat dense round size="lg" icon="close" color="white" class="close-button" @click="isCardModalActive = false" />
          <div class="row gutter-sm bg-dark q-pa-lg text-white">
            <div class="col-auto flex flex-center">
              <div class="q-pr-md">
                <qrcode :value="walletKey" :options="{size: 150}"></qrcode>
              </div>
            </div>
            <div class="col flex items-center">
              <div>
                <div class="q-headline">{{ $t('Main.address') }}</div>
                <p class="q-pr-md q-py-md q-ma-none" >{{walletKey}}</p>
                <q-btn flat class="bg-white text-black" icon="file_copy" label="Copy Key" @click="copyKey(walletKey)" />
              </div>
            </div>
          </div>
        </q-modal>
      </q-jumbotron>
  </div>
</template>

<script>
// import configManager from '../../util/ConfigManager'
import Ledger from 'volentix-ledger'
import VueQrcode from '@xkeshi/vue-qrcode'
import Vue from 'vue'
import moment from 'moment'
Vue.component(VueQrcode.name, VueQrcode)

const chainId = process.env.CHAIN_ID
const httpEndpoint = process.env.HTTP_ENDPOINT
const myaccount = process.env.ACCOUNT_NAME
let ledger = {}

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(value).format('MMM DD, YYYY')
  }
})

Vue.filter('formatTime', function (value) {
  if (value) {
    return moment(value).format('h:mm A')
  }
})

export default {
  // name: 'ComponentName',
  data () {
    return {
      walletName: '',
      walletKey: '',
      columns: [
        {
          name: 'date',
          required: true,
          align: 'center',
          field: 'timestamp',
          sortable: false,
          classes: 'my-class',
          style: 'width: 500px'
        }, {
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
          field: 'amount',
          sortable: true,
          classes: 'my-class',
          style: 'width: 500px'
        }
      ],
      tableData: [],
      transactions: [],
      balance: 0,
      currentBtcValue: 0,
      isCardModalActive: false
    }
  },
  mounted () {
    this.walletName = this.$store.state.currentwallet.wallet.name
    this.walletKey = this.$store.state.currentwallet.wallet.key
    ledger = new Ledger({
      httpEndpoint: httpEndpoint,
      chainId: chainId
    },
    process.env.LEDGER_ACCOUNT_NAME)
    this.retrieveBalance()
    this.getTransactionHistory()
  },
  methods: {
    async retrieveBalance () {
      try {
        // TODO: Remove the hardcoding of vltxtgevtxtr
        const balance = await ledger.retrieveBalance({
          account: myaccount,
          wallet: this.walletKey
        },
        'vltxtgevtxtr')
        this.balance = parseFloat(balance.amount).toFixed(2)
        if (this.balance > 0) {
          let results = await this.$axios.get(process.env.CROWDFUND_URL + '/public/api/summary/')
          this.currentBtcValue = ((results.data.current_price * this.balance) / 100000000)
        }
      } catch (error) {
        console.log("Can't retrieve the balance")
      }
    },
    async getTransactionHistory () {
      try {
        const userTransactions = await ledger.retrieveTransactions({
          account: myaccount,
          wallet: this.walletKey
        })
        if (userTransactions.transactions.length > 0) {
          this.transactions = userTransactions.transactions
          this.transactions = this.transactions.reverse()
          this.getDate()
          this.tableData = this.transactions
        }
      } catch (error) {
        console.log(error)
      }
    },
    getDate () {
      for (let i = 0; i < this.transactions.length; i++) {
        this.transactions[i].timestamp =
          parseInt(this.transactions[i].timestamp) / 1000
        this.transactions[i].timestamp = moment(this.transactions[i].timestamp).format('MMM DD, YYYY')
      }
    },
    copyKey (key) {
      this.$clipboardWrite(key)
      this.$q.notify({
        message: 'Copied',
        type: 'positive'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.q-data-table th
  text-align right
.close-button
  position absolute
  right 5px
  top 5px
</style>
