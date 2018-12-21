<template>
  <section>
  <div class="hero is-fullheight is-paddingless has-blur-background">
    <div class="hero-head p-t-sm p-l-lg">
      <div class="has-text-centered">
        <div class="has-text-centered is-size-1 has-text-white">
          {{ $t('NotApprovedForPurchase.header') }}
          </div>
      </div> 
       <div class="container has-text-white p-md">
          <!--
          <div class="whitelist-header has-text-centered">
            {{ $t('NotWhitelisted.header') }}
          </div>
          -->
          <div class="max-width">
            
            <div class= "max-width-padding wallet-address has-background-darkgreen">
              <br>
              <div class="is-outlined">
                {{ $t('NotApprovedForPurchase.patience') }}
              </div>
              <br>
              <div class="is-outlined">
                {{ $t('NotApprovedForPurchase.approved') }}
              </div>
              <br>
              <div class="has-text-centered">
                <router-link  to="/main" class="button is-primary">
                  {{ $t('NotApprovedForPurchase.back') }}
                </router-link>
              </div>
              <br>
            </div>
          </div>
       </div>
      </div>
    </div>
  </section>
</template>

<script>
import sjcl from "sjcl";

export default {
  data() {
    return {
    };
  },
  methods: {
  }
};
</script>

<style scoped>
.whitelist-header {
  color: #f4f4f4;
  font-size: 30pt;
}
.whitelist-subheader {
  color: #f4f4f4;
  font-size: 17pt;
}
</style>
