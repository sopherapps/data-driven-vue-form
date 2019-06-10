import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/src/stylus/app.styl";
import VDataForm from "./VDataForm.vue";

Vue.use(Vuetify, {
  iconfont: "md"
});

Vue.component("v-data-form", VDataForm);
export default VDataForm;
