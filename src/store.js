import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sprintDays: 20,
    meetings: [
      {
        name: 'Daily',
        baseDuration: 900,
        description: ``
      },
      {
        name: 'Refinement',
        baseDuration: 3600,
        description: ``
      },
      {
        name: 'Sprintplanning I',
        baseDuration: 3600,
        description: ``
      },
      {
        name: 'Sprintplanning II',
        baseDuration: 3600,
        description: ``
      },
      {
        name: 'Review',
        baseDuration: 3600,
        description: ``
      },
      {
        name: 'Retrospective',
        baseDuration: 3600,
        description: ``,
        tasks: [{}]
      }
    ]
  },
  getters: {
    meetings: state => state.meetings,
    sprintDays: state => state.sprintDays,
    meeting: state => index => state.meetings[index]
  },
  mutations: {},
  actions: {}
});
