import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;

new Vue({
  provide: {
    duration(seconds) {
      const hours = seconds / 60 / 60;
      const minutes = 60 / (1 / hours);

      if (minutes < 60) {
        return `${minutes} ${Math.floor(minutes) === 1 ? 'minute' : 'minutes'}`;
      }

      return `${hours} ${Math.floor(hours) > 1 ? 'hours' : 'hour'}`;
    }
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app');
