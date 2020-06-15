<template>
<div>
 <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider
      :trigger="null"
      collapsible
      v-model="collapsed"
    >
      <div class="logo">
        <!-- <img src="../assets/img/logo.png"> -->
        <span v-show="!collapsed">我的node实现demo</span>
      </div>
      <a-menu
        theme="dark"
        mode="inline"
        @click="handleClick"
        :defaultSelectedKeys="defaultKey">
        <a-menu-item v-for="v in menuArr" :key="v.path">
          <a-icon :type="v.icon" />
          <span>{{v.name}}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="myHeader flex" style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="()=> collapsed = !collapsed"
        />
        <span class="userInfo">
          <!-- <span class="screen" @click="jumptoScreen">大屏</span> -->
          <a-dropdown>
            <span class="ant-dropdown-link drop" href="#">
              {{userName}} <a-icon type="down" />
            </span>
            <a-menu slot="overlay">
              <a-menu-item>
                <span @click="handleUser(1)">修改密码</span>
              </a-menu-item>
              <a-menu-item>
                <span @click="handleUser(2)">退出登录</span>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
      </a-layout-header>
      <router-view/>
    </a-layout>
  </a-layout>

  <a-modal
    okText="确认"
    cancelText="取消"
    :width="popBox.width"
    :title="popBox.title"
    v-model="popBox.show"
    @ok="handleOk"
  >
    <div class="marginBottom">
      <span class="red" style="margin-left:15px">*</span> 原密码：<a-input maxlength="12" type="password" style="width: 200px;" placeholder="请输入" v-model.trim="popBox.oldPwd"/>
    </div>
    <div class="marginBottom">
      <span class="red" style="margin-left:15px">*</span> 新密码：<a-input maxlength="12" type="password" style="width: 200px;" placeholder="请输入" v-model.trim="popBox.newPwd"/>
    </div>
      <span class="red">*</span> 确认密码：<a-input maxlength="12" type="password" style="width: 200px;" placeholder="请输入" v-model.trim="popBox.check"/>

  </a-modal>
</div>
</template>

<script>
import {ModifyPwd,Logout} from '../assets/js/getData.js'
export default {
  data (){
    return {
      collapsed: false,
      menuArr:[],
      defaultKey:[this.$route.meta.menuPath],
      userName:sessionStorage.getItem("userName"),
      popBox:{},

    };
  },
  methods: {
    //新开大屏
    jumptoScreen(){
      let href='http://'+location.host+'/#/largeScreen'
      window.open(href);
    },
    getSideMenu(){
      let menuData=this.$router.options.routes[1].children,menuArr=[];
      menuData.forEach(v=>{
        if(v.meta.show){
          menuArr.push(v);
        }
      });
      this.menuArr=sessionStorage.getItem("account")=="account" ?  menuArr : menuArr.slice(0,-1);
    },
    handleClick (e) {
      var nowPath=this.$route.path,toPath=e.key;
      if(nowPath==toPath) return;
      this.$router.push(toPath);
    },

    //1修改密码  2退出登录
    handleUser(type){
      console.log(12,type);
      if(type==1){//1修改密码
        this.popBox={
          show:true,
          title:'修改密码',
          width:'400px',
          oldPwd:'',
          newPwd:''
        };
      }else{
        Logout({}).then(msg=>{
          if(msg.success){
            location.href = "/#/login"
            sessionStorage.clear();
          }
        });
      }
    },
    //修改密码 =》 确认
    handleOk(){
      if(!this.popBox.oldPwd || !this.popBox.newPwd || !this.popBox.check){
        this.$message.error("请输入必填项");
        return;
      }
      if(this.popBox.newPwd != this.popBox.check){
        this.$message.error("两次密码不一致");
        return;
      }
      if(this.popBox.newPwd == this.popBox.oldPwd) return this.$message.error("原密码不得与新密码一致");
      if(this.popBox.newPwd.length<6){
        this.$message.error("密码为6到12位");
        return;
      }
      let params={
        oldPwd:this.popBox.oldPwd,
        newPwd : this.popBox.newPwd,
      }
      ModifyPwd(params).then(msg=>{
        if(msg.success){
          this.$message.success("修改成功");
          this.popBox={};
        }
      })
    },



  },
  mounted(){
    this.getSideMenu();
  },
}

</script>
<style lang='less' src="../assets/css/homePage.less" scoped />
