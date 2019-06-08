import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";

Vue.config.productionTip = false;
Vue.prototype.$Interpreter = window.Interpreter;

new Vue({
  render: h => h(App)
}).$mount("#app");
