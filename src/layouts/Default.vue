<template>
  <q-layout class=" bg-secondary"
  > <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-layout-header>
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="menu"
          @click="optionsDrawer = !optionsDrawer"
        />
        <q-toolbar-title>
          Verto
          <span slot="subtitle">Subtile</span>
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
        behavior="desktop" content-class="row"
      >
        <div class="col-12 column bg-secondary q-pa-sm">
          <options-drawer/>
        </div>
      </q-layout-drawer>
      <q-layout-drawer
        side="right"
        v-model="langDrawer"
        behavior="desktop" content-class="row"
      >
        <div class="col-12 column bg-secondary q-pa-sm">
          <lang-drawer/>
        </div>
      </q-layout-drawer>
      <q-page-container class=" bg-secondary">
        <!-- This is where pages get injected -->
        <router-view />
      </q-page-container>
    
  </q-layout>
</template>

<script>
import LangDrawer from '../components/layout/LangDrawer'
import OptionsDrawer from '../components/layout/OptionsDrawer'

export default {
  name: 'Default',
  components: { LangDrawer, OptionsDrawer },
  data () {
    return {
      optionsDrawer: true,
      langDrawer: false
    }
  }
}
</script>

<style>
</style>
