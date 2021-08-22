const state = {
  name: false,
};

const getters = {
  getname(state, getters, rootState, rootGetters) {
    return state.name;
  },
};

const mutations = {
  setname(state, payload) {
    state.name = payload;
  },
};

const actions = {
  setname({ dispatch, commit, getters, rootState, rootGetters }, payload) {
    commit('setname', payload);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
