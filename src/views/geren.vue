<template>
  <div>
    <div class="container">
      <mheader></mheader>
      <div class="cont">
        <div class="cont-left">
          <router-link class="cont-left-list" to="/ziliao">
            <img src="../../public/img/geren-ziliao.png" alt>
            <span>个人资料</span>
          </router-link>
          <router-link class="cont-left-list" to="/dingdan">
            <img src="../../public/img/geren-dingdan.png" alt>
            <span>我的订单</span>
          </router-link>
          <router-link class="cont-left-list" to="/menpiao">
            <img src="../../public/img/geren-menpiao.png" alt>
            <span>门票收藏</span>
          </router-link>
          <router-link class="cont-left-list" to="/xiugaimima">
            <img src="../../public/img/geren-xiugaimima.png" alt>
            <span>修改密码</span>
          </router-link>
          <router-link class="cont-left-list" to="/qianbao">
            <img src="../../public/img/geren-dingdan.png" alt>
            <span>我的钱包</span>
          </router-link>
        </div>
        <div class="cont-right clearfix">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <mfooter></mfooter>
  </div>
</template>

<script>
import axios from "../axios";
import mheader from "../components/mheader";
import mfooter from "../components/mfooter";
export default {
  components: {
    mheader,
    mfooter
  },
  methods: {}
};
</script>

<style scoped>
@import "../../public/css/reset.css";
@import "../../public/css/style.css";
@import "../../public/css/geren.css";
</style>
