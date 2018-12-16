<template>
  <div class="hero-foot">
      <div class="container has-background-darklightgreen p-md has-text-light">
        {{ appName }}: {{ appVersion }}
      </div>
    </div>
</template>

<script>
import Ledger from "volentix-ledger";
import axios from 'axios'

const chainId = process.env.CHAIN_ID
const httpEndpoint = process.env.HTTP_ENDPOINT

const myaccount = "vtxtrust";
let ledger = {};

export default {
  data() {
    return {
      appVersion: this.$appVersion,
      appName: this.$appName
    };
  },
  methods: {
  }
};
</script>
