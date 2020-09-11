import noBadTable from "./table.vue";
const nobadtable = {
  install: function(Vue) {
    // Vue.component()是用来注册全局组件的
    Vue.component(noBadTable.name, noBadTable);
  }
};
export default nobadtable;
