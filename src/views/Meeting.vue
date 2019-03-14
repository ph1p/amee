<template>
  <div class="container meeting">
    <app-header back>
      <div slot="title">
        {{ currentMeeting.name }} ({{ duration(currentMeeting.duration) }})
      </div>
    </app-header>

    <div class="content">
      <div class="countdown" v-if="duration(currentMeeting.timer)">
        {{ duration(currentMeeting.timer) }}
      </div>

      <div class="description">{{ currentMeeting.description }}</div>

      <ul class="steps" v-if="steps">
        <li
          v-for="step in steps"
          :key="step.name"
          :class="{ passed: step.passed }"
          @click="expandStep(step)"
        >
          <div>{{ step.name }}</div>
          <p>{{ duration(step.duration) }}</p>
          <div class="description" v-if="expandedStep === step.name">
            <vue-markdown>{{ step.description }}</vue-markdown>
          </div>
        </li>
      </ul>
    </div>

    <div class="footer">
      <button @click="start" v-if="!isRunning">Start Meeting</button>
      <button @click="pause" v-else>Pause Meeting</button>
      <button @click="stop">Stop Meeting</button>
    </div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown';
import AppHeader from '@/components/app-header';
import { mapGetters, mapActions } from 'vuex';

export default {
  inject: ['duration'],
  components: {
    AppHeader,
    VueMarkdown
  },
  data() {
    return {
      expandedStep: -1
    };
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
    },
    steps() {
      return (
        this.currentMeeting.steps &&
        this.currentMeeting.steps.map(step => {
          return {
            ...step,
            passed:
              this.currentMeeting.timer &&
              this.currentMeeting.timer <=
                this.currentMeeting.duration - step.realDuration
          };
        })
      );
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
    },
    expandStep({ name }) {
      this.expandedStep = name !== this.expandedStep ? name : -1;
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
        &.passed {
          opacity: 0.5;
          div {
            text-decoration: line-through;
          }
        }
        p {
          font-size: 12px;
          color: #999;
          margin: 0;
        }
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
