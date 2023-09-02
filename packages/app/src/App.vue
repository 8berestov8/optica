<template>
  <ion-app>
    <ion-router-outlet :animated="false" id="main" />
  </ion-app>
</template>

<script>
import {
  alertController,
  IonApp,
  IonRouterOutlet,
  isPlatform,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { StatusBar, Style } from '@capacitor/status-bar';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { pushNotifications } from './notifications';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
  },
  computed: {
    ...mapGetters(['error']),
  },
  watch: {
    error(newError, prevError) {
      if (newError && newError !== prevError) {
        if (typeof newError === 'string') {
          this.presentAlert();
        } else if (typeof newError === 'object') {
          // if (newError?.type === 'Unauthorized') {
          //   this.$toast(this.$t('PLEASE-LOGIN'), 4000);
          //   this.logout();
          //   this.$router.replace('/');
          // }
          if (newError?.type === 'Network') {
            const { method } = newError;
            const message =
              method === 'post' || method === 'delete' || method === 'put'
                ? 'Ошибка при отправке данных, проверьте ваше интернет-соединение'
                : 'Ошибка при получении данных, проверьте ваше интернет-соединение';
            this.$toast(message, 4000);
          }
        }
      }
    },
  },
  methods: {
    ...mapMutations(['SET_TOKEN', 'SET_USER']),
    ...mapActions([
      'getProducts',
      'getTypes',
      'getRadius',
      'getSphere',
      'getAdds',
      'getAxes',
      'getCylinders',
      'getDominants',
      'getPeriod',
      'filterProducts',
      'getCategories',
    ]),
    async presentAlert() {
      try {
        const alert = await alertController.create({
          message: this.error,
          buttons: ['OK'],
        });
        await alert.present();
        await alert.onDidDismiss();
        this.clearError();
      } catch (e) {
        console.error(e);
      }
    },
    clearError() {
      window.$store.dispatch('setError', null);
    },
  },
  async mounted() {
    pushNotifications.OnInit();
    const list = [
      this.getCategories(),
      this.getPeriod(),
      this.getSphere(),
      this.getRadius(),
      this.getTypes(),
      this.getAdds(),
      this.getAxes(),
      this.getCylinders(),
      this.getDominants(),
    ];
    /*
    await this.getCategories();
    await this.getPeriod();
    await this.getSphere();
    await this.getRadius();
    await this.getTypes();
    await this.getAdds();
    await this.getAxes();
    await this.getCylinders();
    await this.getDominants();
*/

    await Promise.all(list);
    if (!isPlatform('mobileweb')) {
      try {
        await StatusBar.setStyle({ style: Style.Light });
      } catch (e) {
        console.error(e);
      }
    }

    if (localStorage.getItem('jwt')) {
      try {
        this.SET_TOKEN(localStorage.getItem('jwt'));
      } catch (e) {
        console.error(e);
      }
    }

    if (localStorage.getItem('user')) {
      try {
        const user = localStorage.getItem('user');
        this.SET_USER(JSON.parse(user));
      } catch (e) {
        console.error(e);
      }
    }
  },
});
</script>

<style lang="scss">
@import 'theme/main.scss';

@font-face {
  font-family: 'Montserrat';
  src: url('./assets/fonts/Montserrat-Regular.ttf');
}
</style>
