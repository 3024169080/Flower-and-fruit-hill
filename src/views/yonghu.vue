<template>
    <div class="yonghu">
        <mheader></mheader>
        <avatarinfo></avatarinfo>
        
        <div class="content">
            <div class="nav">
                <ul class="nav-ul">
                    <li class="ban"> <router-link to="/yonghu">水帘洞</router-link> </li>
                    <li> <router-link to="/xiangce">相册</router-link> </li>
                    <li> <router-link to="/guanzhu">关注</router-link> </li>
                    <li> <router-link to="/fensi">粉丝</router-link> </li>
                </ul>
                <router-view></router-view>
            
        
            </div>
            <div class="houzi">
                <div class="houzi-nav">
                    <h4>可能感兴趣的猴子</h4>
                    <span>换一换</span>
                </div>
                 
                <div class="ren">
                    <img src="./../../public/img/avatar.png" alt="">
                    <div class="xinxi">
                        <div class="ming">
                            <span>老大不在家</span>
                            <span>关注5</span>
                            <span>粉丝1000</span>
                        </div>
                        <div class="g">
                            <span class="n">+&nbsp;关注</span>
                        </div>
                        
                    </div>
                </div>
                <div class="ren">
                    <img src="./../../public/img/avatar.png" alt="">
                    <div class="xinxi">
                        <div class="ming">
                            <span>老大不在家</span>
                            <span>关注5</span>
                            <span>粉丝1000</span>
                        </div>
                        <div class="g">
                            <span class="n">+&nbsp;关注</span>
                        </div>
                        
                    </div>
                </div>
                <div class="ren">
                    <img src="./../../public/img/avatar.png" alt="">
                    <div class="xinxi">
                        <div class="ming">
                            <span>老大不在家</span>
                            <span>关注5</span>
                            <span>粉丝1000</span>
                        </div>
                        <div class="g">
                            <span class="n">+&nbsp;关注</span>
                        </div>
                        
                    </div>
                </div>
                <div class="ren">
                    <img src="./../../public/img/avatar.png" alt="">
                    <div class="xinxi">
                        <div class="ming">
                            <span>老大不在家</span>
                            <span>关注5</span>
                            <span>粉丝1000</span>
                        </div>
                        <div class="g">
                            <span class="n">+&nbsp;关注</span>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        
        <mfooter></mfooter>
    </div>
    
</template>

<script>

import mfooter from '../components/mfooter'
import mheader from '../components/mheader'
import avatarinfo from '../components/avatarinfo'
export default {
     components:{
        mfooter,
        mheader,
        avatarinfo
    },
    data(){
        return{

        }
    },
    computed:{
        
    },
    mounteds:{

    },
    created(){

    }
}
</script>

<style scoped>
@import '../../public/css/reset.css';
@import '../../public/css/yonghu.css';
</style>
