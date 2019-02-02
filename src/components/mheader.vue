<template>
  <header>
    <div class="top">
      <div class="header-l">
        <router-link to="/">
          <img src="../../public/img/logo.png" alt>
        </router-link>
        <ul>
          <li>
            <router-link to="/manzhan">漫展</router-link>
          </li>
          <li>
            <router-link to="/">主站</router-link>
          </li>
          <li>
            <router-link to="/banqu">社区</router-link>
          </li>
          <li>
            <el-dropdown trigger="click">
              <span style="color:#fff;cursor:pointer;" class="el-dropdown-link">
                发布
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <router-link to="/fabu">发布帖子</router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <a v-if="isLogin" href="http://moff.purvavideha.cn/animeExpo/toAddManzhan">发布漫展</a>
                  <router-link v-else to="/login">发布漫展</router-link>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!-- <router-link to="/fabu">发布</router-link> -->
          </li>
        </ul>
      </div>
      <div class="header-r">
        <div class="search">
          <img src="../../public/img/search.png" alt>
          <input type="text">
        </div>
        <div class="alogin" v-if="!isLogin">
          <router-link to="/login">登录/注册</router-link>
        </div>
        <div class="avatar" v-else>
          <ul>
            <li class="avatar-img">
              <router-link to="/geren">
                <img style="border-radius:50%;" v-if="user.auAvatar" :src="user.auAvatar" alt>
                <img v-else style="border-radius:50%;"
                  src="../../public/img/17186b646d123bfa24b9fc597ed5bea57e600e2e24803-DC7vdA_fw658.png"
                  alt
                >
              </router-link>
              <div class="cancellogin">
                <el-button type="danger" @click="cancellogin">退出登录</el-button>
              </div>
            </li>
            <li>
              <router-link to="/geren">
                <img src="../../public/img/set.png" alt>
              </router-link>
            </li>
            <li>
              <router-link to="/yonghu">
                <img src="../../public/img/message.png" alt>
              </router-link>
            </li>
            <li>
              <router-link to="/quanzi/quanzishoucang">
                <img src="../../public/img/shoucang.png" alt>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      userinfo: "",
      isLogin: false,
      user: ""
    };
  },
  created() {
    const loc = localStorage.getItem("login");
    if (loc) {
      this.isLogin = true;
    }
    if (localStorage.getItem("user")) {
      this.user = JSON.parse(localStorage.getItem("user"));
    }
  },
  methods: {
    cancellogin() {
      localStorage.removeItem("login");
      this.$router.replace("/login");
    }
  }
};
</script>

<style scoped>
@import "../../public/css/reset.css";
@import "../../public/css/header.css";
</style>
