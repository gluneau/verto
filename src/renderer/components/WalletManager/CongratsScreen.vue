<template>
  <section>
    <div class="hero is-fullheight is-paddingless has-blur-background">
      <div class="font-gibson m-t-xl has-text-centered    ">
        <!-- warning image translation needed -->
        <img src="~@/assets/img/congratsScreen.png">

      </div>
    </div>
  </section>
</template>

<script>
export default {
  mounted() {
    let command = "networksetup -setairportpower en0 on";
    let exec = require("child_process").exec;
    exec(command);
    this.redirect();
  },
  methods: {
    redirect: function() {
      const router = this.$router;
      setTimeout(function() {
        router.push({ path: "main" })
      },
      2000);
    }
  }
};
</script>

<style scoped>
.hero-body.congrats {
  background-color: #162929 !important;
}
.hero-body.congrats img {
}
.congrats .font-gibson-semibold {
  color: #454f63;
  font-size: 16pt;
}
.hero-body.congrats .button.green {
  background-color: #00a6a6 !important;
  border: solid #00a6a6 2pt !important;
  border-radius: 0.6rem;
  margin-top: 3rem !important;
  height: 3.5rem;
}
.hero.is-fullheight {
  min-height: 80vh !important;
}
</style>
