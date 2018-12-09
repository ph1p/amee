import Vue from 'vue';
import Vuex from 'vuex';
import base from './modules/base';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    base
  },
  state: {
    sprintDays: 20
  },
  mutations: {
    setSprint(state, days) {
      state.sprintDays = days;
    }
  },
  actions: {
    setSprint({ commit }, days) {
      commit('setSprint', days);
    }
  },
  getters: {
    sprintDays: state => state.sprintDays
  }
});
