<template>
  <div class="layout-padding">
      <q-jumbotron class=" bg-white text-primary">
        <div class="text-left text-weight-bold uppercase q-pa-lg">
          <big>Wallet / {{ walletName }}</big>
        </div>
        <div class="row gutter wrap justify-stretch content-center ">
          <div class="col-1 text-center">
            <label>VTX Balance</label>
            <br>
            <label>0.0</label>
          </div>
          <div class="col-1 text-center">
            <label>Value In BTC</label>
            <br>
            <label>0.0</label>
          </div>
          <div class="col-10 text-right">Scan QR Code</div>
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
    console.log('lll: ' + configManager.currentWallet)
    const currentWallet = { "name": "HARDCODED", "key": "EOS4V5VUFEKPP1HZTPNO1UVRF195JDFBRNBMVMSB8SEIT4DZR1TBF", "defaultkey": true }
    this.walletName = currentWallet.name
  },
  methods: {

  }
}
</script>

<style lang="styl">
.q-data-table th {
    text-align:right;
}</style>
