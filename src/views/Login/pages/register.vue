<template>
<div class="bg">
  <div class="box">
    <span class="icon1"></span>
    <span class="icon2"></span>
    <div class="leftBox"></div>
    <div class="rightBox">
      <p class="h1">欢迎注册</p>
      <p class="h2">米牙的node学习</p>
      <div class="form">
        <div class="item">
          <p>账号：</p>
          <input v-model.trim="RegistParams.account" class="input1" type="text">
        </div>
        <div class="item">
          <p>用户名：</p>
          <input v-model.trim="RegistParams.name" class="input1" type="text">
        </div>
        <div class="item">
          <p>密码：</p>
          <input v-model.trim="RegistParams.userPwd" maxlength="12" class="input1" type="password">
        </div>
        <div class="item">
          <p>验证码：</p>
          <input v-model.trim="RegistParams.code" class="input1 input2" maxlength="4" @keyup.enter="handleRegist">
          <span @click="getCode" class="code" v-html="codeImg"></span>
          <!-- <img :src="codeImg" @click="getCode" class="code"> -->
        </div>
        <div class="btn" :class="{RegistNow:loading}" @click="handleRegist">注册</div>


      </div>
    </div>
  </div>
  <!-- <p class="footer"><span>德清县金融办</span><span style="margin: 0 20px">德清县大数据发展管理局</span>技术支持:德清移通大数据有限公司</p> -->
</div>
</template>

<script>
import {CODEURL} from '@/assets/js/config.js';
import {Regist,GetCode} from '../assets/js/getData'
export default {
  data (){
    return {
      codeImg:'',
      RegistParams:{},
      loading:false,
      canGetCode:true,

    };
  },
  methods:{
    //获取验证码
    getCode(){
      if(!this.canGetCode) return;
      this.canGetCode=false;
      GetCode({}).then(msg=>{
        this.canGetCode=true;
        if(msg.success){
          this.codeImg=msg.data.codeImg;
          sessionStorage.setItem("token",msg.data.token);
        }
      }).catch(err=>this.canGetCode=true)
    },
    //注册
    handleRegist(){
      if(!this.RegistParams.account){
        this.$message.error("请输入账号");
        return;
      }
      if(!this.RegistParams.name){
        this.$message.error("请输入用户名");
        return;
      }
      if(!this.RegistParams.userPwd){
        this.$message.error("请输入密码");
        return;
      }
      if(this.RegistParams.userPwd.length<6){
        this.$message.error("密码为6到12位");
        return;
      }
      if(this.RegistParams.code.length!=4){
        this.$message.error("请输入4位数验证码");
        return;
      }
      this.loading=true;
      Regist(this.RegistParams).then(msg=>{
        this.loading=false;
        if(msg.success){
          let data=msg.data;
          this.$message.success("注册成功");
          this.$router.push("/login");
        }
      }).catch(err=>{
        this.loading=false;
      })
    },


  },
  mounted(){
    this.getCode();
  },
}

</script>
<style lang='less' src="../assets/css/login.less" scoped>
</style>
