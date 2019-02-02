<template>
  <div>
    <div class="container">
      <!-- 顶部 -->
      <mheader></mheader>
      <!-- banner图 -->
      <div class="banner">
        <img src="../../public/img/banner2.png" alt="">
      </div>
      <div class="manzhanmain">
        <div class="addr1">
          <p class="city">城市</p>
          <ul>
            <li v-for="(item,index) in addr" :key="index" :class="{changeaddr:ac1==index}" @click="changeaddr(index)">{{item}}</li>
          </ul>
        </div>

        <div class="time">
          <p class="time-t">时间</p>
          <div class="list">
            <ul>
              <li v-for="(item,index) in months" :key="index"  :class="{changemonths:ac2==index}" @click="changemonths(index)">{{item+(index==0?'':"月")}}</li>
            </ul>
          </div>
        </div>

        <div class="content" v-loading="loading">
          <div class="nonum" v-if="!list.length&&!loading">
              暂无数据
          </div>
          <div v-else class="c-list" v-for="(item,index) in list" :key="index">
            <img :src="item.aeLogo" alt="">
            <div class="c-info">
              <div class="c-tit">
                <h3>{{item.aeName}}</h3>
                <p>
                  <img src="../../public/img/fire.png" alt="">
                  <span class="fire">98°</span>
                </p>
              </div>
              <p>简介: <span>{{item.aeMessage}}</span></p>
              <p>开始时间：<span>{{item.aeStarttime}}</span></p>
              <p>结束时间： <span>{{item.aeEndtime}}</span></p>
              <p>地址：<span>{{item.aeFulladdress}}</span></p>
              <p>售价： ￥<span class="price">{{item.aeNewfare}}.00</span></p>
              <div class="btn"><router-link :to="'/pay?id='+item.aeId" tag="span">立即购票</router-link></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <mfooter></mfooter>
  </div>
</template>

<script>
import axios from '../axios'
import mheader from '../components/mheader'
import mfooter from '../components/mfooter'
import {addr,months} from '../config/addr.js'
export default {
  data(){
    return{
      list:[],
      loading:true,
      lookaddrall:false,
      addr:addr,
      months:months,
      status:{
        aeAddress:0,
        aeEndtime:0,
        aeStarttime:0,
        aeType:0,
        pageCurrent:1,
        pageSize:5
      },
      ac1:0,
      ac2:0
    }
  },
  created(){
    // 4/5/1/3/0/2
    // 1 5 0 0 0 0
    this.getanimeExpo(this.status);
  },
  methods:{
    getanimeExpo(status){
      this.loading=true;
      axios.get(`animeExpo/queryAePageList/${status.pageCurrent}/${status.pageSize}/${status.aeEndtime}/${status.aeType}/${status.aeAddress}/${status.aeStarttime}`).then(res=>{
        this.list=res.data.page;
        this.loading=false;
      })
    },
    changeaddr(i){
      this.ac1=i;
      if(i==0){
        this.status.aeAddress=0;
      }else{
        this.status.aeAddress=addr[i];
      }
      this.getanimeExpo(this.status);
    },
    changemonths(i){
      this.ac2=i;
      if(i==0){
        this.status.aeStarttime=0;
      }else{
        this.status.aeStarttime=months[i];
      }
      this.getanimeExpo(this.status);
    }
  },
  components:{
    mheader,
    mfooter
  },
}
</script>

<style scoped>
  @import '../../public/css/reset.css';
  @import "../../public/css/manzhan.css";
</style>
