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
  meeting: (state, getters) => id =>
    getters.meetings.find(m => m.id === parseInt(id))
};

const mutations = {
  startTimer(state, meeting) {
    meeting.timer = meeting.baseDuration;
  },
  stopTimer(state, meeting) {
    meeting.timer = null;
  },
  decrementTimer(state, meeting) {
    meeting.timer -= 1;
  }
};

const actions = {
  startTimer({ commit, getters }, id) {
    commit('startTimer', getters.meeting(id));
  },
  decrementTimer({ commit, getters }, id) {
    const meeting = getters.meeting(id);
    commit('decrementTimer', meeting);

    return meeting.timer;
  },
  stopTimer({ commit, getters }, id) {
    commit('stopTimer', getters.meeting(id));
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
