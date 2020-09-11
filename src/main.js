import Vue from 'vue';
import App from './App';

import request from './common/request.js';
import api from './common/index.js';
import url from './common/config.js';


Vue.config.productionTip = false;
Vue.prototype.$request = request;
Vue.prototype.$api = api;
Vue.prototype.$url = url;

App.mpType = 'app';

import uView from 'uview-ui';
Vue.use(uView);

// 此处为演示vuex使用，非uView的功能部分
import store from '@/store';

// 引入uView提供的对vuex的简写法文件
let vuexStore = require('@/store/$u.mixin.js');
Vue.mixin(vuexStore);

const app = new Vue({
  store,
  ...App
});
app.$mount();

import myjs from './common/my.js';
Vue.use(myjs);

import report from '@/components/report/index';
Vue.use(report);


import noBadTable from '@/components/no-bad-table/index';
Vue.use(noBadTable);

import sysConfig from './common/config'
Vue.use(sysConfig)
