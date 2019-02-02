<template>
  <div class="nav w">
    <p class="title">社区列表</p>
    <ul class="nav-tit">
      <li v-for="(item,index) in msg" :key="index">
        <img src="../../public/img/logo1.png" alt="">
        <div class="text">
          <h5>{{item.post_title}}</h5>
          <p class="nav-brief">{{item.post_label}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from '../axios'
export default {
  data () {
    return{
      msg:[],
      pageCurrent:1,
    }
  },  
    created(){
    // 4/5/1/3/0/2
    // 1 5 0 0 0 0
    this.getmsg(this.pageCurrent);
  },
  methods:{
    getmsg(status){
      axios.get(`animePosted/getQueryPostedPage/${status}/8/0`).then(res=>{
        this.msg=[...this.msg,...res.data.page];
      })
    }
  }
}
</script>

<style scoped>
  @import '../../public/css/reset.css';
  @import '../../public/css/Nav.css';
</style>
