<template>
  <div class="meeting">
    <h3>{{currentMeeting.name}}</h3>
    <p>Duration: {{duration(currentMeeting.baseDuration)}}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

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
  }
};
</script>

<style lang="scss" scoped>
.meeting {
  padding: 20px;
}
</style>
