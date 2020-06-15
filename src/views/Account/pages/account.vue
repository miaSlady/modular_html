<template>
<div>
  <div class="table">
    <a-table :columns="columns" :dataSource="tableData" :pagination="false" :loading="loading">
      <a slot="action" slot-scope="text" href="javascript:;">
        <span class="marginRight" @click="handleReset(text.id)">重置密码</span>
        <span class="marginRight" @click="handleDelete(text.id)">删除</span>
      </a>
    </a-table>
  </div>

</div>
</template>

<script>
import moment from 'moment';
import 'moment/locale/zh-cn';
import {AccountList,AccountReset,DeleteAccount} from '../assets/js/getData'
const columns = [
  { title: '账号', dataIndex: 'account' },
  { title: '姓名',  dataIndex: 'name' },
  { title: '注册时间',  dataIndex: 'createTime' },
  {
    title: '操作',
    key: 'state',
    width: 180,
    scopedSlots: { customRender: 'action' },
  },
];
export default {
  data (){
    return {
      search:{},
      columns,
      tableData:[],

      pagenation:{
        total:110,
        currentPage:1,
        pageSize:10
      },
      loading:false,
      pageSizeOptions: ['10', '20', '50'],

      accountCount:0,//最多几个子账号
      accountNum:0,
      popBox:{},//新增账号/修改昵称弹框
    };
  },
  methods:{
    //搜索账号
    handleSearch(){
      this.loading=true;
      AccountList().then(msg=>{
        this.loading=false;
        if(msg.success){
          moment().locale('zh-cn').format('YYYY-MM-DD')
          let data=msg.data;
          data.forEach(v=>{
            v.createTime=moment(v.createTime).locale('zh-cn').format('YYYY-MM-DD hh:mm:ss')
          })
          this.tableData=data;
        }
      }).catch(err=>this.loading=false)
    },
    //重置密码
    handleReset(id){
      AccountReset({id}).then(msg=>{
        if(msg.success){
          this.$message.success("重置密码成功")
        }else{
          this.$message.error(msg.msg)
        }
      })
    },  
    //删除账号
    handleDelete(id){
      DeleteAccount({id}).then(msg=>{
        if(msg.success){
          this.$message.success("删除账号成功")
          this.handleSearch();
        }else{
          this.$message.error(msg.msg)
        }
      })
    },  


  },
  mounted(){
    this.handleSearch();
  },
}

</script>
<style lang='less' src="../assets/css/account.less" scoped>
</style>