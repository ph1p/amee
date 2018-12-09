import Vue from 'vue';
import Vuex from 'vuex';
import meetings from './modules/meetings';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    meetings
  },
  state: {
    sprintDays: 20
  },
  getters: {
    sprintDays: state => state.sprintDays
  }
});
