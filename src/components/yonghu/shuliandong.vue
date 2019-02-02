<template>

    <div class="pe">
        <div class="message" v-if="talks.length">
            <div class="msg-list" v-for="(talk,index) in talks" :key="index">
                <img class="ava" src="./../../../public/img/avatar.png" alt="">
              
              <div class="list-info">
                <div class="info">
                  <p>{{user.auName}}</p>
                  <p>{{talk.post_time}} 来自 {{talk.post_label}}</p>
                </div>
                <div class="info-msg">
                  <!-- <p class="ava-name">{{talk.post_section}}</p> -->
                  <p class="ava-txt">{{talk.post_content}}</p>
                </div>
                <div class="ava-img">
                  <img :src="talk.post_picture" alt="">
                 
                </div>
                <div class="ava-status">
                  <ul>
                    <li>
                      <img src="./../../../public/img/jushoucang.png" alt="">
                      <span>{{talk.collect}}</span>
                    </li>
                    <li>
                      <img src="./../../../public/img/zan.png" alt="">
                      <span>{{talk.replynum}}</span>
                    </li>
                    <li>
                      <img src="./../../../public/img/fankui.png" alt="">
                      <span>{{talk.replynum}}</span>  
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div v-else>暂时没有说说</div>
         
    </div>
</template>

<script>
import axios from './../../axios'
export default {
   data(){
        return{
          user:'',
          talks:[]
        }
    },
    computed:{
       
        
    },
    // mounteds:{
      
    // },
    methods:{
     
    },
    created(){
      if(localStorage.getItem("login")){
        this.user=JSON.parse(localStorage.getItem("login"));
        console.log(this.user)
        axios.get('animePosted/QueryPostedByUserId/1/10/0/'+this.user.auId).then(res=>{
            this.talks=res.data.page
        })
      }
      
      
    }
}
</script>

<style scoped>
@import './../../../public/css/shuiliandong.css';
@import './../../../public/css/reset.css';
</style>
