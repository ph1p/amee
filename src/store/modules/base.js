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
          name: 'Einführung',
          percentage: 0.1,
          duration: -1,
          description: `### Begrüße alle Anwesenden beim Retrospektiv-Meeting und gib die Spielregeln bekannt:

* Seid positiv, bemüht euch um kontinuierliche Verbesserung und teilt alles mit, was dem Team helfen könnte.
* Verzichtet auf persönliche Vorwürfe und nehmt eurerseits das Gesagte nicht persönlich.
* Hört jedem Teammitglied aufmerksam zu und denkt daran, dass jede Meinung ihre Berechtigung hat (auch wenn ihr sie nicht teilt).
* Lege fest, auf welchen Zeitraum sich die Diskussion beziehen soll: auf den letzten Sprint? Das letzte Quartal? Den gesamten Zeitraum seit dem Projektstart? Der zeitliche Rahmen muss klar definiert sein.
* Ermutige dein Team, Verbesserungsvorschläge zu unterbreiten und nicht andere Teammitglieder anzuklagen.`
        },
        {
          name: 'Was ist gut gelaufen?',
          percentage: 0.4,
          duration: -1,
          description: `Geht die Übung von der positiven Seite an. Bitte die Teammitglieder, auf grüne Haftnotizzettel zu schreiben, was ihrer Meinung nach gut gelaufen ist (ein Vorschlag pro Zettel). Die Teilnehmer sollen die Zettel dann auf das Whiteboard kleben. Bitte den Übungsleiter, ähnliche oder gleiche Vorschläge zusammenzufassen.

Diskutiert eure Vorschläge kurz im Team.`
        },
        {
          name: 'Was muss verbessert werden?',
          percentage: 0.4,
          duration: -1,
          description: `Geht wieder wie oben beschrieben vor, allerdings mit pinken oder roten Haftnotizzetteln. Erinnere dein Team daran, dass es um Handlungen und deren Ergebnisse geht und nicht um einzelne Personen.`
        },
        {
          name: 'Nächste Schritte',
          percentage: 0.1,
          duration: -1,
          description: `Nachdem ihr nun wisst, was weniger gut gelaufen ist: Mit welchen konkreten Maßnahmen kann das Team diese Punkte verbessern? Bitte die Teammitglieder, ihre Ideen dazu auf blaue Haftnotizzettel zu schreiben und auf das Whiteboard zu kleben. Die Zettel werden gruppiert und dann im Team besprochen. Vereinbart die umzusetzenden Maßnahmen, weist Zuständige zu und legt einen Termin für die Umsetzung fest.

Danke allen für ihre Beiträge und ihre Ehrlichkeit. Lies kurz die Liste der Aufgaben für die Nachbereitung mit den Zuständigen und Fälligkeitsdaten vor.`
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

          c.duration = Math.round(c.percentage * meeting.duration);
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
