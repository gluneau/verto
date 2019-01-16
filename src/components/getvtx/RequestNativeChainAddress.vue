<template>
  <div class="layout-padding">
    <q-jumbotron class=" bg-white text-primary text-center ">
      <div class="text-weight-bold uppercase q-pa-lg">
        <big>{{ $t('RequestNativeChainAddress.header') }}</big>
      </div>
      <q-card class="vertical-middle" style="width: 500px">
  
        <q-card-separator />
        <q-card-main>
            <q-list highlight>
                <q-list-header>{{ $t('RequestNativeChainAddress.first_p') }}</q-list-header>
                <q-item>
                    <q-item-main v-bind:label="$t('RequestNativeChainAddress.second_p')" />
                </q-item>
                <q-item>
                    <q-item-main v-bind:label="$t('RequestNativeChainAddress.second_p_point_1')" />
                </q-item>
                <q-item>
                    <q-item-main v-bind:label="$t('RequestNativeChainAddress.third_p')" />
                </q-item>
                <q-item>
                    <q-checkbox v-model="agree" color="yellow" @change.native="buttondisabled = !buttondisabled" >&nbsp;{{ $t('RequestNativeChainAddress.access') }}</q-checkbox>
                </q-item>
            </q-list>
        </q-card-main>
      </q-card>
      
        
        <div v-if="agree">
            <div class="q-pa-lg">
                {{ $t('RequestNativeChainAddress.select_currency') }}
            </div>
            <div class="q-pa-sm">
                <q-select
                separator
                v-model="currency"
                :options="options"
                />
            </div>
            <div class="text-center q-pa-lg">
              <q-btn  outline rounded @click="submit">{{ $t('RequestNativeChainAddress.button') }}</q-btn>
            </div>
        </div>
        
    </q-jumbotron>
    <q-modal v-model="showModal" minimized ref="modalRef">
      <div style="padding: 50px" class="text-center">
        <div class="q-display-1 q-mb-md">Error</div>
        <div class="q-pa-sm">
          {{ errorMessage }}
        </div>
        <div class="q-pa-sm">
          <q-btn outline rounded  @click="ok">OK</q-btn>
        </div>
      </div>
    </q-modal>
  </div>
</template>

<script>
import getVtxHelper from '../../util/GetVtxHelper';
import axios from 'axios'

export default {
  data() {
    return {
        currency: 'BTC',
        showModal: false,
        pendingTransactionsExist: false,
        investorMustWait: false,
        buttondisabled: true,
        agree:false,
        options: [
            { 
            label: 'Bitcoin',
            value: 'BTC'
            },
            {
            label: 'Ethereum',
            value: 'ETH'
            },
            {
            label: 'EOS',
            value: 'EOS'
            }
        ],
        errorMessage: 'Default message'
    };
  },
  mounted() {
  },
  methods: {
    async submit() {
        this.showModal = false;
        let hashResult = await axios.post(
        process.env.CROWDFUND_URL + "/public/api/initiate-transaction/",
            {
            verto_public_address: this.$store.state.currentWallet.key,
            currency: this.currency
            }
        );
        const res = await hashResult;
        if (res.data.success) {
            this.$router.push({ path: "begingetvtx" })
        } else {
            if (res.data.error_code === 'no_address_available') {
                this.message = $t('RequestNativeChainAddress.err_noAddressAvailable')
                this.showModal = true;
            } else if (res.data.error_code === 'pending_transactions_exist') {
                this.message = $t('RequestNativeChainAddress.err_pendingTransactionsExist')
                this.showModal = true;
            } else if (res.data.error_code === 'investor_must_wait') {

                this.message = $t('RequestNativeChainAddress.time_remaining')
                /*
                this.showModal = true;
                const waitUntil = res.data.data.next_available_time
                const serverTime = res.data.data.server_time;
                this.timeremaining = Date.parse(waitUntil) - Date.parse(serverTime)
                this.investorMustWait = true;
                */
            }
        }
    },
    ok: function() {
        this.showModal = false
    }
  }
};
</script>
<style>
</style>
