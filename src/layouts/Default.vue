<template>
  <q-layout> <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-layout-header>
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="menu"
          @click="optionsDrawer = !optionsDrawer"
          v-if="hasCurrentWallet()"
        />
        <q-toolbar-title>
          Verto
          <!-- <span slot="subtitle">Subtile</span> -->
        </q-toolbar-title>
        <q-btn
          flat
          round
          dense
          icon="menu"
          @click="langDrawer = !langDrawer"
        />
      </q-toolbar>
    </q-layout-header>

      <!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->
      <q-layout-drawer
        side="left"
        v-model="optionsDrawer"
        content-class="row"
        v-if="hasCurrentWallet()"
      >
        <div class="col-12 column bg-primary">
          <options-drawer/>
        </div>
      </q-layout-drawer>
      <q-layout-drawer
        side="right"
        v-model="langDrawer" content-class="row"
      >
        <div class="col-12 column bg-primary">
          <lang-drawer/>
        </div>
      </q-layout-drawer>
      <q-page-container class=" bg-main">
        <!-- This is where pages get injected -->
        <router-view />
      </q-page-container>

  </q-layout>
</template>

<script>
import configManager from '../util/ConfigManager'
import LangDrawer from '../components/layout/LangDrawer'
import OptionsDrawer from '../components/layout/OptionsDrawer'

export default {
  name: 'Default',
  components: { LangDrawer, OptionsDrawer },
  data () {
    return {
      optionsDrawer: this.$q.platform.is.desktop,
      langDrawer: false
    }
  },
  methods: {
    hasWallets: function () {
      return configManager.hasWallets()
    },
    hasCurrentWallet: function () {
      return configManager.hasCurrentWallet()
    }
  }
}
</script>

<style scoped>
.bg-white {
  min-height: 90vh;
}
</style>
