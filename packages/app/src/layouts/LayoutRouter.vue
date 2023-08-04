<template>
  <ion-page>
    <ion-content :scroll-y="false">
      <ion-router-outlet :animated="false" />
    </ion-content>
  </ion-page>
</template>
<script>
import { IonRouterOutlet, IonPage, IonContent } from '@ionic/vue';

export default {
  name: 'LayoutRouter',
  components: {
    IonRouterOutlet,
    IonPage,
    IonContent,
  },
};
</script>
