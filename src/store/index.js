import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        language_list: process.env.VUE_APP_LANG_LIST ? process.env.VUE_APP_LANG_LIST.split(",") : ["ru"],
        language: localStorage.getItem("language") ?? process.env.VUE_APP_LANG,
    },
    mutations: {
        language_set(state, language) {
            if (state["language_list"].includes(language)) {
                return;
            }

            localStorage.setItem("language", language);
            state["language"] = language;
        }
    }
});
