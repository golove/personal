<template>
  <div class="h-36 mx-auto w-full md:w-1/4 p-4">
    <input
      placeholder="search"
      type="text"
      v-model="inputValue"
      @keydown.enter="searchAct(inputValue)"
      class="
        px-3
        rounded-2xl
        leading-8
        w-full
        border-none
        focus:outline-none
        focus:ring
        focus:ring-purple-600
        focus:ring-offset-purple-100
      "
    />
  </div>
</template>

<script lang="ts">
import { defineComponent,reactive, ref } from "vue";
import store from '../../store'
export default defineComponent({
  setup() {
  const inputValue = ref('')
  const searchAct = (value:string)=>{
    // if(value.trim()==='')  return
     store.commit('search',value)
     inputValue.value=''
    
  }
    return reactive({
      inputValue,searchAct
    });
  },
});
</script>

<style>

</style>
