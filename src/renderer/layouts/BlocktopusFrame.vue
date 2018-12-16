<script>
import NavBar from "@/components/layout/NavBar";

export default {
  components: {
    NavBar
  }
};
</script>

<template>
  <div>
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