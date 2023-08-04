<template>
  <ion-card class="card">
    <img :src="img" class="image" />
    <ion-card-header class="header-card">
      <ion-card-subtitle class="title">{{ title }}</ion-card-subtitle>
    </ion-card-header>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonCard, IonCardHeader, IonCardSubtitle } from '@ionic/vue';

export default defineComponent({
  name: 'Card',
  props: {
    title: {
      type: String,
      default: '',
    },
    img: {
      type: String,
      default: '',
    },
  },
  components: {
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
  },
});
</script>

<style scoped lang="scss">
.card {
  .image {
    width: 100%;
  }

  .header-card {
    padding: 10px 10px 10px 16px;

    .title {
      font-size: 14px;
      text-transform: initial;
      color: #000000;
      font-weight: 500;
    }
  }
}
</style>
