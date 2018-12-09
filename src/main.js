import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;

new Vue({
  provide: {
    duration(_seconds) {
      if (_seconds) {
        const hours = (_seconds / (60 * 60)) % 24;
        const minutes = (_seconds / 60) % 60;
        const seconds = _seconds % 60;

        const hourStr = `${Math.floor(hours)} ${hours > 1 ? 'hours' : 'hour'}`;
        const minuteStr = `${Math.floor(minutes)} ${
          minutes === 1 ? 'minute' : 'minutes'
        }`;
        const secondStr = `${Math.floor(seconds)} ${
          seconds === 1 ? 'second' : 'seconds'
        }`;

        if (hours >= 1) {
          return `${hourStr}`;
        }

        if (minutes < 60) {
          return `${minuteStr} ${secondStr}`;
        }

        if (seconds < 60) {
          return secondStr;
        }
      }
      return;
    }
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app');
