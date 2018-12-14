<template>
  <section class="has-background-darkgreen">
    <iframe :src="vespucciLink"/>
  </section>
</template>

<script>
import sjcl from "sjcl"
import EventBus from '../../bus'

export default {
  data() {
    return {
      username: "",
      email: "",
      amount: 0,
      currency: 'BTC',
      vespucciLink: "https://vespucci.site?embed"
    };
  },
  beforeMount() {
    EventBus.addListener(this.callback);
  },
  destroyed() {
    EventBus.removeListener(this.callback)
  },
  methods: {
    signup: function() {
      this.$router.push("main")
    },
    callback: function(e) {
      console.log("Data: " + e.data);
    }
  }
};
</script>

<style scoped>
#vespucciiframe
{
    height:   100%;
    left:     0px;
    position: absolute;
    top:      0px;
    width:    100%;
}
</style>
