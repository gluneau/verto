<template>
    <div class="PendingCounter">
        <!-- <div v-if="numberOfPendingTransactions == 0" class=""> -->
            <router-link to="/gettxtransactionhistory" class="pending">
              {{ $t('PendingCounter.title') }}: ( {{ numberOfPendingTransactions}} )
            </router-link>
        <!-- </div> -->
    </div>
</template>

<script>
import axios from 'axios'
import { setInterval, clearInterval } from 'timers';

export default {
  name: 'pending',
  data() {
    return {
      numberOfPendingTransactions: 0,
      pendingTxnPooling: null
    };
  },
  mounted () {
    this.poolTransactions()
  },
  beforeDestroy () {
    clearInterval(this.pendingTxnPooling)
  },
  methods: {
    getNumPendingTransactions: function() {
      let url = process.env.CROWDFUND_URL + "/public/api/investor-transactions?verto_public_address=" + this.$store.state.currentWallet.key + "&status_code=" + "CONVERTED";
      const router = this.$router;
      const self = this;
      axios.get(url).then(function (response) {
        let numTransactions = 0;
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].status === 'CONVERTED') {
            numTransactions++;
          }
        }
        self.numberOfPendingTransactions = numTransactions;
      }).catch(function (error) {
        console.log(error);
      });
    },
    poolTransactions: function() {
      let vm = this
      this.pendingTxnPooling = setInterval(function () {
        vm.getNumPendingTransactions()
      }, 3000);
    }
  }
}
</script>
<style scoped>
.pending {
  color: #00DEB1;
  font-size: 12pt;
}
.nothing {
}
.highlightNumberTwo {
  color: #f4f4f4;
  font-size: 20pt;
  font-weight: bold;
}
.has-blur-background {
  background-image: url(~@/assets/img/transaction-back-screen.jpg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>
