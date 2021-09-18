<template>
  <div class="card w-full sm:w-96 h-40 m-2 text-bluegray font-yahei">
    <div class="front flex rounded-xl shadow-md overflow-hidden">
      <img class="h-auto w-2/7" v-if="userInfo.avatar" :src="userInfo.avatar" alt="avatar" />
      <div class="p-2">
        <p>
          <span class="text-maintextcolor tracking-normal text-sm">姓 名</span>
          <span v-if="userInfo.name" class="text-base">&nbsp;&nbsp;{{ userInfo.name }}</span>
        </p>
        <p>
          <span class="text-maintextcolor text-sm">性 别</span>
          <span v-if="userInfo.gender" class="text-sm">&nbsp;&nbsp;{{ userInfo.gender }}&nbsp;&nbsp;</span>
          <span class="text-maintextcolor text-sm whitespace-pre">民 族</span>
          <span v-if="userInfo.nationality" class="text-sm">&nbsp;&nbsp;{{ userInfo.nationality }}</span>
        </p>
        <p v-if="userInfo.identity">
          <span class="text-maintextcolor text-sm">出 生</span>
          <span class="text-sm">&nbsp;&nbsp;{{ userInfo.identity.slice(6, 10) }}</span>
          <span class="text-maintextcolor text-sm">&nbsp;年</span>
          <span class="text-sm">&nbsp;&nbsp;{{ userInfo.identity.slice(10, 12) }}</span>
          <span class="text-maintextcolor text-sm">&nbsp;月</span>
          <span class="text-sm">&nbsp;&nbsp;{{ userInfo.identity.slice(12, 14) }}</span>
          <span class="text-maintextcolor text-sm">&nbsp;日</span>
        </p>
        <p class="flex justify-start">
          <span class="inline-block w-9 text-maintextcolor text-sm">住 址</span>
          <span
            v-if="userInfo.adress"
            class="h-11 w-52 inline-block text-sm overflow-ellipsis overflow-hidden"
          >{{ userInfo.adress }}</span>
        </p>
        <p>
          <span class="text-maintextcolor text-sm">电 话</span>
          <span v-if="userInfo.telphone" class="text-sm">&nbsp;&nbsp;{{ userInfo.telphone }}</span>
        </p>
      </div>
    </div>
    <div class="back rounded-xl shadow-md overflow-hidden p-4">
      <p>
        <span class="text-maintextcolor text-sm">QQ 账 号</span>
        <span v-if="userInfo.QQ" class="text-base">&nbsp;&nbsp;{{ userInfo.QQ }}</span>
      </p>
      <p>
        <span class="text-maintextcolor text-sm">微 信 账 号</span>
        <span v-if="userInfo.weixin" class="text-base">&nbsp;&nbsp;{{ userInfo.weixin }}</span>
      </p>
      <p>
        <span class="text-maintextcolor text-sm">支付宝账号</span>
        <span v-if="userInfo.zhifubao" class="text-base">&nbsp;&nbsp;{{ userInfo.zhifubao }}</span>
      </p>
      <p>
        <span class="text-maintextcolor text-sm">银行卡账号</span>
        <span v-if="userInfo.bank" class="text-base">&nbsp;&nbsp;{{ userInfo.bank }}</span>
      </p>
      <p>
        <span class="text-maintextcolor text-sm">公民身份号码</span>
        <span v-if="userInfo.identity" class="text-base">&nbsp;&nbsp;{{ userInfo.identity }}</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    userInfo: Object
  },
};
</script>
<style>
.card {
  cursor: pointer;
  perspective: 1000px;
  position: relative;
}

.front,
.back {
  backdrop-filter: blur(15px);
  background-color: rgba(255, 255, 255, 0.45);
  background-size: cover;
  position: absolute;
  height: 100%;
  width: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  transition: ease-in-out 600ms;
}

.front {
  overflow: hidden;
}

.card:hover .front {
  transform: rotateX(180deg);
}

.card:nth-child(even):hover .front {
  transform: rotateX(-180deg);
}

.back {
  transform: rotateX(-180deg);
  padding: 0 2em;
}

.card:hover .back {
  transform: rotateX(0deg);
}

.card:nth-child(even) .back {
  transform: rotateX(180deg);
}

.card:nth-child(even):hover .back {
  transform: rotateX(0deg);
}

.button {
  transform: translateZ(40px);
  cursor: pointer;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  font-weight: bold;
  color: #fff;
  padding: 0.1em 0.5em;
  border-radius: 100px;
  font: inherit;
  background: linear-gradient(135deg, rgb(166, 215, 255), #009ac9);
  border: none;
  position: relative;
  transform-style: preserve-3d;
  transition: 300ms ease;
}

.button:before {
  transition: 300ms ease;
  position: absolute;
  display: block;
  content: "";
  transform: translateZ(-40px);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  height: calc(100% - 20px);
  width: calc(100% - 20px);
  border-radius: 100px;
  left: 10px;
  top: 16px;
  box-shadow: 0 0 10px 10px rgba(26, 87, 230, 0.25);
  background-color: rgba(26, 87, 230, 0.25);
}

.button:hover {
  transform: translateZ(55px);
}

.button:hover:before {
  transform: translateZ(-55px);
}

.button:active {
  transform: translateZ(20px);
}

.button:active:before {
  transform: translateZ(-20px);
  top: 12px;
}
</style>
