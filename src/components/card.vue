<template>
  <div class="card" :class="{ large, active }">
    <div class="content">
      <div class="number">
        <eva-icon
          v-if="icon"
          :name="content"
          animation="pulse"
          fill="#9d620b"
          :width="large ? 120 : 40"
          :height="large ? 180 : 65"
        ></eva-icon>
        <span v-else>{{ content }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: ''
    },
    icon: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
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
$cardColor: #e48f10;

.card {
  height: 140px;
  width: 100px;
  border-radius: 5px;
  border: 5px solid $cardColor;
  background-color: lighten($cardColor, 55%);
  display: inline-block;
  text-align: center;
  font-size: 35px;
  line-height: 68px;
  position: relative;
  z-index: 5;
  display: table;
  margin: 0 auto;
  transition: all 0.3s;
  &.active {
    opacity: 0.2;
  }
  &.large {
    transform-origin: 0 0;
    z-index: 6;
    align-self: center;
    width: 300px;
    height: 400px;
    border-width: 10px;
    line-height: 178px;
    font-size: 100px;
    .number {
      width: 200px;
      height: 200px;
      border: 10px solid lighten($cardColor, 10%);
      box-shadow: 0 0 0 2px lighten($cardColor, 55%),
        0 0 0 6px lighten($cardColor, 20%);
    }
  }

  .content {
    display: table-cell;
    vertical-align: middle;
  }

  .number {
    width: 75px;
    height: 75px;
    color: darken($cardColor, 15%);
    margin: 0 auto;
    border: 5px solid lighten($cardColor, 10%);
    border-radius: 100%;
    box-shadow: 0 0 0 2px lighten($cardColor, 55%),
      0 0 0 4px lighten($cardColor, 20%);
  }
}
</style>
