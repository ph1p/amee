import Vue from 'vue';
import EvaIcons from 'vue-eva-icons';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;

Vue.use(EvaIcons);

new Vue({
  provide: {
    duration(_seconds) {
      if (_seconds) {
        const hours = parseInt((_seconds / (60 * 60)) % 24);
        const minutes = parseInt((_seconds / 60) % 60);
        const seconds = parseInt(_seconds % 60);

        const hourStr = `${hours} ${hours > 1 ? 'hours' : 'hour'}`;
        const minuteStr = ` ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
        const secondStr = ` ${seconds} ${seconds === 1 ? 'second' : 'seconds'}`;

        let timeStr = '';
        if (hours >= 1) {
          timeStr += hourStr;
        }

        if (minutes < 60 && minutes > 0) {
          timeStr += minuteStr;
        }

        if (seconds < 60 && seconds > 0) {
          timeStr += secondStr;
        }

        return timeStr.trim();
      }
      return;
    }
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app');
