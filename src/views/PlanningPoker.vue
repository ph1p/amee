<template>
  <div class="container planning-poker">
    <app-header back>
      <div slot="title">Planning Poker</div>
    </app-header>

    <div class="active-card">
      <transition :name="transitionName" mode="out-in">
        <card
          v-if="activeIndex !== -1"
          v-hammer:swipe.horizontal="
            e => activateCard(activeIndex + (e.type === 'swipeleft' ? 1 : -1))
          "
          :key="activeIndex"
          :icon="currentCard.icon"
          :content="currentCard.content"
          large
        ></card>
        <div v-else class="no-card">Choose a card</div>
      </transition>
    </div>

    <div class="cards">
      <div
        class="card-outer"
        v-for="(card, index) in cards"
        :key="card.content"
      >
        <card
          @click.native="activateCard(index)"
          :active="activeIndex !== -1 && card.content === currentCard.content"
          :icon="card.icon"
          :content="card.content"
        ></card>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/app-header';
import Card from '@/components/card';

export default {
  name: 'PlanningPoker',
  components: {
    AppHeader,
    Card
  },
  data() {
    return {
      activeIndexStyle: {},
      transitionName: '',
      activeIndex: -1,
      cards: [
        {
          content: '0',
          icon: false
        },
        {
          content: '0.5',
          icon: false
        },
        {
          content: '1',
          icon: false
        },
        {
          content: '2',
          icon: false
        },
        {
          content: '3',
          icon: false
        },
        {
          content: '5',
          icon: false
        },
        {
          content: '8',
          icon: false
        },
        {
          content: '13',
          icon: false
        },
        {
          content: '20',
          icon: false
        },
        {
          content: '40',
          icon: false
        },
        {
          content: '100',
          icon: false
        },
        {
          content: 'flash-outline',
          icon: true
        },
        {
          content: 'question-mark-outline',
          icon: true
        }
      ]
    };
  },
  computed: {
    currentCard() {
      return this.activeIndex !== -1 && this.cards[this.activeIndex];
    }
  },
  methods: {
    activateCard(index) {
      let prevIndex = this.activeIndex;

      if (index > prevIndex) {
        this.transitionName = 'slide-left';
      } else {
        this.transitionName = 'slide-right';
      }

      this.activeIndex =
        this.activeIndex === index || index > this.cards.length ? -1 : index;
    }
  }
};
</script>

<style lang="scss" scoped>
$cardColor: #e48f10;

.slide-left-enter {
  opacity: 0;
  transform: translateX(100%);
}
.slide-left-leave-to,
.slide-right-enter {
  opacity: 0;
  transform: translateX(-100%);
}
.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.no-card {
  transition: all 0.3s;
  font-size: 35px;
}

.planning-poker {
  overflow: hidden;
  display: grid;
  grid-template-rows: 50px 1fr 160px;
  .cards {
    white-space: nowrap;
    overflow: auto;
    padding: 0 20px 16px;
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
</style>
