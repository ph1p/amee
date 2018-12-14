<template>
  <div class="meeting">
    <AppHeader :title="currentMeeting.name" back/>
    <p>Duration: {{duration(currentMeeting.baseDuration)}}</p>
    <span>{{duration(currentMeeting.timer) || ''}}</span>

    <div class="description">{{currentMeeting.description}}</div>

    <ul class="task">
      <li v-for="step in currentMeeting.steps" :key="step.name">{{step.name}}</li>
    </ul>

    <div class="footer">
      {{isRunning}}
      <button @click="start" v-if="!isRunning">Start Meeting</button>
      <button @click="pause" v-else>Pause Meeting</button>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/app-header';
import { mapGetters, mapActions } from 'vuex';

export default {
  inject: ['duration'],
  components: {
    AppHeader
  },
  computed: {
    ...mapGetters(['meeting']),
    id() {
      return this.$route.params.id;
    },
    currentMeeting() {
      return this.meeting(this.id);
    },
    isRunning() {
      return this.currentMeeting.timerStatus === 'started';
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
  grid-template-rows: 50px 1fr 1fr;
  .header {
    padding: 0 20px;
  }
  .footer {
    padding: 20px;
    button {
      width: 100%;
    }
  }
}
</style>
