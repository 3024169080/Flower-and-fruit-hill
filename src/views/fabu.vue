<template>
  <div class="content">
    <mheader></mheader>
    <div class="fabu">
      <!-- <h3>发布帖子</h3>
                
                <div class="biaopian">
                    <h4>标题</h4>
                    <input type="text" placeholder="输入帖子标题" v-model="neirong.postTitle">
                    <h4>标签</h4>
                    <input type="text" placeholder="输入帖子标题" v-model="neirong.postLabel">
                </div>
                <div class="neirong">
                    <h4>正文</h4>
                    <textarea class="neirong-sr" placeholder="输入内容" v-model="neirong.postContent"></textarea>
                </div>
                <select name="" class="shortselect" id="" v-model="neirong.postSection">
                    <option value="">--请选择--</option>
                    <option v-for='(item,index) in postSections' :key="index">{{ item }}</option>
      </select>-->
      <!-- <div class="tupianliebiao">
                     
                     <div class="tupian"  style="position: relative;" >

                         <input type="file" name='file' id="fileBtn" @change="handleFileChange(this)">
                        +
                    </div>
                    <div class="tupian"  style="position: relative;" >

                         <input type="file">
                        +
                    </div>
      </div>-->
      <!-- <el-upload
                action="http://moff.purvavideha.cn/getUpToken/img"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                autoUpload="false"
                
                >
                <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
      -->
      <!-- <iframe> -->
      <iframe
        name="child"
        id="child"
        :src="'http://moff.purvavideha.cn'+'/animePosted/addPosted?auId='+encodeURI(user.auId)"
        frameborder="0"
        scrolling="no"
        style="position:related;top: 2.8px;left: 0px;"
      ></iframe>
      <!-- <iframe name = "child" id = "child" :src="www.baidu.com#asd=1" width="1920" height="880" frameborder="0" scrolling="no" style="position:related;top: 2.8px;left: 0px;"></iframe> -->
      <!-- <button @click="fabu">发布</button> -->
    </div>
    <mfooter></mfooter>
  </div>
</template>

<script>
import axios from "./../axios";
import mfooter from "../components/mfooter";
import mheader from "../components/mheader";
export default {
  components: {
    mfooter,
    mheader
  },
  data() {
    return {
      user: "",
      postSections: [
        "不关联",
        "扩列",
        "Cosplay",
        "求助",
        "三次元",
        "二手交易",
        "情报贴",
        "绘画",
        "壁纸",
        "活动",
        "自拍",
        "倾耳倾听",
        "宅学",
        "宅舞",
        "穿越",
        "段漫画"
      ],

      neirong: {
        postTitle: "",
        postContent: "",
        postLabel: "",
        auId: "",
        postSection: ""
      },
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  computed: {},
  methods: {
    tupian() {},
    fabu() {
      axios("animePosted/addPosted", {
        params: this.neirong
      }).then(res => {
        
      });
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.neirong.auId = this.user.auId;
  }
};
</script>

<style scoped>
@import "./../../public/css/fabu.css";
</style>
