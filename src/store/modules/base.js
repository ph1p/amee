const TIMER_STATUS = {
  STARTED: 'started',
  STOPPED: 'stopped',
  PAUSED: 'paused'
};

const state = {
  meetings: [
    {
      id: 1,
      name: 'Daily',
      baseDuration: 900,
      timerStatus: TIMER_STATUS.STOPPED,
      timer: null,
      description: ``
    },
    {
      id: 2,
      name: 'Refinement',
      baseDuration: 3600,
      timerStatus: TIMER_STATUS.STOPPED,
      timer: null,
      description: ``
    },
    {
      id: 3,
      name: 'Sprintplanning I',
      baseDuration: 3600,
      timerStatus: TIMER_STATUS.STOPPED,
      timer: null,
      description: ``
    },
    {
      id: 4,
      name: 'Sprintplanning II',
      baseDuration: 3600,
      timerStatus: TIMER_STATUS.STOPPED,
      timer: null,
      description: ``
    },
    {
      id: 5,
      name: 'Review',
      baseDuration: 3600,
      timerStatus: TIMER_STATUS.STOPPED,
      timer: null,
      description: ``
    },
    {
      id: 6,
      name: 'Retrospective',
      baseDuration: 3600,
      timerStatus: TIMER_STATUS.STOPPED,
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
  startMeetingTimer(state, meeting) {
    if (meeting.timerStatus !== TIMER_STATUS.STARTED) {
      if (meeting.timerStatus !== TIMER_STATUS.PAUSED) {
        meeting.timer = meeting.baseDuration;
      }
      meeting.timerStatus = TIMER_STATUS.STARTED;
    }
  },
  pauseMeetingTimer(state, meeting) {
    if (meeting.timerStatus !== TIMER_STATUS.PAUSED) {
      // only for triggering
      meeting.timerStatus = TIMER_STATUS.PAUSED;
    }
  },
  stopMeetingTimer(state, meeting) {
    if (meeting.timerStatus !== TIMER_STATUS.STOPPED) {
      meeting.timer = null;
      meeting.timerStatus = TIMER_STATUS.STOPPED;
    }
  },
  decrementMeetingTimer(state, meeting) {
    meeting.timer -= 1;
  },
  updateMeeting(state, { id, name, baseDuration }) {
    let meeting = state.meetings.find(m => m.id === id);

    if (meeting) {
      if (name) {
        meeting.name = name;
      }
      if (baseDuration) {
        meeting.baseDuration = baseDuration;
      }
    }
  }
};

const actions = {
  startMeetingTimer({ commit, getters }, id) {
    commit('startMeetingTimer', getters.meeting(id));
  },
  decrementMeetingTimer({ commit, getters }, id) {
    const meeting = getters.meeting(id);
    commit('decrementMeetingTimer', meeting);

    return meeting.timer;
  },
  stopMeetingTimer({ commit, getters }, id) {
    commit('stopMeetingTimer', getters.meeting(id));
  },
  updateMeeting({ commit }, data) {
    commit('updateMeeting', data);
  },
  pauseMeetingTimer({ commit, getters }, id) {
    commit('pauseMeetingTimer', getters.meeting(id));
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
