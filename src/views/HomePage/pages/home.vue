<template>
<div class="container"> 
  <ul class="cardList">
    <li>
      <p class="p1">{{num1}}</p>
      <p>入驻金融企业数</p>
    </li>
    <li>
      <p class="p1">{{num2}}</p>
      <p>金融风险防范次数</p>
    </li>
    <li>
      <p class="p1">{{num3}}</p>
      <p>金融数据条数</p>
    </li>
    <li>
      <p class="p1">{{num4}}</p>
      <p>反欺诈成功识别次数</p>
    </li>
  </ul>
  <ul class="mapList">
    <li>
      <p class="title">各金融机构风险防范次数分析</p>
      <ul class="typeList">
        <li v-for="(v,i) in typeList1" :key="i">
          <i :style="{background:v.color}"></i>{{v.name}}
        </li>
      </ul>
      <div id="myChart1" class="map1"></div>
    </li>
    <!-- <li>
      <p class="title">近7日借款明细查询次数分析</p>
      <div id="myChart2" class="map2"></div>
    </li>
    <li>
      <p class="title">近7日借款被拒明细查询次数分析</p>
      <div id="myChart3" class="map2"></div>
    </li> -->
    <li>
      <p class="title">查询类型占比分析</p>
      <ul class="typeList typeList2">
        <li v-for="(v,i) in typeList2" :key="i">
          <i :style="{background:v.color}"></i>{{v.name}}
        </li>
      </ul>
      <div id="myChart4" class="map3"></div>
    </li>
    <!-- <li>
      <p class="title">近7日逾期明细查询次数分析</p>
      <div id="myChart5" class="map2"></div>
    </li>
    <li>
      <p class="title">近7日黑名单明细查询次数分析</p>
      <div id="myChart6" class="map2"></div>
    </li> -->
  </ul>
</div>
</template>

<script>
import {GetNum1,GetNum2,GetNum3,FinancialAnalysis,TypeAnalysis,CountAnalysis} from '../assets/js/getData'
export default {
  data (){
    return {
      num1:0,
      num2:0,
      num3:0,
      num4:0,
      color:["#f79992","#76d0a3","#7ec2f3","#fa90ba","#faaf76","#b3acf2","#ffdd76","#76cdd3","#d9d9d9","#7EC2F3","#f04134","#00a854","#108ee9","#f5317f","#f56a00","#7265e6","#ffbf00","#00a2ae","#108EE9","#404040"],
      color2:['#FC3357','#6350DC','#FE8102','#5B8FF9'],
      color3:['#FED2DE','#E3DEFB','#FEE9D4','#E2EBFF'],
      color4:['#EB7E65','#73A0FA','#73DEB3','#F7C739'],
      typeList1:[],
      typeList2:[
        {
          name:'借款明细',
          color:'#EB7E65'
        },
        {
          name:'借款被拒明细',
          color:'#73A0FA'
        },
        {
          name:'逾期明细',
          color:'#73DEB3'
        },
        {
          name:'黑名单',
          color:'#F7C739'
        },
      ],
    };
  },
  methods:{
    //环状图
    chart1(data,name,id,color){
			// 基于准备好的dom，初始化echarts实例
			let myChart= this.$echarts.init(document.getElementById(id));
			let option = {           
          color:color,
          grid:{
            top:20,
            bottom:70
          },
          tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          series : [
              {
                  name: name,
                  type: 'pie',
                  radius: ['50%', '70%'],
                  data:data,
              }
          ]
      };
			// 绘制图表
			myChart.setOption(option);
    },
    //折线图
    chart2(dataX,dataY,name,id,color2,color3){
      	// 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(id));
      // let dataX=['10-01','10-01','10-01','10-01','10-01','10-01','10-01','10-01','10-01','10-01','10-01','10-01','10-01','10-01','10-01'];
      // let dataY=[100,22,44,66,88,3,44,198,130,90,79,48,166,133,88];
			let option = {
          grid:{
            top:20,
            bottom:50,
            right:20
          },
          tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
          },
          xAxis: {
              type: 'category',
              nameRotate:45,
              axisLine:{    
                lineStyle:{
                  color:'#A0A4AA'
                },//轴线颜色
              },
              axisLabel:{
                color:'#A0A4AA',//y轴名字颜色
                textStyle:{
                  fontSize:8,//adjust:30
                },
                // rotate:30,
                interval:0,//强制显示所有标签
              },

              data:dataX,
          },
          yAxis: {
              type: 'value',
              axisTick:{
                  show:false
              },//不显示轴刻度
              axisLine:{
                show:false,//不显示轴
              },
              splitLine: {
                  show: false
              },
              axisLabel:{
                color:'#A0A4AA',
                textStyle:{
                  fontSize:12,//adjust:30
                },
              },
          },
          series: [{
              name:name,
              type:'line',
              areaStyle: {
                  normal: {
                      color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                          offset: 0,
                          color: color3
                      }, {
                          offset: 1,
                          color: color3
                      }])
                  }
              },
              data: dataY,
              color:color2
          }]
      };
			// 绘制图表
			myChart.setOption(option);
    },
    //初始化数据
    initData(){
      //入驻金融企业数
      GetNum1({}).then(msg=>{
        if(msg.success){
          this.num1=msg.data;
        }
      })
      //金融风险防范次数
      GetNum2({}).then(msg=>{
        if(msg.success){
          this.num2=msg.data;
        }
      })
      //金融数据条数1/反欺诈成功识别次数2
      GetNum3(1).then(msg=>{
        if(msg.success){
          this.num3=msg.data;
        }
      })
      GetNum3(2).then(msg=>{
        if(msg.success){
          this.num4=msg.data;
        }
      })
      //各金融机构风险防范次数分析
      FinancialAnalysis({}).then(msg=>{
        if(msg.success){
          let data=msg.data,color=this.color;
          data.forEach((v,i)=>{
            v.color=color[i];
            v.name=v.key;
          })
          this.typeList1=msg.data;
          this.chart1(data,'各金融机构风险防范次数分析',"myChart1",color); 
        }
      })
      //查询类型占比分析
      TypeAnalysis({}).then(msg=>{
        if(msg.success){
          let data=msg.data,color=this.color4;
          data.forEach((v,i)=>{
            v.color=color[i];
            v.name=v.key;
          })
          this.typeList2=msg.data;
          this.chart1(data,'查询类型占比分析',"myChart4",color); 
        }
      })
      return;
      //近15日次数分析
      // 借款明细	55
      // 借款被拒	7
      // 逾期明细	44
      // 黑名单 		11
      CountAnalysis(55).then(msg=>{
        if(msg.success){
          let data=msg.data,dataX=[],dataY=[];
          data.forEach((v,i)=>{
            let date=v.key.split("-");
            date.shift();
            date=date.join("-");
            dataX.push(date);
            dataY.push(v.value);
          })
          this.chart2(dataX,dataY,'近15日借款明细查询次数分析','myChart2',this.color2[0],this.color3[0]);
        }
      })
      CountAnalysis(7).then(msg=>{
        if(msg.success){
          let data=msg.data,dataX=[],dataY=[];
          data.forEach((v,i)=>{
            let date=v.key.split("-");
            date.shift();
            date=date.join("-");
            dataX.push(date);
            dataY.push(v.value);
          })
          this.chart2(dataX,dataY,'近15日借款被拒明细查询次数分析','myChart3',this.color2[1],this.color3[1]);
        }
      })
      CountAnalysis(44).then(msg=>{
        if(msg.success){
          let data=msg.data,dataX=[],dataY=[];
          data.forEach((v,i)=>{
            let date=v.key.split("-");
            date.shift();
            date=date.join("-");
            dataX.push(date);
            dataY.push(v.value);
          })
          this.chart2(dataX,dataY,'近15日逾期明细查询次数分析','myChart5',this.color2[2],this.color3[2]);
        }
      })
      CountAnalysis(11).then(msg=>{
        if(msg.success){
          let data=msg.data,dataX=[],dataY=[];
          data.forEach((v,i)=>{
            let date=v.key.split("-");
            date.shift();
            date=date.join("-");
            dataX.push(date);
            dataY.push(v.value);
          })
          this.chart2(dataX,dataY,'近15日逾期明细查询次数分析','myChart6',this.color2[3],this.color3[3]);
        }
      })
    },
  },
  mounted(){
    this.initData();
  },
}

</script>
<style lang='less' src="../assets/css/home.less" scoped>
</style>