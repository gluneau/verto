<template>
  <div class="fit text-white text-center bg-primary">
    <div class="q-pa-xl">
      <a class="" @click="updateLanguage('en')">
        <q-icon name="account_balance_wallet" size="2rem"/>
        <div class="q-headline">English</div>
      </a>
    </div>
    <div class="q-pa-xl">
      <a class="" @click="updateLanguage('fr')">
        <q-icon name="account_balance_wallet" size="2rem"/>
        <div class="q-headline">French</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LangDrawer',
  data () {
    return {
      open: false,
      langs: ['en', 'fr', 'ru', 'es', 'el', 'ar', 'tr', 'pl', 'zh', 'nl', 'az', 'pt', 'sr', 'fil'],
      showParents: true,
      appVersion: this.$appVersion,
      appName: this.$appName
    }
  },
  methods: {
    updateLanguage: function (lang) {
      this.$i18n.locale = lang
    }
  }
}
</script>

<style>
</style>
