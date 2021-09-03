const state = () => ({
  helpers: {},
});

const mutations = {
  setHelpers(state, payload) {
    state.helpers = payload;
  },
};

const getters = {
  allHelpers: (state) => state.helpers,
  userHelpers: (state) => state.helpers.users,
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
};
