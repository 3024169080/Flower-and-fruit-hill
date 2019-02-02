<template>
  <div>
    <div class="content w" v-for="(item,index) in msg" :key="index">
      <div class="content-header">
        <div class="user-pic">
          <img src="../../public/img/avatar.png" alt="">
        </div>
        <div class="user-name">
          <p>{{item.post_title}}</p>
          <p>{{item.post_time}} 来自 {{item.post_label}}</p>
        </div>
      </div>
      <div class="content-content">
        <p>
          {{item.post_content}}
        </p>
        <div class="content-img">
          <div style="display:block;width:120px;" @click="dialogVisible = true"><img :src="item.post_picture" alt=""></div>
            <el-dialog
              title="花果山帖子视频"
              :visible.sync="dialogVisible"
              width="750px"
            >
              <iframe v-if="dialogVisible" :src="'../../dplayer.html?post_video='+encodeURI(item.post_video)" allowfullscreen="allowfullscreen" frameborder="0" height="480" width="750" name="viewmap"></iframe>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span>
            </el-dialog>
        </div>        
      </div>
      <div class="content-foot">
        <div class="like">
          <div class="content-like">
            <img src="../../public/img/jushoucang.png" alt="">
            <span>{{item.post_type}}</span>
          </div>
          <div class="content-like">
            <img src="../../public/img/zan.png" alt="">
            <span>{{item.collect}}</span>
          </div>
          <div class="content-like">
            <img src="../../public/img/fankui.png" alt="">
            <span>{{item.replynum}}</span>
          </div>
        </div> 
      </div>
    </div>
    
  </div>

  
</template>

<script>
import axios from '../axios'
export default {
  data () {
    return{
      msg:[],
      pageCurrent:1,
      dialogVisible:false
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
    },
    openhtml(){
      window.open("../../dplayer.html")
    }
  }
}
</script>

<style scoped>
  @import '../../public/css/reset.css';
  @import '../../public/css/Content.css';
</style>


