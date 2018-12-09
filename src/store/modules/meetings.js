const state = {
  meetings: [
    {
      id: 1,
      name: 'Daily',
      baseDuration: 900,
      timer: null,
      description: ``
    },
    {
      id: 2,
      name: 'Refinement',
      baseDuration: 3600,
      timer: null,
      description: ``
    },
    {
      id: 3,
      name: 'Sprintplanning I',
      baseDuration: 3600,
      timer: null,
      description: ``
    },
    {
      id: 4,
      name: 'Sprintplanning II',
      baseDuration: 3600,
      timer: null,
      description: ``
    },
    {
      id: 5,
      name: 'Review',
      baseDuration: 3600,
      timer: null,
      description: ``
    },
    {
      id: 6,
      name: 'Retrospective',
      baseDuration: 3600,
      timer: null,
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
};

const getters = {
  meetings: state => state.meetings,
  meeting: state => index => state.meetings[index]
};

const mutations = {
  startTimer(state, id) {
    const meeting = state.meetings.find(m => m.id === id);

    meeting.timer = meeting.baseDuration;
    // meeting.timer = 10;
  },
  stopTimer(state, id) {
    state.meetings.find(m => m.id === id).timer = null;
  },
  decrementTimer(state, id) {
    state.meetings.find(m => m.id === id).timer -= 1;
  }
};
const actions = {
  startTimer({ commit }, id) {
    commit('startTimer', id);
  },
  decrementTimer({ commit, state }, id) {
    commit('decrementTimer', id);

    return state.meetings.find(m => m.id === id).timer;
  },
  stopTimer({ commit }, id) {
    commit('stopTimer', id);
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
