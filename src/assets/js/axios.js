import axios from 'axios'
import {BASEURL} from './config.js'
import {message} from 'ant-design-vue'
// axios.defaults.withCredentials = true;
// axios.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded;charset=utf-8";
axios.interceptors.request.use(
  config => {
  // 判断是否存在token，如果存在的话，则每个http header都加上token
    let token = sessionStorage.getItem('token')
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  });

export let myAxios = (method, url, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: BASEURL + url,
      data: params,
    })
      .then(function (response) {
        if (response.data.code == '401') {
          sessionStorage.clear();
          location.href = "/#/login"
          return;
        }
        if(response.data.success){
          resolve(response.data);
        }else{
          message.open({
            content: response.data.msg,
            type: 'error'
          })
          resolve(response.data)
        }
      })
      .catch(function (err) {
          message.open({
            content: '获取信息失败',
            type: 'error'
          })
          reject(err);
      });
  })
}