import Vue from "vue";
import Vuetify from "vuetify";
import VDataFormItem from "./VDataFormItem.vue";

Vue.use(Vuetify);

const Components = {
  VDataFormItem
};

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name]);
});

export default Components;
