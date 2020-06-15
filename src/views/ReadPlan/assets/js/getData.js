import {myAxios} from '@/assets/js/axios.js';

//获取阅读列表
export function GetReadList(data) {
  return myAxios('get', '/readList/getList', data)
}
//新增
export function AddReadList(data) {
  return myAxios('post', '/readList/addList', data)
}
//修改
export function UpdateReadList(data) {
  return myAxios('put', '/readList/updateList', data)
}
//删除
export function DeleteReadList(data) {
  return myAxios('delete', '/readList/deleteList', data)
}
