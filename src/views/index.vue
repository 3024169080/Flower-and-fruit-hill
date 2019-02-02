<template>
  <div>
    <div class="container">
      <!-- 顶部 -->
      <mheader></mheader>
      <!-- banner图 -->
      <div class="banner">
        <img src="../../public/img/banner.png" alt>
      </div>
      <div class="main">
        <div class="aside-cont">
          <div class="aside">
            <div class="aside-tit">
              <h3>本周热门帖子</h3>
            </div>
            <ul class="aside-list">
              <li v-for="(item,index) in list" :key="index">
                <span>{{index+1}}</span>
                <p>{{item.aeType}}</p>
              </li>
            </ul>
          </div>
          <div class="aside-time">
            <h3>近期展会(无)</h3>
          </div>
        </div>
        <div class="content">
          <div class="recommend">
            <div class="recommend-tit">
              <h3>推荐漫展</h3>
              <div class="re-city">
                <ul class="looktfalse" v-if="!lookaddrall">
                  <li v-for="(item,index) in addr" :key="index" @click="changeaddr(index)">
                    <a href="###">{{addr[index]}}</a>
                  </li>
                </ul>
                <ul v-if="lookaddrall" class="looktrue">
                  <li v-for="(item,index) in addr" :key="index" @click="changeaddr(index)">
                    <a href="###">{{addr[index]}}</a>
                  </li>
                </ul>
                <span v-if="!lookaddrall" class="more" @click="lookaddrall=true">查看更多</span>
                <span v-else class="more" @click="lookaddrall=false">查看更多</span>
              </div>
            </div>
            <div class="re-list" v-loading="loading">
              <ul>
                <template v-for="(item,index) in list">
                  <li v-if="index<4" :key="index">
                    <img :src="item.aeLogo" alt>
                    <p class="tit">{{item.aeType}}</p>
                    <p class="time">时间:{{item.aeStarttime}}</p>
                    <p class="addr">{{item.aeAddress}}</p>
                    <span class="btn">
                      <router-link :to="'/pay?id='+item.aeId" tag="span">立即购票</router-link>
                    </span>
                  </li>
                </template>
              </ul>
            </div>
          </div>

          <div class="message">
            <div class="msg-list" v-for="(item,index) in msg" :key="index">
              <div class="msg-info">
                <img class="ava" src="../../public/img/avatar.png" alt>
                <div class="list-info">
                  <div class="info">
                    <p>{{item.post_title}}</p>
                    <p>{{item.post_time}} 来自 {{item.post_label}}</p>
                  </div>
                  <div class="info-msg">
                    <p class="ava-name">#{{item.post_section}}#</p>
                    <p class="ava-txt">{{item.post_content}}</p>
                  </div>
                  <div class="ava-img">
                    <div style="display:block;width:120px;" @click="dialogVisible = true">
                      <img :src="item.post_picture" alt>
                    </div>
                    <el-dialog title="花果山帖子视频" :visible.sync="dialogVisible" width="750px">
                      <iframe
                        v-if="dialogVisible"
                        :src="'../../dplayer.html?post_video='+encodeURI(item.post_video)"
                        allowfullscreen="allowfullscreen"
                        frameborder="0"
                        height="480"
                        width="750"
                        name="viewmap"
                      ></iframe>
                      <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                      </span>
                    </el-dialog>
                  </div>
                  <div class="ava-status">
                    <ul>
                      <li @click="shoucang(index,item.ae_id)">
                        <i class="el-icon-shoucang" :class="{active:item.flag1}"></i>
                        <span>{{item.post_type}}</span>
                      </li>
                      <li @click="dianzan(index)">
                        <i class="el-icon-dianzan"  :class="{active:item.flag2}"></i>
                        <span>{{item.collect}}</span>
                      </li>
                      <li @click="pinglun(index,item.replynum,item)">
                        <i class="el-icon-iconfontpinglun"></i>
                        <span>{{item.replynum}}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="pinglun" v-if="item.flag">
                <ul>
                  <template v-for="(item,i) in upinglun[index]">
                    <li :key="i">
                      <p>{{item.auName}}:</p>
                      <p>{{item.eeContent}}</p>
                    </li>
                  </template>
                </ul>
              </div>
            </div>
          </div>
          <div class="lookmore" @click="addpageCurrent">查看更多</div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <mfooter></mfooter>
  </div>
</template>

<script>
import axios from "../axios";
import mheader from "../components/mheader";
import mfooter from "../components/mfooter";
import { addr } from "../config/addr.js";
export default {
  data() {
    return {
      list: [],
      msg: [],
      pageCurrent: 1,
      loading: true,
      lookaddrall: false,
      addr: addr,
      status: {
        aeAddress: 0,
        aeEndtime: 0,
        aeStarttime: 0,
        aeType: 0,
        pageCurrent: 1,
        pageSize: 5
      },
      dialogVisible: false,
      // 帖子状态
      udianzan: [],
      ushoucang: [],
      showshoucang:false,
      shoucangshow:false,
      upinglun: [],
      pinglunshow:false,
      userlogin: {},
      islogin: false,
      showpinglun:true,
    };
  },
  components: {
    mheader,
    mfooter
  },
  created() {
    const indexcode=window.location.search.split("?code=")[1];
    if(indexcode){
      // 向后端传token
      console.log(indexcode)
      axios.get('oauth/callback/qq/'+indexcode).then(res=>{
        console.log(res.data)
        localStorage.setItem("login", JSON.stringify(res.data));
        localStorage.setItem("user", JSON.stringify(res.data));
        // this.$router.replace("/");
        window.location.href="/http:localhost:8080/";
      })

    }
    if (localStorage.getItem("login")) {
      this.userlogin = JSON.parse(localStorage.getItem("login"));
      this.islogin = true;
    } else {
      this.islogin = false;
    }
    // 4/5/1/3/0/2
    // 1 5 0 0 0 0
    this.getanimeExpo(this.status);
    this.getmsg(this.pageCurrent);

    // 收藏
    if (this.islogin) {
      axios
        .get(
          "userCollectController/queryUserCollect/1/200/" + this.userlogin.auId
        )
        .then(res => {
          this.ushoucang = res.data.page;
        });
    }
    
  },
  methods: {
    getanimeExpo(status) {
      this.loading = true;
      axios
        .get(
          `animeExpo/queryAePageList/${status.pageCurrent}/${status.pageSize}/${
            status.aeEndtime
          }/${status.aeType}/${status.aeAddress}/${status.aeStarttime}`
        )
        .then(res => {
          this.list = res.data.page;
          this.loading = false;
        });
    },
    getmsg(status) {
      axios.get(`animePosted/getQueryPostedPage/${status}/5/0`).then(res => {
        this.msg = [...this.msg, ...res.data.page];
        this.msg.forEach((a,b)=>{
          // this.msg[b].flag=false;
          this.$set(this.msg[b],'flag',false);
        })
      });
    },
    changeaddr(i) {
      if (i == 0) {
        this.status.aeAddress = 0;
      } else {
        this.status.aeAddress = addr[i];
      }
      this.getanimeExpo(this.status);
    },
    addpageCurrent() {
      this.pageCurrent++;
      this.getmsg(this.pageCurrent);
    },
    openhtml() {
      window.open("../../dplayer.html");
    },
    // 收藏，点赞，评论方法
    shoucang(i,id) {
      // this.shoucangshow=!this.shoucangshow;
      // this.showshoucang=i;
      if(this.islogin){
        this.$set(this.msg[i],"flag1",!this.msg[i].flag1)
        if(this.msg[i].flag1){
          axios.post(`userCollectController/addUserCollect/${this.userlogin.auId}/${id}`).then(res=>{
            if(res.data=="收藏成功"){
              this.$message.success("收藏成功");
            }
          })
        }else{
          axios.get(`userCollectController/delUserCollect/${id}`).then(res=>{
            this.$message.info("取消收藏");
          })
        }
      }else{
        this.$message.info("请先登录")
      }
    },
    dianzan(i) {
      this.$set(this.msg[i],"flag2",!this.msg[i].flag2)
      if(this.msg[i].flag2){
        this.$message.success("点赞成功");
      }else{
        this.$message.info("取消点赞");
      }
    },
    pinglun(i,num) {
      // this.msg.forEach((a,b)=>{
      //     this.$set(this.msg[b],'flag',false);
      // })
      this.$set(this.msg[i],"flag",!this.msg[i].flag)
      console.log(this.msg[i].flag)
      axios.get("expoEvaluation/queryEvaluation/1/"+num).then(res => {
        this.upinglun.push(res.data.page);
      });
    }
  }
};
</script>

<style scoped>
@import "../../public/css/reset.css";
@import "../../public/css/style.css";
</style>
