<template>
  <div class="bg-white q-pa-sm">
    <q-jumbotron class="text-left text-primary">
      <div class="text-weight-bold uppercase q-pa-lg">
        <big>Transactions</big>
      </div>
      <div class="row gutter justify-stretch content-center q-pa-sm">
          <div class="col-2 text-center q-pa-sm">
              sad
          </div>
          <div class="col-3 text-left q-pa-sm">
              <q-select
                separator
                v-model="transactionStatus"
                :options="options"
                @input="refreshContent"
                />
          </div>
      </div>
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
                    {{ col.value }}
                </q-td>
            </q-tr>
        </q-table>
      </div>
    </q-jumbotron>
  </div>
</template>

<script>
import configManager from '../../util/ConfigManager'
import axios from 'axios'

export default {
  // name: 'ComponentName',
  data () {
    return {
        transactionStatus: 'CONVERTED',
        hasTransactions: false,
        options: [
            { 
            label: 'Cancelled',
            value: 'CANCELLED'
            },
            {
            label: 'Pending',
            value: 'CONVERTED'
            },
            {
            label: 'Accepted',
            value: 'CONFIRMED'
            },
            {
            label: 'Completed',
            value: 'COMPLETED'
            }
        ],
        columns: [
            {
                name: 'conversionTime',
                required: true,
                align: 'center',
                field: 'conversion_time',
                label: 'Transaction Received',
                sortable: false,
                classes: 'my-class',
                style: 'width: 500px'
            },
            {
                name: 'confirmationTime',
                required: true,
                align: 'center',
                field: 'confirmation_time',
                label: 'Confirmation Time',
                sortable: false,
                classes: 'my-class',
                style: 'width: 500px'
            },
            {
                name: 'vtxAmount',
                required: true,
                align: 'center',
                label: 'VTX',
                field: 'vtx_amount',
                sortable: false,
                classes: 'my-class',
                style: 'width: 500px'
            }            
        ],
        tableData: []
    }
  },
  mounted() {
      this.getPendingTransactions();
  },
  methods: {
    async getPendingTransactions() {
        console.log("GETTING TRANSACTIONS")
        let results = await axios.get(process.env.CROWDFUND_URL + "/public/api/investor-transactions?verto_public_address=" + this.$store.state.currentwallet.wallet.key + "&status_code=" + this.transactionStatus);
        console.log("GETTING TRANSACTIONS2222222222222222")
        console.log(JSON.stringify(results.data, null, 4))
        this.tableData = results.data
        /*
        {
            "id": 98,
            "status": "COMPLETED",
            "pool": "private",
            "entry_path": "verto",
            "native_chain_address": "0x6507f7dacfc2c98a00964d2dd9e6cc5211304d590798114d57ba665c34087e76",
            "native_currency": "ethereum",
            "native_amount": 0.1,
            "conversion_rate": 2590,
            "pre_bonus_vtx_amount": 134.45684882,
            "phase_bonus_vtx_amount": 0,
            "additional_bonus_vtx_amount": 0,
            "vtx_amount": 134.45684882,
            "confirmations_count": 7,
            "native_transaction_time": "2019-01-10T16:49:25Z",
            "conversion_time": "2019-01-10T16:49:50.888775Z",
            "confirmation_time": "2019-01-10T16:51:10.971257Z",
            "ledger_transaction_id": "30359b02fb565a48bab5dd37b28a2d2dd072f950824959f656edf3bcc02ad498",
            "approved_time": "2019-01-10T16:51:17.643652Z",
            "countdown_time_ends": null,
            "cancel_time": null,
            "server_time": "2019-01-16T22:32:54.664557Z"
        }
        */
    },
    refreshContent() {
        console.log("Reefresh")
      this.hasTransactions = false
      this.transactions = []
      this.getPendingTransactions();
    }
  }
}
</script>