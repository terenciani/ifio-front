import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user/main";
import apiHelper from "./modules/api-helpers";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    user,
    apiHelper,
  },
});
