<template>
  <div class="meeting">
    <AppHeader :title="`${currentMeeting.name} (${duration(currentMeeting.duration)})`" back/>

    <div class="content">
      <div
        class="countdown"
        v-if="duration(currentMeeting.timer)"
      >{{duration(currentMeeting.timer)}}</div>

      <div class="description">{{currentMeeting.description}}</div>

      <ul class="steps" v-if="currentMeeting.steps">
        <li v-for="step in currentMeeting.steps" :key="step.name">{{step.name}}</li>
      </ul>
    </div>

    <div class="footer">
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
  grid-template-rows: 50px 1fr auto;
  .content {
    padding: 20px;
    .countdown {
      padding: 25px;
      text-align: center;
      background-color: #efefef;
      border-radius: 11px;
      font-size: 24px;
    }
    .steps {
      list-style: none;
      padding: 0;
      margin: 20px -20px 0;
      border-top: 1px solid #efefef;
      li {
        padding: 15px 20px;
        border-bottom: 1px solid #efefef;
      }
    }
  }
  .footer {
    padding: 20px;
    button {
      width: 100%;
    }
  }
}
</style>
