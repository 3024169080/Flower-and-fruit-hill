<template>
    <div class="fensi" v-if="fanss.length" >
        <div class="star" v-for="(fans,index) in fanss" :key="index">
            <img src="./../../../public/img/5a4f1ea669436.png" alt="">
            <div class="xinxi">
                <div class="xinxi-m">
                    <span>{{fans.au_name}}</span>
                    <span v-if="fans.au_sex==='女'">妹子</span>
                    <span v-else>帅哥</span>
                    <span>{{fans.au_address}}</span>
                </div>
                <div class="fensiguanzhu"  @click="gz(fans.uf_fans_id,user.auId)"><span>+&nbsp;关注</span></div>
                    
                
            </div>
        </div>
        
        
    </div>
    <div v-else>
        您还没有粉丝
    </div>
</template>

<script>
import axios from './../../axios'
export default {
    data(){
            return{
            user:"",
            fanss:[],
            }
        },
        computed:{

            
        },
        // mounteds:{

        // },
        methods:{
          gz(attenId ,auid){
              axios.post('userFansAndAttenController/addAtten/'+auid+'/'+attenId).then(res=>{
                  if(res.status===200){
                      this.$message.success("关注成功");
    
                  }
              })
              
          } 
            
        },
        created(){
        this.user=JSON.parse(localStorage.getItem("user"));
        
        axios.get("userFansAndAttenController/queryFunsByUserId/1/10/"+this.user.auId).then(res=>{
            if(res.status===200){
                this.fanss=res.data.page;
            }
            // if(res.status===200)
            
        })
        
    }
}
</script>

<style scoped>
@import './../../../public/css/fensi.css';
</style>
