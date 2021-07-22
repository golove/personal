<template>
  <div class="w-full h-auto min-h-screen bg-beauty bg-cover bg-fixed">
    <inquire />
   
      <transition-group name="list-complete" tag="div" class="flex flex-wrap"> 
      <personal class="list-complete-item" v-for="(e) in userInfo" :key="e.id" :userInfo="e" />
      </transition-group >
   
  </div>
</template>

<script lang="ts">
import { computed, reactive } from "vue";
import personal from "./components/Personal/index.vue";
import inquire from "./components/inquire/index.vue";
import store from "./store";
export default {
  name: "App",
  components: { personal, inquire },
  setup() {
    return reactive({
      userInfo: computed(() => store.getters.doneCards),
    });
  },
};
</script>

<style>
.list-complete-item {
  transition: all 0.8s ease;
}
.list-complete-enter-from,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-complete-leave-active {
  position: absolute;
}
</style>
