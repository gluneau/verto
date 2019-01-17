<template>
  <div class="layout-padding">
    <q-jumbotron class=" bg-white text-primary">
      <div class="text-left uppercase ">
        <div class="chip label">
          <img :src="getCryptoLogoUrl(nativeChainName)" width=100>
          {{ $t('GetVtx.getvtx') }} {{ nativeChainName }}
        </div>

      </div>
      <div class="text-right uppercase  q-pa-sm">
        <q-btn outline rounded  @click="$router.push({path: 'pendingTransactions'})">View Pending Transactions</q-btn>
      </div>

      <div class="row gutter justify-stretch content-center q-pa-sm" v-if="!doneCountdown">
          <div class="col-9 text-left q-pa-sm">
              <q-list>
                <q-item>
                  <q-item-main class="text-bold">
                    {{ nativeChainName }} {{ $t('GetVtx.native_chain_address') }}
                  </q-item-main>
                </q-item>
                <q-item>
                  <q-item-main v-bind:label="nativeChainAddress" />
                </q-item>

                <q-item>
                  <q-item-main >
                    <div class="text-left">
                      <countdown :time="timeremaining" :transform="transform">
                        <template slot-scope="props">
                          <div v-bind:class="{ oneminuteleft: underOneMinuteLeftInTimer, overoneminuteleft: !underOneMinuteLeftInTimer }">
                            <span v-if="!underOneMinuteLeftInTimer">{{ props.minutes }}:</span>
                            {{ props.seconds }}
                          </div>
                        </template>
                      </countdown>
                    </div>
                    <div class="text-right">
                      <q-btn outline rounded >Copy</q-btn>
                    </div>
                  </q-item-main>
                </q-item>
              </q-list>
          </div>
      </div>
      <div class="row gutter round-borders bg-primary justify-stretch content-center q-pa-lg" v-if="doneCountdown">
        <div class="col-12 text-center text-white q-pa-sm q-display-4">
          <q-icon name="av_timer" size="8rem"/>
          Times Up
        </div>
      </div>
    </q-jumbotron>
  </div>
</template>

<script>
import countdown from '@chenfengyuan/vue-countdown'

export default {
  // name: 'Get VTX',
  data () {
    return {
      nativeChainAddress: null,
      validUntil: null,
      nativeChainName: null,
      timeremaining: 0,
      underOneMinuteLeftInTimer: false,
      doneCountdown: false,
      isCardModalActive: false
    }
  },
  components: {
    countdown: countdown
  },
  created () {
    this.nativeChainAddress = this.$route.query.native_chain_address
    this.validUntil = this.$route.query.valid_until
    this.nativeChainName = this.$route.query.native_chain_name
    const serverTime = this.$route.query.server_time
    const potentialTimeRemaining = Date.parse(this.validUntil) - Date.parse(serverTime)
    if (potentialTimeRemaining > 0) {
      this.timeremaining = potentialTimeRemaining
    }
  },
  methods: {
    getCryptoLogoUrl (chainName) {
      return require('../../assets/img/currencies/' + chainName + '.png')
    },
    transform (props) {
      Object.entries(props).forEach(([key, value]) => {
        let digits = value < 10 ? `0${value}` : value
        if (key === 'totalMinutes' && value <= 0) {
          this.underOneMinuteLeftInTimer = true
        } else if (key === 'totalSeconds' && value <= 0) {
          this.doneCountdown = true
        }
        props[key] = `${digits}`
      })

      return props
    }
  }
}
</script>

<style>
</style>
