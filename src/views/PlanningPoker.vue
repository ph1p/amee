<template>
  <div class="container planning-poker">
    <app-header back>
      <div slot="title">Planning Poker</div>
    </app-header>

    <div class="active-card"></div>

    <div class="cards">
      <div class="card-outer" v-for="card in cards" :key="card" :ref="card">
        <div
          class="card"
          @click="activateCard(card)"
          :style="activeCard === card ? activeCardStyle : {}"
          :class="{active: activeCard === card}"
        >
          <div class="content">
            <div class="number">
              <eva-icon
                v-if="typeof card === 'string'"
                :name="card"
                animation="pulse"
                fill="black"
                width="40"
                height="65"
              ></eva-icon>
              <span v-else>{{card}}</span>
            </div>
          </div>
        </div>
        <div v-if="activeCard === card" class="card"></div>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/app-header';
export default {
  name: 'planning-poker',
  components: {
    AppHeader
  },
  data() {
    return {
      activeCardStyle: {},
      activeCard: -1,
      cards: [
        0,
        0.5,
        1,
        2,
        3,
        5,
        8,
        13,
        20,
        40,
        100,
        'flash-outline',
        'question-mark-outline'
      ]
    };
  },
  methods: {
    activateCard(card) {
      const el = this.$refs[card][0].children[0];

      this.activeCardStyle = {
        transform:
          'scale(1) translate(' +
          (window.innerWidth / 2 - el.clientWidth / 2 - el.offsetLeft) +
          'px, ' +
          (window.innerHeight / 2 - el.clientHeight / 2 - el.offsetTop) +
          'px)'
      };
      this.activeCard = this.activeCard === card ? -1 : card;
    }
  }
};
</script>

<style lang="scss" scoped>
$cardColor: #e48f10;

.planning-poker {
  display: grid;
  grid-template-rows: 50px 1fr 160px;
  .cards {
    white-space: nowrap;
    overflow: auto;
    padding: 0 20px 20px;
  }
}

.active-card {
  text-align: center;
  padding: 0;
  align-self: center;
}

.card-outer {
  display: inline-block;
  margin: 0 20px 0 0;
  &:last-child {
    margin: 0;
  }
}

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
    /* transform: scale(2.6) translateY(-100%) translateX(-20%); */
    /* transform:  translateY(-10%); */
    position: absolute;
    transform-origin: 0 0;
    /* left: 50%;
    bottom: 0; */
    z-index: 6;
  }

  .content {
    display: table-cell;
    vertical-align: middle;
  }

  .number {
    width: 75px;
    height: 75px;
    color: darken($cardColor, 35%);
    margin: 0 auto;
    border: 5px solid lighten($cardColor, 10%);
    border-radius: 100%;
    box-shadow: 0 0 0 2px lighten($cardColor, 55%),
      0 0 0 4px lighten($cardColor, 20%);
  }
  &.large {
    transform: scale(2.4);
  }
  /* &.large {
    height: 100%;
    width: 280px;
    font-size: 110px;
    border-width: 10px;
    line-height: 240px;
    .number {
      width: 240px;
      height: 240px;
    }
  } */
}
</style>
