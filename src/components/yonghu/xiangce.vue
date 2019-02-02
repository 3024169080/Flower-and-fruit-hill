<template>
    <div class="xiangce ">
        <h4>我的相册</h4>
        <div class="album">
            <div class="details" v-for="(photo,index) in photos" :key="index">
                <img :src="photo.post_picture" alt="">
                <span>我的相册</span>
                <span>更新时间:20分钟前</span>
            </div>
            <div class="details">
                <div class="tianjia">+</div>
                <h4>创建相册</h4>
            </div>
            

        </div>
    </div>
</template>

<script>
import axios from './../../axios'
export default {
    data(){
            return{
            user:"",
            photos:[],
             
            }
        },
        computed:{

            
        },
        // mounteds:{

        // },
        methods:{
          
        },
        created(){
        this.user=JSON.parse(localStorage.getItem("user"));
        
        axios.get("animePosted/QueryPostedByUserId/1/1/0/"+1).then(res=>{
            if(res.status===200){
                this.photos=res.data.page;
            }
        })
        
    }
}
</script>

<style scoped>
@import './../../../public/css/xiangce.css';
</style>
