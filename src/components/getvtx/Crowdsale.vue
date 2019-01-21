<template>
  <q-page class="flex flex-center text-white bg-main">
    <q-card style="max-width: 700px;" flat>
      <q-card-title class="text-weight-bold">
        <big class="titillium">Token Distribution</big>
      </q-card-title>
      <q-card-main class="text-left">
        <div class="q-py-sm uppercase">
          Total Claimed: {{ data.crowdsale.total_claimed.toFixed(2) }}
        </div>
        <q-progress :percentage="progress" stripe animate style="height: 15px" color="positive"/>
        <div class="row gutter fit justify-stretch content-center">
          <div class="col-6 text-left">
            0 VTX
          </div>
          <div class="col-6 text-right">
            {{ data.crowdsale.maximum_allocation }} VTX
          </div>
        </div>
        <br>
        <div class="row content-center">
          <div class="col-6 text-left">
            <div class="">
              Current Round:
            </div>
          </div>
          <div class="col-6 text-right">
            {{ data.current_round.number }}
          </div>
        </div>
        <div class="row content-center">
          <div class="col-6 text-left">
            <div class="">
              Current Price:
            </div>
          </div>
          <div class="col-6 text-right">
            {{ data.crowdsale.current_price / 100000000 }} BTC
          </div>
        </div>
        <br>
        <div class="row content-center">
          <div class="col-6 text-left">
            <div class="q-display-1">
              {{ data.current_round.vtx_available.toFixed(2) }}
            </div>
          </div>
          <div class="col-6 text-right">
            &nbsp;&nbsp;&nbsp;&nbsp;Available
          </div>
        </div>
        <br>
        <div class="row content-center">
          <div class="col-6 text-left q-display-1">
            <div class="q-display-1">
              <countdown :time="timeremaining" :transform="transform">
                <template slot-scope="props">
                  <div >
                    {{ props.days }}:
                    {{ props.hours }}:
                    {{ props.minutes }}:
                    {{ props.seconds }}
                  </div>
                </template>
              </countdown>
            </div>
          </div>
          <div class="col-6 text-right">
            &nbsp;&nbsp;&nbsp;&nbsp;Ends In
          </div>
        </div>
      </q-card-main>
    </q-card>
  </q-page>
</template>

<script>
import countdown from '@chenfengyuan/vue-countdown'

export default {
  // name: 'ComponentName',
  data () {
    return {
      data: null,
      timeremaining: 1000,
      doneCountdown: false,
      progress: 0
    }
  },
  components: {
    countdown: countdown
  },
  mounted () {
    const self = this
    this.$axios.get(process.env.CROWDFUND_URL + '/public/api/summary/').then(function (result) {
      self.data = result.data
      self.calculateValues()
      /*
      Results: {
    "current_price": 2592,
    "crowdsale": {
        "maximum_allocation": 364000000,
        "total_claimed": 233011.25803423,
        "current_price": 2592
    },
    "current_round": {
        "number": 1,
        "vtx_available": 363766988.7419658,
        "end_date": "2019-01-31 00:00:00+00:00"
    },
    "funds_raised": [
        {
            "currency": "BTC",
            "amount": 0
        },
        {
            "currency": "BCH",
            "amount": 0
        },
        {
            "currency": "ETH",
            "amount": 150
        },
        {
            "currency": "EOS",
            "amount": 0
        }
    ]
}
*/
    })
  },
  methods: {
    async calculateValues () {
      console.log('Results: ' + JSON.stringify(this.data, null, 4))
      // smaller number by the larger number
      if (this.data.crowdsale.total_claimed <= 0) {
        this.progress = 0
      } else if (this.data.crowdsale.total_claimed >= this.data.crowdsale.maximum_allocation) {
        this.progress = 0
      } else {
        this.progress = ((this.data.crowdsale.total_claimed / this.data.crowdsale.maximum_allocation) * 100)
      }
      this.timeremaining = Date.parse(this.data.current_round.end_date) - Date.now()
    },
    transform (props) {
      Object.entries(props).forEach(([key, value]) => {
        let digits = value < 10 ? `0${value}` : value
        if (key === 'totalSeconds' && value <= 0) {
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
