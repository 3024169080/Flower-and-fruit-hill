<template>
  <div>
    <div class="quanzinull" v-if="!msg.length">暂无评论</div>
    <div v-else class="quanzicom">
      <div class="quanzimain" v-for="(item,index) in msg" :key="index">
        <div class="avatar">
          <img v-if="item.post_picture"
            width="61"
            height="61"
            style="border-radius:50%;"
            :src="item.post_picture"
            alt
          >
          <img v-else
            width="61"
            height="61"
            style="border-radius:50%;"
            src="../../public/img/my.png"
            alt
          >
        </div>
        <div class="quanziinfo">
          <h3>{{item.post_title}}</h3>
          <p>{{item.post_time}}</p>
          <p class="tit">#{{item.post_section}}#</p>
          <p class="msg">{{item.post_content}}</p>
          <div class="imgs">
            <img :src="item.post_picture" alt>
          </div>
          <div class="status">
            <p>
              <img src="../../public/img/jushoucang.png" alt>
              <span>12</span>
            </p>
            <p>
              <img src="../../public/img/zan.png" alt>
              <span>54</span>
            </p>
            <p>
              <img src="../../public/img/fankui.png" alt>
              <span>6</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../axios";
export default {
  data() {
    return {
      msg: [],
      pageCurrent: 1,
      loading: true
    };
  },
  computed:{
    msgtime(){
      
    }
  },
  created() {
    const userid = JSON.parse(localStorage.getItem("user")).auId;
    this.getanimeExpo(userid);
  },
  methods: {
    getanimeExpo(userid) {
      this.loading = true;
      axios.get(`animePosted/QueryPostedByUserId/1/10/0/${userid}`).then(res => {
        this.msg = res.data.page;
        this.loading = false;
      });
    }
  }
};
</script>

<style scoped>
@import "../../public/css/reset.css";
@import "../../public/css/quanzicom.css";
</style>