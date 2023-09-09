<template>
  <ion-page id="order">
    <Content :scroll-y="false">
      <Info
        icon="assets/icon/check.svg"
        :title="`${$t('YOUR-ORDER-NUMMBER')} ${order} ${$t(
          'COMPLETED-SUCCESSFULLY'
        )}`"
        :description="$t('ORDER-DESCRIPTION')"
      />
      <Button :title="$t('TO-MAIN')" class="button" @click.prevent="toHome" />
    </Content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage } from '@ionic/vue';
import { mapGetters, mapMutations } from 'vuex';
import Info from '@/components/ui/Info.vue';
import Button from '@/components/ui/Button.vue';
import Content from '@/components/ui/Content.vue';

export default defineComponent({
  name: 'Order',
  components: {
    Button,
    Info,
    IonPage,
    Content,
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
    bottom: 40px;
    position: relative;
    margin: 0 8px;
  }
}
</style>
