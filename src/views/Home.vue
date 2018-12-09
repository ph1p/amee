<template>
  <div class="home">
    <select name="sprint" @change="setSprint($event.target.value * 1)">
      <option value="5">1 week</option>
      <option value="10">2 weeks</option>
      <option value="15">3 weeks</option>
      <option value="20">4 weeks</option>
    </select>

    <h1>Sprint {{sprintDays}} days</h1>
    <div class="meeting-list">
      <router-link
        tag="div"
        class="meeting"
        :to="`/meeting/${meeting.id}`"
        :key="meeting.name"
        v-for="meeting in meetings"
      >
        <h4>
          {{meeting.name}}
          <p>{{duration(meeting.baseDuration)}}</p>
        </h4>
        <div class="remaining-time" v-if="duration(meeting.timer)">{{duration(meeting.timer)}}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  inject: ['duration'],
  name: 'home',
  computed: {
    ...mapGetters(['meetings', 'sprintDays'])
  },
  methods: {
    ...mapActions(['setSprint', 'updateMeeting'])
  }
};
</script>

<style lang="scss" scoped>
.meeting-list {
  border-top: 1px solid #ddd;
  .meeting {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #ddd;
    h4 {
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
</style>
