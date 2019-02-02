<template>
  <div class="geren-cont-right-box clearfix" v-loading="loading">
    <div class="geren-cont-right-header">我的订单</div>
    <div v-if="this.dingdan.length!=0" ref="list">
      <div class="c-list" v-for="item in dingdan" :key="item.id">
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
          <div class="btn" @click="btn">删除订单</div>
        </div>
      </div>
    </div>
    <div v-else class="zanwu">暂无订单</div>
  </div>
</template>

<script>
import axios from "../../axios";
export default {
  data() {
    return {
      dingdan: [],
      loading: false,
      user: null,
      flag: false,
      arr: []
    };
  },
  methods: {
    btn() {
      for (var i = 0; i < this.$refs.list.children.length; i++) {
        // console.log(this.$refs.list.children[i])
        this.$refs.list.children[i].onclick = function() {
          this.style.display = "none";
        };
      }
    }
  },
  created() {
    this.loading = true;
    this.user = JSON.parse(localStorage.getItem("user"));
    // console.log(this.user)
    axios
      .get("userExpoController/queryUserAllExpo/1/12/" + this.user.auId)
      .then(res => {
        // axios.get("userExpoController/queryUserAllExpo/1/12/2").then(res=>{
        // console.log(res.data.page)
        // console.log(res.data.page.ae_id)
        if (res.data.page.length == 0) {
          this.loading = false;
        } else {
          // 遍历用户查询到的所有购票，根据所有购票的id，获取所有购票的详细信息
          for (var i = 0; i < res.data.page.length; i++) {
            // console.log(res.data.page[i].ae_id);
            axios
              .get("animeExpo/queryExpoDetail/" + res.data.page[i].ae_id)
              .then(res => {
                // console.log(res.data.data)
                this.arr = [...this.arr, ...res.data.data];
                // console.log(this.arr);
                this.dingdan = this.arr;
                this.loading = false;
                // console.log(this.dingdan.length);
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
