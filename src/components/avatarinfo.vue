<template>
  <div>
    <div class="avatarinfo">
      <div class="info">
        <img v-if="user.auAvatar" style="border-radius:50%;" width="80" height="80" :src="user.auAvatar" alt="">
        <img v-else width="80" height="80" src="../../public/img/my.png" alt="">
        <p class="ava_tit">{{user.auName}}</p>
        <p class="ava_name">{{user.auWorks}}</p>
        <p class="ava_intr">{{user.auSocialPlat}}</p>
        <p class="guanzhu"><span>关注:{{user.auCons}}</span><span>粉丝:{{user.auBalance}}</span></p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data(){
    return{
      user:{}
    }
  },
  created(){
    const user=JSON.parse(localStorage.getItem("user"));
    this.user=user;
  }
}
</script>

<style scoped>
@import '../../public/css/reset.css';
@import '../../public/css/avatarinfo.css';
</style>
