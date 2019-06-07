import Vue from "vue";
import Vuetify from "vuetify";
import VDataFormItem from "./VDataFormItem.vue";
import VDataForm from "./VDataForm.vue";

Vue.use(Vuetify);

const Components = {
  VDataFormItem,
  VDataForm
};

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name]);
});

export default Components;
