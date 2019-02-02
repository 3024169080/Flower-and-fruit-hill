<template>
  <div>
    <mheader></mheader>
    <avatarinfo></avatarinfo>
    <div class="quanzi">
      <div class="aside">
        <ul>
          <li>
            <router-link to="/quanzi">
              <img src="../../public/img/q-shouye.png" alt>
              <p>我的山头</p>
            </router-link>
          </li>
          <li>
            <router-link to="/quanzi/quanzidianzan">
              <img src="../../public/img/q-dianzan.png" alt>
              <p>我的点赞</p>
            </router-link>
          </li>
          <li>
            <router-link to="/quanzi/quanzipinglun">
              <img src="../../public/img/q-pinglun.png" alt>
              <p>我的评论</p>
            </router-link>
          </li>
          <li>
            <router-link to="/quanzi/quanzishoucang">
              <img src="../../public/img/q-shoucang.png" alt>
              <p>我收藏的帖子</p>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="cont">
        <router-view></router-view>
      </div>
    </div>
    <mfooter></mfooter>
  </div>
</template>

<script>
import axios from "../axios";
import mheader from "../components/mheader";
import mfooter from "../components/mfooter";
import avatarinfo from "../components/avatarinfo";
export default {
  components: {
    mheader,
    mfooter,
    avatarinfo
  }
};
</script>

<style scoped>
@import "../../public/css/reset.css";
@import "../../public/css/quanzi.css";
</style>
