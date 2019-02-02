<template>
  <div>
    <mheader></mheader>
    <div class="pay">
      <div class="pay-l">
        <div class="pay-l-top">
          <img width="170" height="230" :src="pay.aeLogo" alt>
          <div class="pay-info">
            <h3>{{pay.aeName}}</h3>
            <p class="jianjie">
              简介：
              <span>{{pay.aeMessage}}</span>
            </p>
            <p class="sterttime">
              开始时间：
              <span>{{pay.aeStarttime}}</span>
            </p>
            <p class="endtime">
              结束时间：
              <span>{{pay.aeEndtime}}</span>
            </p>
            <p class="addr">
              地址：
              <span>{{pay.aeFulladdress}}</span>
            </p>
            <p class="shoupiao">
              售票方式：
              <span>电子售票</span>
            </p>
            <div class="btn" @click="dialogVisible = true">地图查找</div>
            <!-- <iframe src="../../map.html" frameborder="0" height="600" width="600" name="viewmap"></iframe> -->
            <!-- <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button> -->
            <el-dialog title="花果山漫展" :visible.sync="dialogVisible" width="540px">
              <iframe
                :src="'../../map.html?ipt='+encodeURI(pay.aeFulladdress)"
                frameborder="0"
                height="550"
                width="510"
                name="viewmap"
              ></iframe>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span>
            </el-dialog>
          </div>
        </div>
        <div class="pay-l-main">
          <h3>详细介绍</h3>
          <h4>2019首页吉林市雾凇动漫节(既第四届神月动漫嘉年华 漫游人生only)</h4>
          <p class="jianjie">
            主办方：
            <span>吉林人民大剧院</span>
          </p>
          <p class="xieban">
            协办方：
            <span>神月动漫文化传播有限责任公司，吉林灵隆环境科技有限公司</span>
          </p>
          <p class="piaojia">
            票价：
            <span>预售单日35元场售单日45元 双日票90元(送动漫主题福袋一个)</span>
          </p>
          <p class="jiabin">
            主持嘉宾确立：
            <span>1.20嘉宾二鬼/小琪/小雪</span>
          </p>
          <p class="pay-main">
            比赛内容：
            <span>宅舞单人赛，奖金500/300/200</span>
          </p>
          <p class="manzhan">漫展活动二宣发布,购买预售票还有礼品相送哦！</p>
          <p class="hezuo">商务合作QQ：1076014624</p>
          <p class="baoming">节目报名</p>
          <p class="qun">漫展官方群：55607122</p>
          <p class="qun">比赛报名群：169524632</p>
          <p class="huodong">活动信息二宣公布哦！敬请期待</p>
        </div>
      </div>
      <div class="pay-r">
        <h3>购票确认</h3>
        <p class="piaozhong">选择票种：预售票</p>
        <p class="changci">选择场次：默认场次</p>
        <p class="num">
          购票数量：
          <span>1</span>
        </p>
        <p class="yuanjia">原价：{{pay.aeOldfare}}.00</p>
        <p class="xianjia">运费：0</p>
        <p class="all">现价：{{pay.aeNewfare}}.00</p>
        <p class="tongyi">
          <input type="checkbox" checked v-model="ischecked">我已同意购票协议
        </p>
        <div class="btn" @click="topay">立即支付</div>
        <el-dialog title="请点击选择付款方式" :visible.sync="dialogVisible2" width="35%">
          <div>
            <p>购票类型:</p>
            <el-radio v-model="aueType" :label="0">自己玩</el-radio>
            <el-radio v-model="aueType" :label="1">找伙伴</el-radio>
            <el-radio v-model="aueType" :label="2">找cp</el-radio>
            <el-radio v-model="aueType" :label="3">招妆娘</el-radio>
          </div>
          <ul class="selectpay">
            <li>
              <el-popover
                v-if="erweima"
                placement="bottom"
                title="请用支付宝扫码付款"
                width="220"
                trigger="click"
                content=""
              >
                <vue-qr v-loading="payloading" :bgSrc="config.logo" :text="config.value" :size="200"></vue-qr>
                <p slot="reference" @click="alipayapi">支付宝</p>
              </el-popover>
            </li>
            <!-- <li>
              <p>猴币</p>
            </li> -->
          </ul>
          <p class="paynum">需支付金额：￥{{pay.aeNewfare}}</p>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible2 = false">取消</el-button>
            <el-button type="primary" @click="dialogVisible2 = false">确认</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
    <mfooter></mfooter>
  </div>
</template>

<script>
import axios from "../axios";
import mheader from "../components/mheader";
import mfooter from "../components/mfooter";
import VueQr from "vue-qr";
export default {
  data() {
    return {
      pay: {},
      aueType:0,
      payid: "",
      dialogVisible: false,
      dialogVisible2: false,
      ischecked: true,
      selectpay: ["支付宝", "猴币"],
      config: {
        value: "https://qr.alipay.com/bax08541auiqqct79oqm802a", //显示的值、跳转的地址
        // imagePath: require("../assets/huli.png") //中间logo的地址
      },
      payloading:false,
      alipayapibtn:true,
      erweima:true
    };
  },
  components: {
    mheader,
    mfooter,
    VueQr
  },
  created() {
    if (this.$route.query.id) {
      this.payid = this.$route.query.id;
    } else {
      this.payid = 1;
    }
    axios.get("animeExpo/queryExpoDetail/" + this.payid).then(res => {
      if (res.data.code == 200) {
        this.pay = res.data.data[0];
      }
    });
  },
  methods: {
    topay() {
      if (this.ischecked) {
        this.dialogVisible2 = true;
      } else {
        this.$alert("请同意购票协议", "提示", {
          confirmButtonText: "确定"
        });
      }
    },
    alipayapi(){
      if(this.alipayapibtn){
        this.alipayapibtn=false;
        axios.get('alipay/getQRCodeImg/购买展票/0.01').then(res=>{
          if(res.data.code==200){
            // this.payloading=true;
            // console.log(res.data.data[0].qrCodeStr)   //二维码
            // console.log(res.data.data[0].tradeNo)     //订单号
            this.config.value=res.data.data[0].qrCodeStr;
            let t=setInterval(()=>{
              axios.get(`alipay/queryTradePayStatus/${res.data.data[0].tradeNo}`).then(res=>{
                if(res.data.code==200){
                  clearInterval(t);
                  const payuserid=JSON.parse(localStorage.getItem("user")).auId
                  axios.put(`userWalletController/updateTicket/${payuserid}/${this.pay.aeId}/${this.aueType}/支付宝`).then(res=>{                  
                    if(t){
                      clearInterval(t);
                    }
                    if(res.data="购买成功"){
                      this.$message.success("购买成功");
                      this.dialogVisible2=false;
                      this.erweima=false;
                    }
                  })
                }
              })
            },3000)
          }
  
        })
      }
    }
  }
};
</script>

<style scoped>
@import "../../public/css/reset.css";
@import "../../public/css/pay.css";
</style>
