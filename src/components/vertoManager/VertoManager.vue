<template>
  <div>
    <q-jumbotron class=" bg-white text-primary">
      <div class="text-left text-weight-bold uppercase q-pa-lg">
        <big>{{ $t('WalletManager.header') }}</big>
      </div>
      <div class="row gutter wrap justify-stretch content-center q-pa-lg">
          <div class="col-2 text-center q-pa-lg" @click="addingWallet = !addingWallet">
            <q-card>
              <q-card-title>
                <q-icon name="account_balance_wallet" size="2rem"/>
              </q-card-title>
              <q-card-main>
                {{ $t('CreateVertoPassword.addwallet') }}
              </q-card-main>
            </q-card>
          </div>
          <div class="col-2 text-center q-pa-lg" @click="createWallet()">
            <q-card >
              <q-card-title>
                <q-icon name="account_balance_wallet" size="2rem"/>
              </q-card-title>
              <q-card-main>
                {{ $t('CreateVertoPassword.createwallet') }}
              </q-card-main>
            </q-card>
          </div>
      </div>
      <div class="row items-center" v-if="!addingWallet">
        <q-table
          title="Wallets"
          :data="tableData"
          :columns="columns"
          row-key="key"
        >
          <q-tr  :id="props.row.id" slot="body" slot-scope="props" :props="props" class="cursor-pointer">
            <q-td
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              <div v-if="col.name === 'name'" class="text-right uppercase">
                <q-btn outline rounded @click="changeWallet(props.row)">{{ col.value }}</q-btn>
              </div>
              <div v-if="col.name === 'default'" class="text-left">
                <div v-if="col.value" class="q-pa-lg">
                  <q-checkbox v-model="props.row.defaultKey" color="blue" disable>

                  </q-checkbox>
                </div>
                <div v-else class="q-pa-lg">
                  <q-checkbox v-model="props.row.defaultKey" color="blue" @input="changeDefault(props.row)" />
                </div>
              </div>
              <div v-if="col.name === 'defaulttxt'" class="text-right">
                <div v-if="props.row.defaultKey" class="q-pa-lg">
                  Default Wallet
                </div>
              </div>
              <div v-if="col.name === 'associations'" class="text-right">
                  <q-btn outline rounded @click="showAssociations(props.row)">Associations</q-btn>
              </div>
              <div v-if="col.name === 'delete'" class="text-right" @click="deleteWallet(props.row)">
                <q-icon name="delete_forever" size="2rem" color='red'/>
              </div>
            </q-td>
          </q-tr>
        </q-table>
      </div>
      <div class="row items-center" v-if="addingWallet">
        <q-card inline style="width: 700px" class="text-left">
        <q-card-separator />
          <q-list>
            <div class="text-left q-pa-lg">
              <div class="uppercase q-pa-lg">
                {{ $t('CreateVertoPassword.addwallet') }}
              </div>
              <div class="q-pa-sm">
                <q-field
                  :error="addWallet.walletNameEmpty"
                  v-bind:error-label="$t('WalletManager.used')"
                  :count="100"
                >
                  <q-input v-model="addWallet.walletName" :error="addWallet.walletNameEmpty" color="blue" v-bind:float-label="$t('DisplayKey.walletname')"  />
                </q-field>
              </div>
              <div class="q-pa-sm">
                <q-field
                  :error="addWallet.addressEmpty"
                  v-bind:error-label="$t('WalletManager.both')"
                  :count="100"
                >
                  <q-input v-model="addWallet.address" :error="addWallet.addressEmpty" color="blue" v-bind:float-label="$t('WalletManager.keyhere')"  />
                </q-field>
              </div>
              <div class="q-pa-sm">
                <q-field
                  :error="addWallet.vertoPasswordEmpty"
                  v-bind:error-label="$t('Welcome.incorrect')"
                  :count="100"
                >
                  <q-input v-model="addWallet.vertoPassword" :error="addWallet.vertoPasswordEmpty" color="blue" v-bind:float-label="$t('CreateVertoPassword.vertopassword')"  />
                </q-field>
              </div>
              <div class="row text-right q-pa-lg">
                <div class="col-2  q-pa-lg">
                  <q-btn  outline rounded @click="cancelAddVertoAddress">{{ $t('WalletManager.cancel') }}</q-btn>
                </div>
                <div class="col-2  q-pa-lg">
                  <q-btn outline rounded @click="addVertoAddress">{{ $t('SaveYourKeys.create') }}</q-btn>
                </div>
              </div>
            </div>
          </q-list>
        </q-card>
      </div>
    </q-jumbotron>
    <q-modal v-model="associations.showModal" minimized ref="modalRef">
      <div style="padding: 50px" class="text-center">
        <div v-if="associations.walletToShow.associations">
          <div v-for="association in associations.walletToShow.associations">
            {{ association.name }}
          </div>
        </div>
        <div v-if="!associations.walletToShow.associations">
          No Associations
        </div>
        <div class="q-pa-sm">
          <q-btn outline rounded  @click="ok">OK</q-btn>
        </div>
      </div>
    </q-modal>
  </div>
</template>

<script>
import configManager from '../../util/ConfigManager'

export default {
  // name: 'ComponentName',
  data () {
    return {
      columns: [
        {
          name: 'name',
          required: true,
          align: 'center',
          field: 'name',
          sortable: false,
          classes: 'my-class',
          style: 'width: 110px'
        },{
          name: 'default',
          required: false,
          align: 'center',
          field: 'defaultKey',
          sortable: false,
          classes: 'my-class',
          style: 'width: 200px'
        },{
          name: 'defaulttxt',
          required: false,
          align: 'center',
          sortable: false,
          classes: 'my-class',
          style: 'width: 100px'
        },{
          name: 'associations',
          required: false,
          align: 'center',
          sortable: false,
          classes: 'my-class',
          style: 'width: 50px'
        },{
          name: 'delete',
          required: false,
          align: 'center',
          sortable: false,
          classes: 'my-class',
          style: 'width: 5000px'
        }
      ],
      tableData: [],
      addingWallet: false,
      addWallet: {
        walletNameEmpty: false,
        walletName: '',
        addressEmpty: false,
        address: '',
        vertoPasswordEmpty: false,
        vertoPassword: ''
      },
      associations: {
        showModal: false,
        walletToShow: {}
      }
    }
  },
  mounted() {
    this.tableData = this.$store.state.currentwallet.config.keys
  },
  methods: {
    ok: function() {
      this.associations.walletToShow = {}
      this.associations.showModal = false
    },
    changeWallet:function(row) {
      configManager.updateCurrentWallet(row)
      this.$router.push({path: '/wallet'})
    },
    showAssociations:function(row) {
      this.associations.walletToShow = row
      this.associations.showModal = true
    },
    viewAssociations: function(row) {
      console.log('associations ' + JSON.stringify(row))
    },
    changeDefault: function(row) {
      console.log('Coolll ' + JSON.stringify(row))
    },
    deleteWallet: function(row) {
      console.log("Deletenig row: " + row)
    },
    createWallet: function() {
      this.$router.push('/keepYourKeysafe')
    },
    addVertoAddress: function() {
      this.addWallet.walletNameEmpty = false
      this.addWallet.addressEmpty = false
      this.addWallet.vertoPasswordEmpty = false

      if (!this.addWallet.walletName) {
        this.addWallet.walletNameEmpty = true
        return
      }
      if (!this.addWallet.address) {
        this.addWallet.addressEmpty = true
        return
      }
      if (!this.addWallet.vertoPassword) {
        this.addWallet.vertoPasswordEmpty = true
        return
      }
      const result = configManager.addWallet(this.addWallet.walletName, this.addWallet.vertoPassword, this.addWallet.address)
      if (result.success) {
        this.cancelAddVertoAddress()
      } else if(result.message === 'bad_password') {
        this.addWallet.vertoPasswordEmpty = true
      } else {
        this.addWallet.walletNameEmpty = true
      }
    },
    cancelAddVertoAddress: function() {
      this.addWallet.walletNameEmpty = false
      this.addWallet.addressEmpty = false
      this.addWallet.vertoPasswordEmpty = false

      this.addWallet.walletName = ''
      this.addWallet.address = ''
      this.addWallet.vertoPassword = ''

      this.addingWallet = false
    }
  }
}
</script>

<style>
</style>
