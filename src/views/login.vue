<template>
  <div>
    <!-- 顶部 -->
    <mheader></mheader>
    <div class="login">
      <img src="../../public/img/login-bg.png" alt width="420" height="500">
      <div class="login-ipt">
        <div class="username">
          <input
            type="text"
            placeholder="请输入您的手机号，邮箱，或者昵称"
            v-model="log.username"
            @input="changetel"
          >
        </div>
        <div class="password">
          <input class="password" type="password" placeholder="输入密码" v-model="log.pwd">
        </div>
        <div class="status">
          <p>
            <input type="checkbox" checked v-model="ischecked">记住登录状态
          </p>
          <router-link to="xiugaimima" class="fp">忘记密码?</router-link>
        </div>
        <div class="btn">
          <div class="btn-login" @click="tologin">登录</div>
          <div class="btn-register">
            <router-link to="/zhuce" tag="div">注册</router-link>
          </div>
        </div>
        <div class="other">
          <img src="../../public/img/weibo.png" alt>
          <img @click="trilaterallogin" src="../../public/img/qq1.png" alt>
          <img src="../../public/img/weixin.png" alt>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <mfooter></mfooter>
  </div>
</template>

<script>
import axios from "../axios";
import mheader from "../components/mheader";
import mfooter from "../components/mfooter";
export default {
  data() {
    return {
      log: {
        username: "",
        pwd: ""
      },
      isRig: "",
      // 是否记住登录状态
      ischecked: true
    };
  },
  components: {
    mheader,
    mfooter
  },
  methods: {
    tologin() {
      if (this.isRig) {
        axios
          .get(`shiro/login/${this.log.username}/${this.log.pwd}`)
          .then(res => {
            // console.log(res.data.data[0])
            if (res.data.code == 200) {
              this.$message.success("登录成功");
              if (this.ischecked == true) {
                // 记住状态
                localStorage.setItem("login", JSON.stringify(res.data));
                localStorage.setItem("user", JSON.stringify(res.data.data[0]));
              }
              this.$router.replace("/");
            }else{
              this.$message.error("密码错误");
            }
          });
      }
    },
    changetel() {
      if (this.log.username.length == 11) {
        // 判断手机号是否存在
        axios.get("index/checkUserPhone/" + this.log.username).then(res => {
          this.isRig = true;
          if (res.data == true) {
            this.$message.error("手机号未注册");
            this.log.username = "";
          }
        });
      } else {
        this.isRig = false;
      }
    },
    trilaterallogin(){
      axios.get("oauth/callback/qqLoginPage").then(res=>{
        window.location.href=res.data;
      })
    },
  }
};
</script>

<style scoped>
@import "../../public/css/reset.css";
@import "../../public/css/login.css";
</style>
 