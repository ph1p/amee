import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import PlanningPoker from './views/PlanningPoker.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/planning-poker',
      name: 'planning-poker',
      component: PlanningPoker
    },
    {
      path: '/meeting/:id',
      name: 'meeting',
      component: () =>
        import(/* webpackChunkName: "meeting" */ './views/Meeting.vue')
    }
  ]
});
