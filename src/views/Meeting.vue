<template>
  <div class="meeting">
    <div class="header">
      <h3>{{currentMeeting.name}}</h3>
      <p>Duration: {{duration(currentMeeting.baseDuration)}}</p>
      <span v-if="isRunning">{{duration(currentMeeting.timer) || ''}}</span>
    </div>

    <div class="description">{{currentMeeting.description}}</div>

    <ul class="task">
      <li v-for="step in currentMeeting.steps" :key="step.name">{{step.name}}</li>
    </ul>

    <div class="footer">
      {{isRunning}}
      <button @click="isRunning ? pause() : start()">Start Meeting</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  inject: ['duration'],
  computed: {
    ...mapGetters(['meeting']),
    id() {
      return this.$route.params.id;
    },
    currentMeeting() {
      return this.meeting(this.id);
    },
    isRunning() {
      return this.currentMeeting.timer > 0;
    }
  },
  methods: {
    ...mapActions([
      'startMeetingTimer',
      'stopMeetingTimer',
      'pauseMeetingTimer'
    ]),
    start() {
      const { id } = this.currentMeeting;

      this.startMeetingTimer(id);
    },
    stop() {
      const { id } = this.currentMeeting;

      this.stopMeetingTimer(id);
    },
    pause() {
      const { id } = this.currentMeeting;

      this.pauseMeetingTimer(id);
    }
  }
};
</script>

<style lang="scss" scoped>
.meeting {
  height: 100vh;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  .header {
    padding: 20px;
  }
  .footer {
    padding: 20px;
    button {
      width: 100%;
    }
  }
}
</style>
