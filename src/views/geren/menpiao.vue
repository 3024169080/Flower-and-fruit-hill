<template>
  <div class="geren-cont-right-box clearfix" v-loading="loading">
    <div class="geren-cont-right-header">我的收藏</div>
    <div v-if="this.menpiao.length>0" ref="list">
      <div class="c-list" v-for="item in menpiao" :key="item.id">
        <img :src="item.aeLogo" alt>
        <div class="c-info">
          <div class="c-tit">
            <h3>{{item.aeName}}</h3>
          </div>
          <p>{{item.aeType}}</p>
          <p>开始时间：
            <span>{{item.aeStarttime}}</span>
          </p>
          <p>结束时间：
            <span>{{item.aeEndtime}}</span>
          </p>
          <p>地址：
            <span>{{item.aeAddress}}</span>
          </p>
          <p>售价： ￥
            <span class="price">{{item.aeNewfare}}</span>
          </p>
          <div class="btn" @click="btn">取消收藏</div>
        </div>
      </div>
    </div>
    <div class="zanwu" v-else>暂无收藏</div>
  </div>
</template>

<script>
import axios from "../../axios";
export default {
  data() {
    return {
      menpiao: [],
      arr: [],
      loading: false
    };
  },
  methods: {
    btn() {
      for (var i = 0; i < this.$refs.list.children.length; i++) {
        // console.log(this.$refs.list.children[i])
        this.$refs.list.children[i].onclick = function() {
          console.log(this);
          this.style.display = "none";
        };
      }
    }
  },
  created() {
    this.loading = true;
    this.user = JSON.parse(localStorage.getItem("user"));
    axios
      .get("userExpoController/queryUserAllExpo/1/12/" + this.user.auId)
      .then(res => {
        // axios.get("userExpoController/queryUserAllExpo/1/12/2").then(res=>{
        // console.log(res.data.page)
        // console.log(res.data.page.ae_id)
        if (res.data.page.length == 0) {
          this.loading = false;
        } else {
          for (var i = 0; i < res.data.page.length; i++) {
            // console.log(res.data.page[i].ae_id);
            axios
              .get("animeExpo/queryExpoDetail/" + res.data.page[i].ae_id)
              .then(res => {
                // console.log(res.data.data)
                this.arr = [...this.arr, ...res.data.data];
                this.menpiao = this.arr;
                this.loading = false;
              });
          }
        }
      });
    // this.loading=false;
  }
};
</script>

<style scoped>
@import "../../../public/css/gerendingdan.css";
</style>
