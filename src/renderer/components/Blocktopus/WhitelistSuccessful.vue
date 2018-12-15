<template>
  <section>
    <div class="hero-body congrats p-t-md">
      <div class="container font-gibson m-t-xl">
        <!-- warning image translation needed -->
        <img src="~@/assets/img/sunnysky.jpg">
        <div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  mounted() {
    this.redirect();
  },
  methods: {
    redirect: function() {
      const router = this.$router;
      setTimeout(function() {
        router.push({ path: "main" })
      },
      4000);
    }
  }
};
</script>

<style scoped>
.hero-body.congrats {
  background-color: #162929 !important;
}
.hero-body.congrats img {
  width: 100%;
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
</style>
