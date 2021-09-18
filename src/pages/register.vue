<template>
  <div class="spanContent">
    <form class="backdropBlur">
      <div class="flex justify-start">
        <svg class="go_icon"><use xlink:href="#go_icon" /></svg>
        <h1 class="cptitle">GoLove</h1>
      </div>
      <div v-if="nextFlag" class="next">
        <h2>Create account</h2>
        <input
          autofocus
          placeholder="someone@example.com"
          type="email"
          v-model="emailValue"
          class="border-b-2 w-full focus:underline focus:outline-none"
        />
        <p v-show="tipFlag" class="text-red-600">{{ infoContext }}</p>
           <p>
          have account?
          <router-link class="text-blue-500" to="/signin"
            >sign in</router-link
          >
        </p>
        <button @keypress.enter="nextStep('email')" @click="nextStep('email')">
          Next
        </button>
      </div>

      <div v-else-if="!verifyFlag" class="signin">
        <div @click="nextFlag = !nextFlag" class="flex justify-start">
          <svg class="arrow"><use xlink:href="#arrow" /></svg>
          <p class="pstyle">{{ emailValue }}</p>
        </div>
        <h2>Create a password</h2>
        <p class="text-sm">
          Enter the password you would like to use with your account.
        </p>
        <input
          autofocus
          placeholder="Create password"
          type="password"
          v-model="password"
          class="border-b-2 w-full focus:underline focus:outline-none"
        />
        <br />
        <p class="text-red-600">{{ infoContext }}</p>

        <label @click="accFlag = !accFlag" class="text-blue-500" for="checkbox">
          <input
            v-bind="accFlag"
            type="checkbox"
            class="form-checkbox my-4 rounded"
            id="checkbox"
          />
          show password</label
        ><br />
        <!-- <a class="text-blue-500" href="#">Forgot password?</a> -->
        <button
          @keydown.enter="nextStep('pass')"
          @click="nextStep('pass')"
          type="submit"
        >
          next
        </button>
      </div>

      <div v-else class="signin">
        <div @click="verifyFlag = !verifyFlag" class="flex justify-start">
          <svg class="arrow"><use xlink:href="#arrow" /></svg>
          <p class="pstyle">{{ emailValue }}</p>
        </div>
        <h2>Verify email</h2>
        <p class="text-sm">
          {{
            `Enter the code we sent to ${emailValue}. If you didn't get the email,
          check your junk folder or try again.`
          }}
        </p>
        <input
          autofocus
          placeholder="Enter code"
          type="text"
          v-model="verifyCode"
          class="border-b-2 w-full focus:underline focus:outline-none"
        />
        <br />
        <p class="text-red-600">{{ infoContext }}</p>

        <label
          @click="accFlag = !accFlag"
          class="text-blue-500"
          for="checkbox3"
        >
          <input
            v-bind="accFlag"
            type="checkbox"
            class="form-checkbox my-4 rounded"
            id="checkbox3"
          />
          I would like information, tips, and offers about Microsoft products
          and services.
        </label>

        <!-- <a class="text-blue-500" href="#">Forgot password?</a> -->
        <button @keydown.enter="create" @click="create" type="submit">
          Create
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { ref } from "@vue/reactivity";
import Cryptojs from "crypto-js";
import axios from "../axios";
// import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "create",
  setup() {
    let verifyFlag = ref(false);
    let tipFlag = ref(false);
    let infoContext = ref("");
    let nextFlag = ref(true);
    let emailValue = ref("");

    let password = ref("");
    let verifyCode = ref("");
    let accFlag = ref(false);
    // const store = useStore();
    const router = useRouter();

    function nextStep(val: string) {
      if (val === "email") {
        if (checkEmail(emailValue.value)) {
          nextFlag.value = false;
          tipFlag.value = false;
          infoContext.value = "";
        } else {
          nextFlag.value = true;
          tipFlag.value = true;
          infoContext.value = "please enter correct email!!!";
        }
      } else {
        if (password.value) {
          verifyFlag.value = true;
          tipFlag.value = false;
          infoContext.value = "";
          sendCode();
        } else {
          verifyFlag.value = false;
          tipFlag.value = true;
          infoContext.value = "password can't empty!!!";
        }
      }
    }
    let timer: any;
    function create() {
      clearInterval(timer);
      if (verifyCode.value && accFlag.value) {
        let username = emailValue.value.split("@")[0];
        let user = {
          username: encodeURIComponent(username),
          email: emailValue.value,
          password: Cryptojs.MD5(password.value).toString(),
          code: verifyCode.value,
        };
        axios.userRegister(user).then((res:any) => {
          console.log(res);
          infoContext.value = res.data.msg;
          if (res.data.code === -1) {
            return;
          } else {
            
            setTimeout(() => {
              router.push({
                path: "/signin",
              });
            }, 500);
          }
        });
      } else if (accFlag.value) {
        infoContext.value = " verifyCode con't empty!!!";
      } else if (verifyCode.value) {
        infoContext.value = "Please agree to the following terms";
      } else {
        infoContext.value =
          " verifyCode con't empty! and agree to the following terms";
      }
    }

    // 验证邮箱
    function checkEmail(str: string) {
      let re = /^(?:\w+\.?)*\w+@(?:\w+\.)*\w+$/;
      if (re.test(str)) {
        return true;
      } else {
        return false;
      }
    }

    function sendCode() {
      let email = emailValue.value;
      let username = emailValue.value.split("@")[0];
      if (checkEmail(email)) {
        console.log(username);
        // 发送验证码
        axios
          .userVerify({
            username: encodeURIComponent(username),
            email: emailValue.value,
          })
          .then((res:any) => {
            if (res.status === 200 && res.data && res.data.code === 0) {
              let time = 300;

              timer = setInterval(() => {
                time--;
                infoContext.value = res.data.msg;
                if (time === 0) {
                  clearInterval(timer);
                  verifyFlag.value = false;
                  infoContext.value = "";
                }
              }, 1000);
            } else {
              infoContext.value = res.data.msg;
            }
          });
      }
    }

    return {
      verifyFlag,
      sendCode,
      nextStep,
      emailValue,
      password,
      tipFlag,
      nextFlag,
      create,
      infoContext,
      verifyCode,
      accFlag,
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
  position: relative;
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