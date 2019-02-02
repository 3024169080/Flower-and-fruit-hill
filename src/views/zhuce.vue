<template>
  <div>
    <div class="quanzi">
      <mheader></mheader>
      <div class="zhuce">
        <h3>注册</h3>
        <div class="ipt">
          <div class="z-left">
            <input type="text" v-model="user.auTele" placeholder="输入您的手机号:" @input="changetel">
            <div class="code">
              <input class="tel" type="text" v-model="code" placeholder="输入验证码">
              <p class="getcode" @click="getcode" :class="{getc:getc}">
                <span>{{data}}</span>获取验证码
              </p>
            </div>
            <input class="username"  v-model="user.auName" type="text" placeholder="昵称：(例：美猴王)">
            <input class="pwd" type="password" v-model="pwd" placeholder="账号密码:">
            <input class="pwd2" type="password" v-model="user.auPwd" placeholder="再次确认密码" @blur="pwd2">
          </div>
          <div class="z-right">
            <div class="sex">
              选择性别
              <input type="radio" v-model="user.auSex" :value="1" name="sex">男
              <input type="radio" v-model="user.auSex" :value="0" name="sex">女
            </div>
            <div class="addr">
              <p>地址:</p>
              <input type="text" class="sheng" v-model="sheng" placeholder="省*">
              <input type="text" class="shi" v-model="shi" placeholder="市*">
              <input type="text" class="xian" v-model="xian" placeholder="县(区)*">
            </div>
            <div class="btn" @click="confirm">确认注册</div>
            <div class="other">
              <img src="../../public/img/weibo.png" alt>
              <img src="../../public/img/qq1.png" alt>
              <img src="../../public/img/weixin.png" alt>
            </div>
          </div>
        </div>
      </div>
      <mfooter></mfooter>
    </div>
  </div>
</template>

<script>
import axios from "../axios";
import mheader from "../components/mheader";
import mfooter from "../components/mfooter";
import avatarinfo from "../components/avatarinfo";
export default {
  data() {
    return {
      data: "",
      flag: true,
      pwd:"",
      sheng:"",
      shi:"",
      xian:"",
      getc:false,
      isTelt:"",
      ispwd:false,
      bg:{
        background:'#ff6c7c'
      },
      user:{
        auTele:"",
        auName:"",
        auPwd:"",
        auSex:1,
        auAddress:""
      },
      code:"",
      tamp:"",
      hash:"",
      iscode:""
    };
  },
  components: {
    mheader,
    mfooter
  },
  created(){
    
  },
  methods: {
    getcode() {
      if(this.isTelt){         
        if (this.flag) {
          axios.get('index/checkUserPhone/'+this.user.auTele).then(res=>{
            this.isTelt=res.data
            if(res.data==false){
              this.$message.error("手机号已经被注册");
            }
          })
          axios.post('index/getSMS/'+this.user.auTele).then(res=>{
            this.tamp=res.data.tamp;
            this.hash=res.data.hash;
          })
          this.flag = false;
          this.data =59;
          const t = setInterval(() => {
            this.data--;
            if (this.data == 0) {
              clearInterval(t);
              this.$message.error("请重新获取");
              this.flag = true;
              this.data=""
            }
          }, 1000);
        }
      }else{       
        console.log(this.isTelt)
        this.$message.info("请输入正确的手机号")
      }
    },
    confirm(){
      this.user.auAddress=this.sheng+this.shi+this.xian;
      if(this.user.auSex==1){
        this.user.auSex="男"
      }else{
        this.user.auSex="女"
      }
      // auName=测试&auPwd=123&auTele=123123123
      // axios.post(`index/addAnimeUser?auName=${this.user.auName}&auPwd=${this.user.auPwd}&auTele=${this.user.auTele}&auSex=${this.user.auSex}&auAddress=${this.user.auAddress}`).then(res=>{
      //   console.log(res.data)
      // })

      if(this.ispwd){
        axios.post('index/postValNum/'+this.code+'/'+this.tamp+'/'+this.hash).then(res=>{
          if(res.data=='success'){
            axios.post(`index/addAnimeUser?auName=${this.user.auName}&auPwd=${this.user.auPwd}&auTele=${this.user.auTele}&auSex=${this.user.auSex}&auAddress=${this.user.auAddress}`).then(res=>{
              if(res.data=="注册成功"){
                this.$message.success("注册成功");
                this.$router.replace("/login")
              }
            })
          }
        })        
      }
    },
    changetel(){
      if(this.user.auTele.length==11){
        this.getc=true;
        // 判断手机号是否存在
        axios.get('index/checkUserPhone/'+this.user.auTele).then(res=>{
          this.isTelt=res.data
          if(res.data!=true){
            this.$message.error("手机号已经被注册");
          }
        })        
      }else{
        this.getc=false;
      }
    },
    pwd2(){
      if(this.pwd!=this.user.auPwd){
        this.$message.error("密码不一致")        
      }else{
        this.ispwd=true;
      }
    }
  }
};
</script>

<style scoped>
@import "../../public/css/reset.css";
@import "../../public/css/zhuce.css";
</style>
