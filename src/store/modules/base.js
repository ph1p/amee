import { TIMER_STATUS } from '@/constants';

const state = {
  sprintWeeks: 1,
  meetings: [
    {
      id: 1,
      name: 'Daily',
      duration: 5,
      timerStatus: TIMER_STATUS.STOPPED,
      timer: null,
      description: ``
    },
    {
      id: 2,
      name: 'Refinement',
      duration: 3600,
      timerStatus: TIMER_STATUS.STOPPED,
      timer: null,
      description: ``
    },
    {
      id: 3,
      name: 'Sprintplanning I',
      duration: 3600,
      sprintDuration: {
        1: 7200,
        2: 14400,
        3: 21600,
        4: 28800
      },
      timerStatus: TIMER_STATUS.STOPPED,
      timer: null,
      description: ``
    },
    {
      id: 4,
      name: 'Sprintplanning II',
      duration: 3600,
      sprintDuration: {
        1: 7200,
        2: 14400,
        3: 21600,
        4: 28800
      },
      timerStatus: TIMER_STATUS.STOPPED,
      timer: null,
      description: ``
    },
    {
      id: 5,
      name: 'Review',
      duration: 3600,
      timerStatus: TIMER_STATUS.STOPPED,
      timer: null,
      sprintDuration: {
        1: 3600,
        2: 7200,
        3: 10800,
        4: 14400
      },
      description: ``
    },
    {
      id: 6,
      name: 'Retrospective',
      duration: 3600,
      timerStatus: TIMER_STATUS.STOPPED,
      timer: null,
      description: ``,
      sprintDuration: {
        1: 2700,
        2: 5400,
        3: 8100,
        4: 10800
      },
      steps: [
        {
          name: 'Set the Stage',
          duration: 10,
          description: ``
        },
        {
          name: 'Gather data',
          duration: 5,
          description: ``
        },
        {
          name: 'Generate insights',
          duration: 3600,
          description: ``
        },
        {
          name: 'Decide what to do',
          duration: 3600,
          description: ``
        },
        {
          name: 'Close the Retrospective',
          duration: 3600,
          description: ``
        }
      ]
    }
  ]
};

const getters = {
  sprintWeeks: state => state.sprintWeeks,
  meetings: state =>
    state.meetings.map(meeting => {
      meeting.duration = !meeting.sprintDuration
        ? meeting.duration
        : meeting.sprintDuration[state.sprintWeeks];

      if (meeting.steps) {
        meeting.steps = meeting.steps.reduce((b, c, i) => {
          const newSteps = b.concat(c);

          c.realDuration = c.duration;
          if (newSteps[i - 1]) {
            c.realDuration += newSteps[i - 1].duration;
          }

          return newSteps;
        }, []);
      }

      return meeting;
    }),
  meeting: (state, getters) => id =>
    getters.meetings.find(m => m.id === parseInt(id))
};

const mutations = {
  setSprint(state, days) {
    state.sprintWeeks = days;
  },
  startMeetingTimer(state, meeting) {
    if (meeting.timerStatus !== TIMER_STATUS.STARTED) {
      if (meeting.timerStatus !== TIMER_STATUS.PAUSED) {
        meeting.timer = meeting.duration;
      }
      meeting.timerStatus = TIMER_STATUS.STARTED;
    }
  },
  pauseMeetingTimer(state, meeting) {
    if (meeting.timerStatus !== TIMER_STATUS.PAUSED) {
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
  updateMeeting(state, { id, name, duration }) {
    let meeting = state.meetings.find(m => m.id === id);

    if (meeting) {
      if (name) {
        meeting.name = name;
      }
      if (duration) {
        meeting.duration = duration;
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
  },
  setSprint({ commit }, days) {
    commit('setSprint', days);
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
