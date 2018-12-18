<template>
  <div class="home">
    <app-header>
      <div slot="title">
        <label for="sprint">
          {{sprintWeeks}} weeks
          <select
            name="sprint"
            :value="sprintWeeks"
            @change="setSprint($event.target.value * 1)"
          >
            <option value="1">1 week</option>
            <option value="2">2 weeks</option>
            <option value="3">3 weeks</option>
            <option value="4">4 weeks</option>
          </select>
        </label>
      </div>
    </app-header>

    <div class="meeting-list">
      <div class="meeting" :key="meeting.name" v-for="meeting in meetings">
        <eva-icon
          v-if="isRunning(meeting)"
          @click="pauseMeetingTimer(meeting.id)"
          name="pause-circle-outline"
          animation="pulse"
          fill="#fda9a9"
        ></eva-icon>
        <eva-icon
          v-else
          name="play-circle-outline"
          animation="pulse"
          fill="limegreen"
          @click="startMeetingTimer(meeting.id)"
        ></eva-icon>
        <router-link tag="div" class="title" :to="`/meeting/${meeting.id}`">
          {{meeting.name}}
          <p>{{meetingDuration(meeting)}}</p>
        </router-link>
        <div class="remaining-time" v-if="duration(meeting.timer)">{{duration(meeting.timer)}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { TIMER_STATUS } from '@/constants';
import AppHeader from '@/components/app-header';

export default {
  inject: ['duration'],
  name: 'home',
  components: {
    AppHeader
  },
  computed: {
    ...mapGetters(['meetings', 'sprintWeeks'])
  },
  methods: {
    ...mapActions([
      'setSprint',
      'updateMeeting',
      'startMeetingTimer',
      'pauseMeetingTimer'
    ]),
    meetingDuration(meeting) {
      return this.duration(
        !meeting.sprintDuration
          ? meeting.duration
          : meeting.sprintDuration[this.sprintWeeks]
      );
    },
    isRunning(meeting) {
      return meeting.timerStatus === TIMER_STATUS.STARTED;
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  display: grid;
  grid-template-rows: 50px 1fr;
  label {
    position: relative;
    select {
      outline: none;
      left: 0;
      width: auto;
      opacity: 0;
      z-index: 1;
      height: 100%;
      width: 100%;
      position: absolute;
    }
  }
  .meeting-list {
    border-top: 1px solid #ddd;
    .meeting {
      display: grid;
      grid-template-columns: 40px 1fr 1fr;
      align-items: center;
      padding: 20px;
      border-bottom: 1px solid #ddd;
      .title {
        font-weight: normal;
        margin: 0;
        p {
          margin: 0;
          font-size: 12px;
          color: #999;
        }
      }
      .remaining-time {
        font-size: 12px;
        display: inline-block;
        text-align: right;
        color: #999;
      }
    }
  }
}
</style>
