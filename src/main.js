import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/css/index.less'

import Antd from 'ant-design-vue'
Vue.use(Antd)
import 'ant-design-vue/dist/antd.css'
import { message } from 'ant-design-vue'
Vue.prototype.$message = message

import moment from 'moment'
import 'moment/locale/zh-cn'; 
moment.locale('zh-cn');

import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts 

//el 只能输入数字
Vue.directive('enterNumber', {
  inserted: function (el) {
    el.addEventListener("keypress",function(e){
      e = e || window.event;
      let charcode = typeof e.charCode === 'number' ? e.charCode : e.keyCode;
      let re = /\d/;
      if(!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey){
        if(e.preventDefault){
          e.preventDefault();
        }else{
          e.returnValue = false;
        }
      }
    });
  }
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
