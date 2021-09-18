<template>
  <div class="spanContent">
    <form class="backdropBlur">
      <div class="flex justify-start">
        <svg class="go_icon"><use xlink:href="#go_icon" /></svg>
        <h1 class="cptitle">GoLove</h1>
      </div>
      <div v-if="nextFlag" class="next">
        <h2>Sign in</h2>
        <input
          autofocus
          placeholder="someone@example.com"
          type="email"
          v-model="emailValue"
          class="border-b-2 w-full focus:underline focus:outline-none"
        />
        <p v-show="tipFlag" class="text-red-600">{{ infoContext }}</p>
        <p>
          No account?
          <router-link class="text-blue-500" to="/register"
            >Create one!</router-link
          >
        </p>
        <button @keypress.enter="nextStep" @click="nextStep">Next</button>
      </div>

      <div v-else class="signin">
        <div @click="nextFlag = !nextFlag" class="flex justify-start">
          <svg class="arrow"><use xlink:href="#arrow" /></svg>
          <p class="pstyle">{{emailValue}}</p>
        </div>
        <h2>Enter password</h2>
        <input
          autofocus
          placeholder="Enter password"
          type="password"
          v-model="password"
          class="border-b-2 w-full focus:underline focus:outline-none"
        />
        <br />
        <p class="text-red-600">{{ infoContext }}</p>

        <label
          @click="tokenFlag = !tokenFlag"
          class="text-blue-500"
          for="checkbox"
        >
          <input
            v-bind="tokenFlag"
            type="checkbox"
            class="form-checkbox my-4 rounded"
            id="checkbox"
          />Keep me signed in</label
        ><br />
        <a class="text-blue-500" href="#">Forgot password?</a>
        <button @keydown.enter="signin" @click="signin" type="submit">
          Sign in
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { ref } from "@vue/reactivity";
import Cryptojs from "crypto-js";
import axios from "../axios";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "signin",
  setup() {
    let tipFlag = ref(false);
    let infoContext = ref("");
    let nextFlag = ref(true);
    let emailValue = ref("");
    let password = ref("");
    let tokenFlag = ref(false);
    const store = useStore();
    const router = useRouter();

    console.log(tokenFlag.value);

    function nextStep() {
      if (emailValue.value) {
        console.log(emailValue.value);
        nextFlag.value = false;
        tipFlag.value = false;
        infoContext.value = "";
      } else {
        nextFlag.value = true;
        tipFlag.value = true;
        infoContext.value = "please enter correct email!!!";
      }
    }
    function signin() {
      if (password.value) {
        let user = {
          username: encodeURIComponent(emailValue.value),
          password: Cryptojs.MD5(password.value).toString(),
        };
        axios.userLogin(user).then((res:any) => {
          console.log(res);
          infoContext.value = res.data.msg;
          if (res.data.code === -1) {
            return;
          } else {
            if (tokenFlag.value) {
              store.commit("BIND_LOGIN", res.data.token);
            }
            store.commit("SAVE_USER", res.data.username);
            setTimeout(() => {
              router.push({
                path: "/",
              });
            }, 500);
          }
        });
      } else {
        infoContext.value = " password con't empty!!!";
      }
    }

    return {
      tokenFlag,
      nextStep,
      emailValue,
      password,
      tipFlag,
      nextFlag,
      signin,
      infoContext,
    };
  },
};
</script>

<style scoped>
.spanContent {
  width: 100%;
  height: 100%;
  padding: 210px 0;
}
.backdropBlur {
  position: relative;
  backdrop-filter: blur(25px);
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.75);
  min-height: 280px;
  padding: 2em 4em;
  margin: 0px auto;
  width: 420px;
}
.backdropBlur h1.cptitle {
  line-height: 52px;
  font-size: 2em;
  font-weight: 550;
  color: rgb(143, 143, 143);
}
.backdropBlur h2 {
  margin-top: 6px;
  font-size: 24px;
}
svg.go_icon {
  padding: 0;
  margin: 0;
  width: 52px;
  height: 52px;
}
svg.arrow {
  width: 22px;
  height: 23px;
}
.backdropBlur input {
  background: none;
}
.backdropBlur p {
  margin: 10px 0;
}
.backdropBlur button {
  float: right;
}
.backdropBlur .signin {
  margin: 10px 0;
}
.backdropBlur .signin p.pstyle {
  margin: 0 8px;
}
</style>