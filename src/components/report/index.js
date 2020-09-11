import MyReport from "./index.vue";
const report = {
  install: function(Vue) {
    // Vue.component()是用来注册全局组件的
    Vue.component(MyReport.name, MyReport);
  }
};
export default report;