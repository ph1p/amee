import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sprintDays: 20,
    meetings: [
      {
        id: 1,
        name: 'Daily',
        baseDuration: 900,
        timer: -1,
        description: ``
      },
      {
        id: 2,
        name: 'Refinement',
        baseDuration: 3600,
        timer: -1,
        description: ``
      },
      {
        id: 3,
        name: 'Sprintplanning I',
        baseDuration: 3600,
        timer: -1,
        description: ``
      },
      {
        id: 4,
        name: 'Sprintplanning II',
        baseDuration: 3600,
        timer: -1,
        description: ``
      },
      {
        id: 5,
        name: 'Review',
        baseDuration: 3600,
        timer: -1,
        description: ``
      },
      {
        id: 6,
        name: 'Retrospective',
        baseDuration: 3600,
        timer: -1,
        description: ``,
        steps: [
          {
            name: 'Set the Stage',
            baseDuration: 3600,
            description: ``
          },
          {
            name: 'Gather data',
            baseDuration: 3600,
            description: ``
          },
          {
            name: 'Generate insights',
            baseDuration: 3600,
            description: ``
          },
          {
            name: 'Decide what to do',
            baseDuration: 3600,
            description: ``
          },
          {
            name: 'Close the Retrospective',
            baseDuration: 3600,
            description: ``
          }
        ]
      }
    ]
  },
  getters: {
    meetings: state => state.meetings,
    sprintDays: state => state.sprintDays,
    meeting: state => index => state.meetings[index]
  },
  mutations: {
    startTimer(state, id) {
      const meeting = state.meetings.find(m => m.id === id);

      meeting.timer = meeting.baseDuration;
    },
    stopTimer(state, id) {
      state.meetings.find(m => m.id === id).timer = -1;
    },
    decrementTimer(state, id) {
      state.meetings.find(m => m.id === id).timer -= 1;
    }
  },
  actions: {
    startTimer({ commit }, id) {
      commit('startTimer', id);
    },
    decrementTimer({ commit }, id) {
      commit('decrementTimer', id);
    },
    stopTimer({ commit }, id) {
      commit('stopTimer', id);
    }
  }
});
