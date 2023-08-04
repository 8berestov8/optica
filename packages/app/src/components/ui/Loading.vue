<template>
  <ion-content :scroll-y="false">
    <ion-backdrop :visible="true" class="backdrop"></ion-backdrop>
    <ion-item
      lines="none"
      class="ion-justify-content-center ion-align-items-center spinner"
    >
      <ion-spinner></ion-spinner>
      <ion-label class="ion-margin-start">Загрузка...</ion-label>
    </ion-item>
  </ion-content>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonItem,
  IonBackdrop,
  IonSpinner,
  IonLabel,
  IonContent,
} from '@ionic/vue';

export default defineComponent({
  name: 'Loading',
  components: {
    IonItem,
    IonBackdrop,
    IonSpinner,
    IonLabel,
    IonContent,
  },
});
</script>

<style>
.backdrop {
  opacity: 0.1;
}

.spinner {
  margin: auto;
  display: flex;
  height: 100%;
  width: fit-content;
  --background: none;
}

ion-loading.loader {
  --spinner-color: #005944;
}
</style>
