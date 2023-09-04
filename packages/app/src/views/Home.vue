<template>
  <ion-page id="home">
    <Header :title="$t('NAME')" custom contact />
    <ion-content :fullscreen="true">
      <Card
        class="pressed"
        :title="$t('ORDER-CARD-TITLE')"
        img="assets/image/ordering_contact_lenses.png"
        @click="$router.replace({ name: 'Catalog' })"
      />
      <Card
        class="pressed"
        :title="$t('RECORDING-CARD-TITLE')"
        img="assets/image/recording_with_a_doctor.png"
        @click="$router.replace({ name: 'Recording' })"
      />
      <Card
        slider
        class="pressed"
        :title="$t('ACTION-CARD-TITLE')"
        :slider_data="actions_news"
        @open-slide="toActionNews"
      />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import Header from '@/components/ui/Header.vue';
import Card from '@/components/ui/Card.vue';
import { mapActions, mapGetters } from 'vuex';

export default defineComponent({
  name: 'Home',
  components: { Card, Header, IonContent, IonPage },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['actions_news']),
  },
  methods: {
    ...mapActions(['getActionsNews']),
    toActionNews(id: any) {
      this.$router.push({ name: 'ActionsNews', params: { id: id } });
    },
  },
  mounted() {
    this.getActionsNews();
  },
});
</script>

<style scoped lang="scss">
.pressed:active {
  --background: #deeeea;
}
</style>
