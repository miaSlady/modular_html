import {myAxios} from '@/assets/js/axios.js';

//修改密码
export function ModifyPwd(data) {//金融数据条数1  反欺诈成功识别次数2
    return myAxios('put', `/user/changePwd`, data)
}

//退出登陆
export function Logout(data) {//金融数据条数1  反欺诈成功识别次数2
    return myAxios('get', `/login/exit`, data)
}
