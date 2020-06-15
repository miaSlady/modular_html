<template>
<div>
  <div class="searchBox">
    <a-button class="btn" @click="handleAddCount" type="primary">新增计划表</a-button>
  </div>
  <div class="table">
    <a-table :columns="columns" row-key="rid" :dataSource="tableData" :pagination="false" :loading="loading">
      <a slot="action" slot-scope="text" href="javascript:;">
        <span class="marginRight" @click="handleUpdatePlan(text)">修改</span>
        <span class="marginRight" @click="handleDeletePlan(text)">删除</span>
      </a>  
    </a-table>
  </div>


  <a-modal okText="确认"  cancelText="取消" v-model="planBox.show" :title="planBox.name" @ok="handlePlanBox(planBox.type)" class="modal">
    <div class="marginBottom">
      <span class="red" style="margin-left:15px">*</span> 
      <span class="label">书名：</span>
      <a-input style="width: 200px;" placeholder="请输入" v-model.trim="popPlan.bookName"/>
    </div>
    <div class="marginBottom">
      <span class="red" style="margin-left:15px">*</span> 
      <span class="label">开始时间：</span>
      <a-date-picker :value="popPlan.time1" placeholder="请输入开始时间" @change="onChange1" />
    </div>
    <div class="marginBottom">
      <span class="red" style="margin-left:15px">*</span> 
      <span class="label">完成时间：</span>
      <a-date-picker :value="popPlan.time2" placeholder="请输入完成时间" @change="onChange2" />
    </div>
    <div class="marginBottom">
      <span class="red" style="margin-left:15px">*</span>  
      <span class="label">备注：</span>
      <div class="textareaBox">
        <a-textarea
          v-model="popPlan.remark"
          placeholder="请输入备注"
          :auto-size="{ minRows: 3, maxRows: 5 }"
        />
      </div>
    </div>
  </a-modal>
</div>
</template>

<script>
import moment from 'moment';
import 'moment/locale/zh-cn';
import {GetReadList,AddReadList,UpdateReadList,DeleteReadList} from '../assets/js/getData'
const columns=[
   { title: '书名', dataIndex: 'bookName' },
   { title: '开始时间', dataIndex: 'startTime' },
   { title: '完成时间', dataIndex: 'finishTime' },
   { title: '备注', dataIndex: 'remark' },
   { title: '操作',key: 'state',scopedSlots: { customRender: 'action' }, },
]
export default {
  data (){
    return {
      tableData:[],
      columns,
      moment,
      loading:false,

    
      planBox:{//读书计划框
        show:false,//是否显示
        name:'',//名字
        type:1,//1新增  2修改
      },
      popPlan:{},//新增、编辑读书计划框

    };
  },
  methods:{
    onChange1(date, dateString){
      this.popPlan.time1=date;
      this.popPlan.startTime=dateString;
    },
    onChange2(date, dateString){
      this.popPlan.time2=date;
      this.popPlan.finishTime=dateString;
    },
    //新增读书计划
    handleAddCount(){
      var now = moment().locale('zh-cn').format('YYYY-MM-DD');
      console.log('now',now);
      this.popPlan={
        time1:moment(),
        time2:moment(),
        startTime:now,
        finishTime:now
      }
      this.planBox={
        show:true,
        name:'新增读书计划',
        type:1
      };
    },
    //提交读书计划 type=>1新增  2修改
    handlePlanBox(type){
      let {bookName,remark,time1,time2} =this.popPlan 
      if(!bookName || !remark || !time1 || !time2) return this.$message.error("请填写必填项");
      if(type==1){
        AddReadList(this.popPlan).then(msg=>{
          if(msg.success){
            this.$message.success("新增成功")
            this.handleSearch();
          } 
        })
      }else{
        UpdateReadList(this.popPlan).then(msg=>{
          if(msg.success){
            this.$message.success("修改成功")
            this.handleSearch();
          } 
        })
      }
      this.planBox.show=false;
    },
    //获取读书计划列表
    handleSearch(){
      this.loading=true;
      GetReadList({}).then(msg=>{
        this.loading=false;
        if(msg.success){
          console.log('数据',msg.data);
          let data=msg.data;
          data.forEach(v=>{
            v.startTime=moment(v.startTime).locale('zh-cn').format('YYYY-MM-DD');
            v.finishTime=moment(v.finishTime).locale('zh-cn').format('YYYY-MM-DD');
          })
          this.tableData=data;
        }
      }).catch(err=>{
        this.loading=false;
      })
    },
    handleDeletePlan(obj){
      DeleteReadList({rid:obj.rid}).then(msg=>{
        if(msg.success){
          this.$message.success("删除成功")
          this.handleSearch();
        } 
      })
    }, 
    handleUpdatePlan(obj){
      this.popPlan={
        ...obj,
        time1:moment(obj.startTime).locale('zh-cn').format('YYYY-MM-DD'),
        time2:moment(obj.finishTime).locale('zh-cn').format('YYYY-MM-DD'),
        startTime:obj.startTime,
        finishTime:obj.finishTime,
      }
      this.planBox={
        show:true,
        name:'修改读书计划',
        type:2
      };
    },  
    handleResetPwd(obj){

    }, 
  },
  mounted(){
    this.handleSearch();
  },
}

</script>

<style lang='less' src="../assets/css/readPlanList.less" scoped/>