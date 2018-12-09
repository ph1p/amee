<template>
  <div class="meeting">
    <h3>{{currentMeeting.name}}</h3>
    <p>Duration: {{duration(currentMeeting.baseDuration)}}</p>
    <span>{{duration(currentMeeting.timer) || ''}}</span>

    <ul>
      <li v-for="step in currentMeeting.steps" :key="step.name">{{step.name}}</li>
    </ul>

    <button @click="start">Start Meeting</button>
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
    }
  },
  methods: {
    ...mapActions(['startMeetingTimer']),
    start() {
      const { id } = this.currentMeeting;

      this.startMeetingTimer(id);
    }
  }
};
</script>

<style lang="scss" scoped>
.meeting {
  padding: 20px;
}
</style>
