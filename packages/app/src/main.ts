import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';

import { IonicVue } from '@ionic/vue';
import Maska from 'maska';
import { showToast } from '@/helpers/toast';
import moment from 'moment';
import 'moment/locale/ru';
import i18n from '@/helpers/i18n';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

// @ts-ignore
import YmapPlugin from 'vue-yandex-maps';

declare global {
  interface Window {
    $store: any;
  }
}

const settings = {
  apiKey: process.env.VUE_APP_YANDEX_KEY,
  lang: 'ru_RU',
  coordorder: 'latlong',
  enterprise: false,
  version: '2.1',
};

const app = createApp(App)
  .use(IonicVue, { mode: 'ios' })
  .use(store)
  .use(router)
  .use(i18n)
  .use(YmapPlugin, settings)
  .use(Maska);

app.config.globalProperties.$toast = showToast;
app.config.globalProperties.$moment = moment;
window.$store = store;

router.isReady().then(() => {
  app.mount('#app');
});
