<template>
  <div class="w-full h-auto  min-h-screen bg-beauty bg-cover bg-fixed">
    

    <router-view></router-view>
    <Icons />
  </div>
</template>

<script lang="ts">
import Icons from "./assets/icon.vue";

export default {
  name: "App",
  components: { Icons},
  setup() {},
};
</script>

<style>

</style>
