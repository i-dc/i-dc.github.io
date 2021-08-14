import Vue from "vue";
import copy from "copy-to-clipboard";
import "@/service_worker";

import App from "@/App";
import store from "@/store";
import router from "@/routes";
import Notifications from "vue-notification";
import vuetify from "@/plugins/vuetify";
import {translate} from "@/utils/general";

Vue.use(Notifications);
Vue.config.productionTip = process.env.NODE_ENV === "production";

/**
 * @param {string} text
 * @param {string} title
 */
Vue.prototype.$copy = function (text, title = "copied") {
  copy(text);

  this.$notify({
    group: "secondary",
    title: translate(title),
    type: "text"
  });
};

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App),
  methods: {}
}).$mount("#app");
