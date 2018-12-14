<template>
  <div class="header">
    <div class="left">
      <div class="back-button" v-if="back" @click="goBack">back</div>
    </div>

    <div class="title">{{title}}</div>

    <div class="right"></div>
  </div>
</template>


<script>
export default {
  name: 'header',
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
  .back-button {
  }
  .title {
    text-align: center;
    font-weight: bold;
  }
}
</style>
