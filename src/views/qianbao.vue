<template>
  <div>
    <div class="container">
      <mheader></mheader>
      <div class="qian-box">
        <div class="qian-header">
          <h2>花果山钱包</h2>
          <!-- <h4>余额：{{balance}}</h4>
          <h4>花费:{{cons}}</h4>-->
          <p class="qian-header-hua">
            <span>余额：{{balance}}</span>
            <span>花费:{{cons}}</span>
          </p>
        </div>
        <div class="qian-cont-tp clearfix">
          <div class="qian-cont-tp-lt">
            <img src="../../public/img/aqian1.png" alt>
            <span>猴币充值</span>
          </div>
          <div class="qian-cont-tp-rt">
            <h3>猴币充值</h3>
            <div class="qian-cont-tp-rt-ct">
              <p>充值金额:
                <input type="txt" v-model="jine">元 兑换比例:1猴币=￥1(人民币)
              </p>
              <div class="qian-cont-tp-rt-ct-list-box clearfix">
                <ul class="qian-cont-tp-rt-ct-list">
                  <!-- <li>10币</li>
                                    <li>20币</li>
                                    <li>50币</li>
                  <li>100币</li>-->
                  <li
                    v-for="(item,index) in arr"
                    :key="index"
                    @click="btnarr(index)"
                    :class="{listl:x==index}"
                  >{{item}}币</li>
                </ul>
              </div>
              <div class="qian-cont-zhifu-icon-box">
                <div class="qian-cont-zhifu-icon">
                  <span>在线充值:</span>
                  <img src="../../public/img/azhifubao.png" alt>
                </div>
                <!-- <p class="qian-cont-zhifu-tp-rt-ct-queren" @click="chongzhi">确认充值</p> -->
                <el-button
                  type="text"
                  class="qian-cont-zhifu-tp-rt-ct-queren"
                  @click="chongzhi"
                >确认充值</el-button>
                <el-dialog :visible.sync="disshow" width="30%">
                  <p style="text-align:center;font-size:18px;">支付宝扫码充值</p>
                  <vue-qr :text="config.value" :size="200" class="qianbaoerweima"></vue-qr>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="quxiao">取 消</el-button>
                    <!-- <el-button type="primary" @click="disshow = false">确 定</el-button> -->
                  </span>
                </el-dialog>
              </div>
            </div>
            <div class="qian-cont-zhifu-shuoming">
              <h4>充值说明</h4>
              <p>1、兑换比例为1:1,即1RMB=1猴币</p>
              <p>2、最低充值10元，建议按100为整数面额进行充值</p>
              <h4>流程说明</h4>
              <p>1、填写信息：进入积分充值页面，填写充值金额，并选择支付方式，提交进入下一步；</p>
              <p>2、生成订单：系统自动生成一条充值订单记录，等待用户付款，此时订单状态为“未支付订单”</p>
              <p>3、用户付款：进入付款页面，当您付款成功后，订单信息会变为“已完成订单”状态，同时系统会给您的账户充入相应的喵币。</p>
            </div>
          </div>
        </div>
        <div class="qian-cont-bm clearfix">
          <div class="qian-cont-bm-lt">
            <img src="../../public/img/aqian2.png" alt>
            <span>消费记录</span>
          </div>
          <div class="qian-cont-bm-rt">
            <h3>消费记录</h3>
            <div class="qian-cont-bm-rt-list clearfix">
              <ul>
                <li>时间筛选</li>
                <li>开始时间</li>
                <li>至</li>
                <li>结束时间</li>
                <li>确定</li>
              </ul>
            </div>
            <ul class="qian-cont-xiaofei clearfix">
              <!-- <li>猴币充值记录</li>
              <li>猴币消费记录</li>-->
              <li
                v-for="(item,index) in arr2"
                :key="index"
                @click="btnarr2(index)"
                :class="{xiaofei:y==index}"
              >猴币{{item}}记录</li>
            </ul>
            <div class="qian-cont-jilu clearfix">
              <ul class="qian-cont-jilu-list clearfix">
                <li>ID</li>
                <li>名称</li>
                <li>金额</li>
                <li>渠道</li>
                <li>交易时间</li>
              </ul>
              <!-- 请求到的记录数据渲染此处 -->
              <ul v-for="(item,index) in xiaofei" :key="index" class="qian-cont-jilu-list clearfix">
                <li>{{item.wmsgId}}</li>
                <li>{{item.rewordedName}}</li>
                <li>{{item.wmsgMoney}}</li>
                <li>{{item.wmsgType}}</li>
                <li>{{item.wmsgDate}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <el-button></el-button>
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
      jine: "",
      arr: [10, 20, 50, 100],
      x: 0,
      arr2: ["充值", "消费"],
      y: 0,
      xiaofei: [],
      flag: true,
      dingdanName: 0,
      arrmoney: "",
      disshow: false,
      config: {
        value: "" //显示的值、跳转的地址
        //  imagePath: require('../assets/logo.png')//中间logo的地址
      },
      hideint1: true,
      user: null,
      balance: "",
      cons: ""
    };
  },
  components: {
    mheader,
    mfooter,
    VueQr
  },
  methods: {
    btnarr(index) {
      // console.log(index);
      this.flag = false;
      this.x = index;
      this.jine = "";
      this.arrmoney = this.arr[index];
      // console.log(this.arr[index]);
    },
    btnarr2(index) {
      // console.log(index);
      this.y = index;
      // console.log(this.arr2[index]);
      axios
        .get(
          `userWalletController/queryUserWalletMessage/1/12/1/${
            this.arr2[index]
          }/2019-01-09/2019-01-20`
        )
        .then(res => {
          // console.log(res.data.page);
          this.xiaofei = res.data.page;
        });
    },
    chongzhi() {
      this.disshow = true;
      this.user = JSON.parse(localStorage.getItem("user"));
      if (this.hideint1 == true) {
        this.hideint1 = false;
        if (this.jine == "" && this.flag == true) {
          axios.get(`alipay/getQRCodeImg/1/${this.arr[0]}`).then(res => {
            // console.log(res.data.data);
            // console.log(res.data.data[0].qrCodeStr);//二维码
            // console.log(res.data.data[0].tradeNo);  //订单号
            // console.log(res.data.code);
            if (res.data.code == 200) {
              this.config.value = res.data.data[0].qrCodeStr;
              var t = setInterval(() => {
                axios
                  .get("alipay/queryTradePayStatus/" + res.data.data[0].tradeNo)
                  .then(res => {
                    if (res.data.code == 200) {
                      clearInterval(t);
                      axios
                        .post(
                          `userWalletController/updateUserBalance/${
                            this.user.auId
                          }/${this.arr[0]}`
                        )
                        .then(res => {
                          if (res.status == 200) {
                            this.disshow = false;
                            this.$message.success("充值成功");
                            axios
                              .get(
                                "animeUserController/queryUserByUserId/" +
                                  this.user.auId
                              )
                              .then(res => {
                                this.balance = res.data.auBalance;
                                this.cons = res.data.auCons;
                              });
                          }
                        });
                      this.hideint1 = true;
                    } else if (this.disshow == false) {
                      clearInterval(t);
                      this.hideint1 = true;
                    }
                  });
              }, 5000);
            }
          });
          // console.log(this.arr[0]);
        } else if (this.jine != "") {
          axios.get(`alipay/getQRCodeImg/1/${this.jine}`).then(res => {
            // console.log(res.data.data);
            // console.log(res.data.data[0].qrCodeStr);//二维码
            // console.log(res.data.data[0].tradeNo);  //订单号
            // console.log(res.data.code);
            if (res.data.code == 200) {
              this.config.value = res.data.data[0].qrCodeStr;
              var t = setInterval(() => {
                axios
                  .get("alipay/queryTradePayStatus/" + res.data.data[0].tradeNo)
                  .then(res => {
                    if (res.data.code == 200) {
                      clearInterval(t);
                      axios
                        .post(
                          `userWalletController/updateUserBalance/${
                            this.user.auId
                          }/${this.arr[0]}`
                        )
                        .then(res => {
                          if (res.status == 200) {
                            this.disshow = false;
                            this.$message("充值成功");
                            axios
                              .get(
                                "animeUserController/queryUserByUserId/" +
                                  this.user.auId
                              )
                              .then(res => {
                                this.balance = res.data.auBalance;
                                this.cons = res.data.auCons;
                              });
                          }
                        });
                      this.hideint1 = true;
                    } else if (this.disshow == false) {
                      clearInterval(t);
                      this.hideint1 = true;
                    }
                  });
              }, 5000);
            }
          });
          // console.log(this.jine);
        } else {
          axios.get(`alipay/getQRCodeImg/1/${this.arrmoney}`).then(res => {
            // console.log(res.data.data);
            // console.log(res.data.data[0].qrCodeStr);//二维码
            // console.log(res.data.data[0].tradeNo);  //订单号
            // console.log(res.data.code);
            if (res.data.code == 200) {
              this.config.value = res.data.data[0].qrCodeStr;
              var t = setInterval(() => {
                axios
                  .get("alipay/queryTradePayStatus/" + res.data.data[0].tradeNo)
                  .then(res => {
                    if (res.data.code == 200) {
                      clearInterval(t);
                      axios
                        .post(
                          `userWalletController/updateUserBalance/${
                            this.user.auId
                          }/${this.arr[0]}`
                        )
                        .then(res => {
                          if (res.status == 200) {
                            this.disshow = false;
                            this.$message("充值成功");
                            axios
                              .get(
                                "animeUserController/queryUserByUserId/" +
                                  this.user.auId
                              )
                              .then(res => {
                                this.balance = res.data.auBalance;
                                this.cons = res.data.auCons;
                              });
                          }
                        });
                      this.hideint1 = true;
                    } else if (this.disshow == false) {
                      clearInterval(t);
                      this.hideint1 = true;
                    }
                  });
              }, 5000);
            }
          });
          // console.log(this.arrmoney);
        }
      }
    },
    quxiao() {
      this.disshow = false;
    }
  },
  created() {
    // axios.get("userWalletController/queryUserWalletMessage/1/12/1/%E5%85%85%E5%80%BC/2019-01-09/2019-01-20").then(res=>{
    axios
      .get(
        "userWalletController/queryUserWalletMessage/1/12/1/充值/2019-01-09/2019-01-20"
      )
      .then(res => {
        // console.log(res.data.page);
        this.xiaofei = res.data.page;
      });
    this.user = JSON.parse(localStorage.getItem("user"));
    axios
      .get("animeUserController/queryUserByUserId/" + this.user.auId)
      .then(res => {
        console.log(res.data);
        this.balance = res.data.auBalance;
        this.cons = res.data.auCons;
      });
  }
};
</script>

<style scoped>
@import "../../public/css/reset.css";
@import "../../public/css/style.css";
@import "../../public/css/qianbao.css";
</style>
