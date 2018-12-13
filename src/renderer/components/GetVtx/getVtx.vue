<template> 
  <div class="hero is-fullheight is-paddingless has-blur-background">
    <div class="hero-head p-t-sm">
      <div class="control p-md has-text-centered">
        
        <img v-if="!doneCountdown" src="~@/assets/img/ethereum.png" class="logo">
        <div class="getvtx-header">
          {{ $t('GetVtx.getvtx') }} {{ nativeChainName }}
        </div>
        <pending-counter/>
        <div class="container has-text-white p-md">

          <countdown :time="timeremaining" :transform="transform">
            <template slot-scope="props">
              <div v-bind:class="{ oneminuteleft: underOneMinuteLeftInTimer, overoneminuteleft: !underOneMinuteLeftInTimer }">
                <span v-if="!underOneMinuteLeftInTimer">{{ props.minutes }}:</span>
                {{ props.seconds }}
              </div>
            </template>
          </countdown>
          <div v-if="!doneCountdown">
            <div class="container has-text-centered">
              <a @click="isCardModalActive = true">
                <qrcode :value="nativeChainAddress" :options="{ size: 140 }" class="has-text-centered"></qrcode>
              </a>
            </div>
            <br>
            <span id="wallet-address">{{ nativeChainAddress }}</span>
            <br>
            <br>
            <div class="is-1 is-paddingless line-height-md">
                <a v-clipboard:copy="nativeChainAddress" id="button-copy-wallet-address" @click="toast">
                  <font-awesome-icon icon="copy" class="is-size-1 has-text-white"/>
                </a>
              </div>
          </div>
          <br>
        </div>
      </div>
    </div>
    <b-modal :active.sync="isCardModalActive" class="">
      <div class="card has-text-centered has-background-black has-text-white">
          <div class="card-content qr-modal image qr-modal">
            <div class="modal-header  is-size-1">
              <slot name="header">
                {{ nativeChainName }}<br> {{ $t('GetVtx.native_chain_header') }}
              </slot>
            </div>
            <div>
              <br>
              <ul>
                <li>
                   <qrcode :value="nativeChainAddress" :options="{ size: 220 }" class="has-text-centered"></qrcode>
                </li>
                <li>
                  <br>
                  <b-tooltip :label="nativeChainAddress" position="is-bottom" class="m-l-lg" type="is-white" style="width:80%">
                    <div class="column is-11 is-paddingless wallet-address is-size-7 font-calibri">
                      <span id="wallet-address">{{ nativeChainAddress }}</span>
                    </div>
                  </b-tooltip>
                  <br>
                  <br>
                  <a v-clipboard:copy="nativeChainAddress" id="button-copy-wallet-address" @click="toast">
                    <font-awesome-icon icon="copy" class="is-size-3 has-text-white"/>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
import { timingSafeEqual } from 'crypto';
import PendingCounter from '@/components/GetVtx/PendingCounter'

export default {
  data() {
    return {
      nativeChainAddress: null,
      validUntil: null,
      nativeChainName: null,
      timeremaining: 0,
      underOneMinuteLeftInTimer: false,
      doneCountdown: false,
      isCardModalActive: false
    };
  },
  components: {
    'pending-counter': PendingCounter
  },
  created() {
    this.nativeChainAddress = this.$route.query.native_chain_address;
    this.validUntil = this.$route.query.valid_until;
    this.nativeChainName = this.$route.query.native_chain_name;
    const serverTime = this.$route.query.server_time;
    const potentialTimeRemaining = Date.parse(this.validUntil) - Date.parse(serverTime)
    console.log(potentialTimeRemaining)
    if (potentialTimeRemaining > 0) {
      this.timeremaining = potentialTimeRemaining;
    }
  },
  methods: {
    toast() {
      this.$toast.open({
        type: "is-white",
        message: this.$t('Main.copied'),
        duration: 2000
      });
    },
    transform(props) {
      Object.entries(props).forEach(([key, value]) => {
        let digits = value < 10 ? `0${value}` : value;
        if (key === 'totalMinutes' && value <= 0) {
          this.underOneMinuteLeftInTimer = true;
        } else if (key === 'totalSeconds' && value <= 0) {
          this.doneCountdown = true;
        }
        props[key] = `${digits}`;
      });

      return props;
    }
  }
};
</script>

<style scoped>
.button {
  border-radius: 0.6rem;
  width: 9rem;
}
input {
  border-radius: 0.7rem;
}
.is-size-custom-header {
  font-size: 1.7rem;
}
.logo {
  height: 8.3rem;
}
.is-size-vtx-amount {
  font-size: 2.7rem;
}
.has-blur-background {
  background-image: url(~@/assets/img/transaction-back-screen.jpg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.wallet-address {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 1px;
}
.getvtx-header {
  color: #f4f4f4;
  font-size: 30pt;
}
.overoneminuteleft {
  color: #f4f4f4;
  font-size: 40pt;
}
.oneminuteleft {
  color: red;
  font-size: 100pt;
}
.getvtx-subheader {
  color: #f4f4f4;
  font-size: 17pt;
}
</style>
