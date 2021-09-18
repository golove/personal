<template>
<Topbar />
   <transition-group v-if="userInfo" name="list-complete" tag="div" class="flex flex-wrap"> 
      <personal class="list-complete-item" v-for="(e) in userInfo" :key="e.id" :userInfo="e" />
      </transition-group >
</template>

<script lang="ts">
import Topbar from "../components/topbar.vue";
import { computed, reactive } from "vue";
import store from "../store";
import personal from "../components/Personal/index.vue";
export default {
   name:'home',
   components:{personal,Topbar },
   setup() {
    return reactive({
      userInfo: computed(() => store.getters.doneCards),
    });
  },
}
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