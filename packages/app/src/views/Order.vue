<template>
  <ion-page id="order">
    <ion-content :scroll-y="false">
      <Info
        icon="assets/icon/check.svg"
        :title="`${$t('YOUR-ORDER-NUMMBER')} ${order} ${$t(
          'COMPLETED-SUCCESSFULLY'
        )}`"
        :description="$t('ORDER-DESCRIPTION')"
      />
      <Button :title="$t('TO-MAIN')" class="button" @click.prevent="toHome" />
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import { mapGetters, mapMutations } from 'vuex';
import Info from '@/components/ui/Info.vue';
import Button from '@/components/ui/Button.vue';

export default defineComponent({
  name: 'Order',
  components: {
    Button,
    Info,
    IonPage,
    IonContent,
  },
  computed: {
    ...mapGetters(['order']),
  },
  methods: {
    ...mapMutations(['SET_ORDER']),
    async toHome() {
      await this.$router.replace({ name: 'Home' });
      this.SET_ORDER('');
    },
  },
});
</script>

<style lang="scss">
#order {
  ion-content {
    --background: #ffffff;
  }
  .button {
    bottom: 60px;
    position: relative;
  }
}
</style>
