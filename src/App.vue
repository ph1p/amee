<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

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
      if (type === 'startTimer') {
        if (this.intervalCache[payload]) {
          clearInterval(this.intervalCache[payload]);
        }
        this.intervalCache[payload] = setInterval(() => {
          this.decrementTimer(payload);
        }, 1000);
      }
    });
    this.meetings.forEach(({ timer, id }) => {
      if (timer > 0 && !this.intervalCache[id]) {
        this.intervalCache[id] = setInterval(() => {
          this.decrementTimer(id);
        }, 1000);
      }
    });
  },
  methods: {
    ...mapActions(['decrementTimer'])
  },
  beforeDestroy() {
    this.unsubscribe();
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
</style>
