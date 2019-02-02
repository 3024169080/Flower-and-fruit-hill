<template>
  <div class="cont-right-box">
    <div class="cont-right-header">修改密码</div>
    <div class="cont-right-ct">
      <ul>
        <li>
          <input type="text" v-model="phone" placeholder="输入您的手机号">
        </li>
        <!-- <li>
                   <input v-model="yanzhengma" placeholder="输入验证码">
                   <span class="yanzhengma" @click="huoqu" ref="yanzhengma">获取验证码</span>
        </li>-->
        <li>
          <input type="password" v-model="newpassword" placeholder="请设置新密码" @focus="newfocus">
        </li>
        <li>
          <input
            type="password"
            v-model="password"
            placeholder="再次确认密码"
            @focus="pafocus"
            @blur="pablur"
          >
        </li>
      </ul>
      <p class="queren" @click="queren">确定</p>
    </div>
  </div>
</template>

<script>
import axios from "../../axios";
export default {
  data() {
    return {
      phone: "",
      // yanzhengma:"",
      newpassword: "",
      password: ""
    };
  },
  methods: {
    huoqu() {
      var x = 10;
      setInterval(() => {
        x--;
        this.$refs.yanzhengma.innerHTML = x;
        if (x < 1) {
          this.$refs.yanzhengma.innerHTML = "获取验证码";
        }
      }, 1000);
    },
    newfocus() {
      if (this.phone == "") {
        this.$message("请输入手机号");
      }
    },
    pafocus() {
      if (this.phone == "") {
        this.$message("请输入手机号");
      } else if (this.newpassword == "") {
        this.$message("请输入新密码");
      }
    },
    pablur() {
      if (this.newpassword != this.password) {
        this.$message("确认密码错误");
      }
    },
    queren() {
      if (this.phone == "") {
        this.$message("请输入手机号");
      } else if (this.newpassword == "") {
        this.$message("请输入新密码");
      } else if (this.newpassword != this.password) {
        this.$message("确认密码错误");
      }
      if (
        this.phone != "" &&
        this.newpassword != "" &&
        this.newpassword == this.password
      ) {
        axios
          .put(`index/updatePwd?auPwd=${this.password}&auTele=${this.phone}`)
          .then(res => {
            this.$message("修改密码成功");
          });
      }
    }
  }
};
</script>

<style scoped>
@import "../../../public/css/gerenxiugaimima.css";
</style>
