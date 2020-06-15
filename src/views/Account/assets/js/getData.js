import {myAxios} from '@/assets/js/axios.js';

//账号列表
export function AccountList() {
    return myAxios('get', '/user/accountList', {})
}

//重置密码
export function AccountReset(data) {
    return myAxios('put', '/user/resetPwd', data)
}

//重置密码
export function DeleteAccount(data) {
    return myAxios('delete', '/user/deleteAccount', data)
}
