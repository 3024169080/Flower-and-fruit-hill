<template>
  <div class="attention" v-if="stars.length">
    <div class="star" v-for="(star,index) in stars" :key="index">
      <img src="./../../../public/img/5a4f1ea669436.png" alt>
      <div class="xinxi">
        <div class="xinxi-m">
          <span>{{star.au_name}}</span>
          <span v-if="star.au_sex==='女'">妹子</span>
          <span v-else>帅哥</span>
          <span>{{star.au_address}}</span>
        </div>
        <div class="quguan" @click="qx(star.uf_relation_id,index)">
          <span>取消关注</span>
        </div>
      </div>
    </div>
  </div>
  <div class="attention" v-else>未关注</div>
</template>

<script>
import axios from "./../../axios";
export default {
  data() {
    return {
      user: "",
      stars: []
    };
  },
  computed: {},
  // mounteds:{

  // },
  methods: {
    qx(attenId, index) {
      axios
        .delete("userFansAndAttenController/delAttenByUserId/" + attenId)
        .then(res => {
          if (res.status === 200) {
            this.stars.splice(index, 1);
            this.$message.warning("取消关注");
          }
        });
    }
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user"));
    axios
      .get(
        "userFansAndAttenController/queryAttenByUserId/1/10/" + this.user.auId
      )
      .then(res => {
        this.stars = res.data.page;
      });
  }
};
</script>

<style scoped>
@import "./../../../public/css/guanzhu.css";
</style>
