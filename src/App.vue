<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

const alarmSound = new Audio(require('@/assets/alarm-sound-1.mp3'));

export default {
  data() {
    return {
      unsubscribe: null,
      intervalCache: {}
    };
  },
  computed: {
    ...mapGetters(['meetings'])
  },
  mounted() {
    this.unsubscribe = this.$store.subscribeAction(({ type, payload }) => {
      if (type === 'pauseMeetingTimer') {
        if (this.intervalCache[payload]) {
          clearInterval(this.intervalCache[payload]);
        }
      } else if (type === 'startMeetingTimer') {
        // check if interval already exists

        this.intervalCache[payload] = setInterval(async () => {
          // check timer value
          if ((await this.decrementMeetingTimer(payload)) <= 0) {
            // stop
            clearInterval(this.intervalCache[payload]);
            this.stopMeetingTimer(payload);
            alarmSound.play();
          }
        }, 1000);
      }
    });

    this.meetings.forEach(({ timer, id }) => {
      if (timer > 0 && !this.intervalCache[id]) {
        this.intervalCache[id] = setInterval(() => {
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
