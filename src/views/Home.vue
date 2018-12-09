<template>
  <div class="home">
    <h1>Sprint {{sprintDays}} days</h1>
    <div class="meeting-list">
      <router-link
        tag="div"
        class="meeting"
        :to="`/meeting/${index}`"
        :key="meeting.name"
        v-for="(meeting, index) in meetings"
      >
        {{meeting.name}}
        <p>{{duration(meeting.baseDuration)}} - {{meeting.timer}}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  inject: ['duration'],
  name: 'home',
  computed: {
    ...mapGetters(['meetings', 'sprintDays'])
  }
};
</script>

<style lang="scss" scoped>
.meeting-list {
  border-top: 1px solid #ddd;
  .meeting {
    padding: 20px;
    border-bottom: 1px solid #ddd;
    p {
      margin: 0;
      font-size: 12px;
      color: #999;
    }
  }
}
</style>
