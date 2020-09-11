import request from './request.js'
// import { formatGetUri } from '@/common/util.js'

const api = {}
//
api.userService = function(action, params){
	return request.apiRequest('userService', action, params)
}

api.reportService = function(action, params){
	return request.apiRequest('reportService', action, params)
}
export default api


// me.$api.userService('login', {
// 	name: userName,
// 	pwd : pwd
// }).then(res => {
// 	let data = res.result;
// 	uni.setStorageSync('HCuserId', data.id);
// 	uni.setStorageSync('HCuserName', data.name);
// 	uni.setStorageSync('HCnickName', data.nickName);
// 	uni.setStorageSync('HCrememberLogin', rememberLogin);
// 	uni.setStorageSync('HCpwd', pwd);
// 	// 获得数据
// 	// me.showMyToast(me, '登录成功！', 'error', 'top');
// 	// 带参数
// 	uni.switchTab({
// 		url: '/pages/main/index'
// 	});
// })
