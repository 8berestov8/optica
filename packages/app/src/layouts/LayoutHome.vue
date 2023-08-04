<template>
  <ion-page>
    <ion-content :scroll-y="false">
      <ion-tabs>
        <ion-router-outlet :animated="false"></ion-router-outlet>
        <ion-tab-bar slot="bottom" class="tab-bar">
          <ion-tab-button
            :selected="checkPath(PATH_HOME)"
            @click.prevent="changePath(PATH_HOME)"
          >
            <ion-icon :icon="changeHome" class="icon" />
            <ion-label class="label">Главная</ion-label>
          </ion-tab-button>

          <ion-tab-button
            :selected="checkPath(PATH_CATALOG)"
            @click.prevent="changePath(PATH_CATALOG)"
          >
            <ion-icon :icon="changeCatalog" class="icon" />
            <ion-label class="label">Каталог</ion-label>
          </ion-tab-button>

          <ion-tab-button
            :selected="checkPath(PATH_RECORDING)"
            @click.prevent="changePath(PATH_RECORDING)"
          >
            <ion-icon :icon="changeRecording" class="icon" />
            <ion-label class="label">Запись</ion-label>
          </ion-tab-button>

          <ion-tab-button
            :selected="checkPath(PATH_BASKET)"
            @click.prevent="changePath(PATH_BASKET)"
          >
            <ion-icon :icon="changeBasket" class="icon" />
            <ion-label class="label">Корзина</ion-label>
            <div style="position: relative" v-if="basket_count !== 0">
              <div class="count-box">
                <p class="count">{{ basket_count }}</p>
              </div>
            </div>
          </ion-tab-button>

          <ion-tab-button
            :selected="checkPath(PATH_PROFILE)"
            @click.prevent="changePath(PATH_PROFILE)"
          >
            <ion-icon :icon="changeProfile" class="icon" />
            <ion-label class="label">Профиль</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
    </ion-content>
  </ion-page>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
    IonContent
} from '@ionic/vue';
import {
  PATH_CATALOG,
  PATH_HOME,
  PATH_BASKET,
  PATH_RECORDING,
  PATH_PROFILE,
} from '@/router/constants';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'LayoutHome',
  components: {
    IonLabel,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonPage,
    IonRouterOutlet,
    IonContent
  },
  data: () => ({
    PATH_HOME,
    PATH_CATALOG,
    PATH_BASKET,
    PATH_RECORDING,
    PATH_PROFILE,
  }),
  computed: {
    ...mapGetters(['basket_count']),
    changeHome() {
      return this.$route.path.includes(PATH_HOME)
        ? 'assets/icon/home-active.svg'
        : 'assets/icon/home.svg';
    },
    changeCatalog() {
      return this.$route.path.includes(PATH_CATALOG)
        ? 'assets/icon/catalog-active.svg'
        : 'assets/icon/catalog.svg';
    },
    changeRecording() {
      return this.$route.path.includes(PATH_RECORDING)
        ? 'assets/icon/recording-active.svg'
        : 'assets/icon/recording.svg';
    },
    changeBasket() {
      return this.$route.path.includes(PATH_BASKET)
        ? 'assets/icon/basket-active.svg'
        : 'assets/icon/basket.svg';
    },
    changeProfile() {
      return this.$route.path.includes(PATH_PROFILE)
        ? 'assets/icon/profile-active.svg'
        : 'assets/icon/profile.svg';
    },
  },
  methods: {
    checkPath(path) {
      return !!this.$route.matched.find((r) => r.path === path);
    },
    changePath(path) {
      this.$router.replace(path);
    },
  },
});
</script>

<style scoped lang="scss">
.tab-bar {
  height: 70px;

  .label {
    margin-top: 4px;
  }

  .icon {
    width: 20px;
    height: 20px;
  }

  .count-box {
    position: absolute;
    width: 12px;
    height: 12px;
    background: #c90433;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 15px;
    top: -50px;

    .count {
      color: #ffffff;
      font-weight: 500;
      font-size: 8px;
      line-height: 10px;
    }
  }
}
</style>
