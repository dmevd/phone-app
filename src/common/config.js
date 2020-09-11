import Vue from 'vue'

let baseUrl = "http://localhost:9090/akkj/";
baseUrl = "http://114.67.101.174:8080/"
switch (process.env.NODE_ENV) {
    case 'dev':
        // baseUrl = "http://localhost:9090/akkj/"  //开发环境url
		    baseUrl = "http://114.67.101.174:8080/"   //生产环境url
        break
    case 'serve':
        baseUrl = "http://114.67.101.174:9090/"   //生产环境url
        break
}

const sysConfig = {
    baseUrl,
    pageSize: 20
}

Vue.prototype.$sysConfig = sysConfig;
export default sysConfig;
