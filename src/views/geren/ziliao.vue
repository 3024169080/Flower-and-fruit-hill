<template>
  <div class="cont-right-box clearfix" v-loading="loading">
    <div class="cont-right-header">个人资料</div>
    <div class="cont-right-icon">
      <span>头像:</span>
      <img v-if="xinxi.auAvatar"
            width="61"
            height="61"
            style="border-radius:50%;"
            :src="xinxi.auAvatar"
            alt
          >
          <img v-else
            width="61"
            height="61"
            style="border-radius:50%;"
            src="../../../public/img/my.png"
            alt
          >
      <!-- <img :src="xinxi.auAvatar" alt=""> -->
    </div>
    <div class="cont-right-list">
      <ul>
        <li>
          <span>昵称:</span>
          <!-- <span>微凉</span> -->
          <span>{{xinxi.auName}}</span>
        </li>
        <li>
          <span>性别:</span>
          <!-- <span>男</span> -->
          <span>{{xinxi.auSex?xinxi.auSex:"暂无"}}</span>
        </li>
        <li>
          <span>年龄:</span>
          <!-- <span>18</span> -->
          <span>{{xinxi.auAge?xinxi.auAge:"暂无"}}</span>
        </li>        
        <li>
          <span>个性签名:</span>
          <!-- <span>动漫爱好者</span> -->
          <span>{{xinxi.auWorks ? xinxi.auWorks : "暂无"}}</span>
        </li>
        <li>
          <span>地址:</span>
          <!-- <span>河南省郑州市高新区</span> -->
          <span>{{xinxi.auAddress?xinxi.auAddress : "暂无"}}</span>
        </li>
      </ul>
    </div>
    <!-- <a href="http://moff.purvavideha.cn/animeUserController/toUpdateUserInfo" class="cont-right-btn1">编辑资料</a> -->
    <!-- <p class="cont-right-btn1">编辑资料</p> -->
    <!-- <el-button type="text" @click="isdisshow" class="cont-right-btn1">编辑资料</el-button> -->
    <el-dialog :visible.sync="disshow" :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="地址">
          <el-input v-model="form.addr"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.age"></el-input>
        </el-form-item>
        <!-- <el-form-item label="ID">
                    <el-input v-model="form.id"></el-input>
        </el-form-item>-->
        <el-form-item label="昵称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="form.sex" :label="0">男</el-radio>
          <el-radio v-model="form.sex" :label="1">女</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="disshow = false">取 消</el-button>
        <el-button type="primary" @click="tijiao">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "../../axios";
export default {
  data() {
    return {
      xinxi: {
        auName: "",
        auSex: "",
        auAge: "",
        auTele: "",
        auEmail: "",
        auWorks: "",
        auAddress: ""
      },
      loading: false,
      user: null,
      disshow: false,
      form: {
        addr: "",
        age:null,
        touxiang:"",
        id: 2,
        name: "",
        sex:0,
        shejiao: "运动",
        work: "cos"
      }
    };
  },
  created() {
    this.xinxi = JSON.parse(localStorage.getItem("user"));
    // axios
    //   .get("animeUserController/queryUserByUserId/" + this.user.auId)
    //   .then(res => {
    //     // axios.get("animeUserController/queryUserByUserId/2").then(res=>{
    //     this.xinxi = res.data;
    //     this.loading = false;
    //     console.log(this.xinxi)
    //   });
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    isdisshow(){
      this.disshow=true;
      this.form.name=this.xinxi.auName;
    },
    tijiao() {
      this.disshow = false;
      axios
        .put(
          `animeUserController/updateUserByUserId/${this.xinxi.auId}/${
            this.form.name
          }/${this.form.age}/${this.form.sex}/biu~biu~ciu/我的山头/${
            this.form.addr
          }/${this.xinxi.auAvatar}`
        )
        .then(res => {
          // this.$message("修改成功")
          this.loading = true;
          axios
            .get("animeUserController/queryUserByUserId/" + this.xinxi.auId)
            .then(res => {
              // axios.get("animeUserController/queryUserByUserId/2").then(res=>{
              console.log(res.data);
              this.xinxi = res.data;
              this.loading = false;
            });
        });
    }
  }
};
</script>

<style scoped>
@import "../../../public/css/gerenziliao.css";
</style>
