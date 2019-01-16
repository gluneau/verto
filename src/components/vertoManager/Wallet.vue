<template>
  <div>
      <q-jumbotron class=" bg-white text-primary">
        <div class="text-left text-weight-bold uppercase q-pa-lg">
          <big>Wallet / {{ walletName }}</big>
        </div>
        <div class="row gutter wrap justify-stretch content-center ">
          <div class="col-2 text-center">
            <p class="q-caption">VTX Balance</p>
            <p class="q-title">0.00</p>
          </div>
          <div class="col-2 text-center">
            <p class="q-caption">Value In BTC</p>
            <p class="q-title">0.00</p>
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

export default {
  // name: 'ComponentName',
  data () {
    return {
      walletName: '',
      columns: [
        {
        name: 'date',
        required: true,
        label: 'Date',
        align: 'center',
        field: 'date',
        sortable: true,
        classes: 'my-class',
        style: 'width: 500px'
      },{
        name: 'icon',
        required: true,
        label: 'Type',
        align: 'center',
        field: 'type',
        sortable: true,
        classes: 'my-class',
        style: 'width: 10px'
      },
      {
        name: 'desc',
        required: true,
        label: 'Dessert (100g serving)',
        align: 'center',
        field: 'name',
        sortable: true,
        classes: 'my-class',
        style: 'width: 500px'
      },
      {
        name: 'vtx',
        required: true,
        label: 'VTX',
        align: 'center',
        field: 'calories',
        sortable: true,
        classes: 'my-class',
        style: 'width: 500px'
      }
    ],
    tableData: [
      {
        name: 'Tranascation 1 details',
        date: 'AUG 1',
        calories: 159,
        type: 'SEND'

      },
      {
        name: 'Tranascation 2 Details',
        date: 'AUG 1',
        calories: 159,
        type: 'RECEIVE'
      }
    ]
    }
  },
  mounted() {
    this.walletName = this.$store.state.currentwallet.wallet.name
  },
  methods: {

  }
}
</script>

<style lang="styl">
.q-data-table th {
    text-align:right;
}</style>
