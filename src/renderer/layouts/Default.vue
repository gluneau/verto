<script>
import NavBar from "@/components/layout/NavBar";
import SideBar from "@/components/layout/SideBar";
import FooterBar from "@/components/layout/FooterBar";

export default {
  components: {
    NavBar,
    SideBar,
    FooterBar
  }
};
</script>

<template>
  <div style="min-height: 100vh">
    <nav-bar />

    <div class="section is-dark">
      <div class="columns">
        <div class="column is-12 ">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>