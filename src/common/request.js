import Vue from 'vue'
import sysConfig from './config.js'

const baseUrl = sysConfig.baseUrl;
const request = {};
const apiUrl = baseUrl + 'api/route';
const fileUrl = baseUrl +  'excel/download';
let header = {'Access-Control-Allow-Origin': true};
let me = this;


let client = function(model, action, params){
	return {
		head:{
			model,
			action,
			userId: uni.getStorageSync('HCuserId')
		},
		body:params
	}
};

request.apiRequest = (model, action, data) => {

    return uni.request({
        url: apiUrl,
        method: 'POST',
        data: client(model, action, data),
        dataType: 'application/json',
		header
    }).then(res => {
		let data = JSON.parse(res[1].data);
        if (data.code && data.code != '200') {
			uni.showToast({
　　　　　　　　　　　　title: data.msg,
　　　　　　　　　　　　icon: 'none'
			});
            throw data
        }
		return data;
    }).catch(parmas => {
　　　　　　switch (parmas.code) {
　　　　　　　　case '400':
　　　　　　　　　　uni.clearStorageSync();
　　　　　　　　　　break;
　　　　　　　　default:
　　　　　　　　　　uni.showToast({
　　　　　　　　　　　　title: parmas.msg ? params.msg : '请检查网络！',
　　　　　　　　　　　　icon: 'none',
                       duration: 2000,
                       position: 'bottom'
　　　　　　　　　　});
　　　　　　　　　　return Promise.reject();
　　　　　　　　　　break;
　　　　　　}
　　})

 };


 request.fileRequest = (model, action, data) => {

	// responseType = 'blob'

     return uni.request({
         url: fileUrl,
         method: 'POST',
         data: client(model, action, data),
         dataType: 'application/json'
     }).then(res => {
         if (res[1].data.status && res[1].data.code == '200') {
             return res[1]
         } else {
             throw res[1].data
         }
     }).catch(parmas => {
 　　　if (parmas.code == '401') {
           uni.clearStorageSync();
       } else {
           uni.showToast({
                       title: parmas.message,
                       icon: 'none'
                     });
           return Promise.reject();
       }
 　　})
  };

export default request
