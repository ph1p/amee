<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

const alarmSound = new Audio(require('@/assets/alarm-sound-1.mp3'));

const __intervalCache = {};

export default {
  data() {
    return {
      unsubscribe: null
    };
  },
  computed: {
    ...mapGetters(['meetings'])
  },
  mounted() {
    this.unsubscribe = this.$store.subscribeAction(
      ({ type, payload }, state) => {
        if (type === 'pauseMeetingTimer') {
          if (__intervalCache[payload]) {
            clearInterval(__intervalCache[payload]);
          }
        } else if (type === 'startMeetingTimer') {
          const meeting = state.base.meetings.find(m => m.id === payload);

          const intervalMethod = async () => {
            if ((await this.decrementMeetingTimer(payload)) <= 0) {
              // stop
              clearInterval(__intervalCache[payload]);
              this.stopMeetingTimer(payload);
              alarmSound.play();
            }
          };

          __intervalCache[payload] = setInterval(intervalMethod, 1000);

          if (meeting.timer) {
            intervalMethod();
          }
        }
      }
    );

    this.meetings.forEach(({ timer, id }) => {
      if (timer > 0 && !__intervalCache[id]) {
        __intervalCache[id] = setInterval(() => {
          this.decrementMeetingTimer(id);
        }, 1000);
      }
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  methods: {
    ...mapActions(['decrementMeetingTimer', 'stopMeetingTimer'])
  }
};
</script>

<style lang="scss">
body,
html,
#app,
.container {
  height: 100%;
}
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 0;
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
button {
  padding: 10px 15px;
  border-radius: 4px;
  background-color: rgb(0, 148, 185);
  border: 0;
  color: #fff;
}
</style>
