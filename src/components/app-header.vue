<template>
  <div class="header">
    <div class="left">
      <eva-icon
        v-if="back"
        @click="goBack"
        name="arrow-ios-back-outline"
        fill="white"
      ></eva-icon>
    </div>

    <div class="title">{{title}}</div>

    <div class="right"></div>
  </div>
</template>


<script>
export default {
  props: {
    back: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  display: grid;
  grid-template-columns: 30px 1fr 30px;
  align-items: center;
  color: #fff;
  background-color: rgb(0, 101, 126);
  .left {
    padding: 10px;
  }
  .title {
    text-align: center;
    font-weight: bold;
  }
}
</style>
