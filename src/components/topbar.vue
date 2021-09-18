<template>
  <div class="appbar">
    <div class="menu">
      <router-link tag="h2" to="/">golove</router-link>|
      <router-link tag="h2" to="/write">Write</router-link>
      <router-link tag="h2" to="/about">About</router-link>
    </div>

    <div class="search">
      <svg>
        <use xlink:href="#magnify" />
      </svg>
      <!-- <input type="text" placeholder="search" /> -->
      <!-- <div class="h-36 mx-auto w-full md:w-1/4 p-4"> -->
      <input
        placeholder="search"
        type="text"
        v-model="inputValue"
        class="
          px-3
          rounded-2xl
          leading-8
          w-full
          border-none
          focus:outline-none
          focus:ring focus:ring-purple-600 focus:ring-offset-purple-100
        "
      />
      <!-- </div> -->
    </div>

    <div class="login">
      <div v-show="store.getters.username" class="avatar"></div>
      <router-link tag="span" :to="store.getters.username?'/user':'/signin'">{{store.getters.username?store.getters.username:"signin"}}</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import {  reactive, ref, watch } from "vue";
import store from "../store";
export default {
  name: "topbar",
  components: {},
  setup() {
    const inputValue = ref("");

    watch(inputValue, (n) => {
      searchAct(n);
    });
    const searchAct = (value: string) => {
      // if(value.trim()==='')  return
      store.commit("search", value);
     
    };
    return reactive({
      inputValue,
      store
    });
  },
};
</script>


<style  scoped>
.appbar {
  width: 100vw;
  height: 60px;
  background: rgba(255, 255, 255, 0.85);
  line-height: 60px;
  display: inline-flex;
  justify-content: center;
  backdrop-filter: blur(25px);
}
.appbar .search {
  height: 36px;
  width: 420px;
  border-radius: 18px;
  margin: 12px 24px;
  position: relative;
  display: flex;
}
.appbar .search svg {
  position: absolute;
  top: 4px;
  left: 2px;
  fill: rgb(0, 183, 255);
  height: 30px;
  width: 30px;
}
.appbar .search input {
  text-indent: 35px;
}
.appbar .login {
  display: flex;
  
}
.appbar .login .avatar{
  background-image:url('https://i.loli.net/2021/08/23/AHJidNuL2OGeBXq.jpg') ;
  background-position: 30% 55%;
background-repeat:no-repeat;
  margin: 12.5px;
  width: 35px; 
  height: 35px;
  border-radius: 50%;
}
</style>