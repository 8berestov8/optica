<template>
  <ion-content ref="Content" :scroll-events="true" @ionScroll="onScroll">
    <ion-grid class="ion-no-padding container" fixed>
      <slot></slot>
    </ion-grid>
    <ion-refresher slot="fixed" @ionRefresh="doRefresh" class="refresher">
      <ion-refresher-content class="refresher-content"></ion-refresher-content>
    </ion-refresher>
  </ion-content>
</template>

<script>
import { defineComponent } from 'vue';
import {
  IonContent,
  IonGrid,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/vue';

export default defineComponent({
  name: 'Content',
  components: {
    IonContent,
    IonRefresher,
    IonRefresherContent,
    IonGrid,
  },
  props: {} || [],
  emits: ['refresh', 'onScrollEnd'],
  data: () => ({
    refreshing: false,
  }),
  methods: {
    async doRefresh(e) {
      await this.$emit('refresh', () => e.target.complete());
    },
    async refresh() {
      this.refreshing = true;
      await this.$emit('refresh');
      this.refreshing = false;
    },
    // clearError() {
    //   window.$store.dispatch('setError', null);
    // },
    async onScroll(e) {
      const scrollElement = await this.$refs.Content.$el.getScrollElement();
      const { offsetHeight, scrollTop, scrollHeight } = scrollElement;
      if (scrollTop + offsetHeight >= scrollHeight - offsetHeight) {
        this.$emit('onScrollEnd', {
          event: e,
          scrollTop,
          scrollHeight,
          offsetHeight,
        });
      }
    },
  },
});
</script>

<style lang="scss">
.container {
  height: 100%;
}

.refresher {
  background: #ecebeb;
}

.refresher-content {
  background: #ecebeb;
  height: 100%;
}

.refresher-completing {
  display: none;
}
ion-refresher {
  display: contents !important;
}

ion-spinner {
  color: #005944;
}
</style>
