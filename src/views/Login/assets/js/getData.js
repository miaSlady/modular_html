import {myAxios} from '@/assets/js/axios.js';

//注册
export function Regist(data) {
  return myAxios('POST', '/login/signUp', data)
}

//登录
export function Login(data) {
  return myAxios('post', '/login/login',data)
}

//获取验证码
export function GetCode(data) {
  return myAxios('GET', '/login/code', data)
}
