const state = {
  login: false,
};

const getters = {
  islogin(state, getters, rootState, rootGetters) {
    return state.login;
  },
};

const mutations = {
  setLogin(state, payload) {
    state.login = payload;
  },
};

const actions = {
  setLogin({ dispatch, commit, getters, rootState, rootGetters }, payload) {
    commit('setLogin', payload);
    dispatch('users/setname', 'jiawei', {
      root: true,
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
