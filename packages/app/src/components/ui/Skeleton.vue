<template>
  <ion-list>
    <ion-item lines="none">
      <ion-label>
        <h3>
          <ion-skeleton-text
            :animated="true"
            style="width: 80%"
          ></ion-skeleton-text>
        </h3>
        <p>
          <ion-skeleton-text
            :animated="true"
            style="width: 60%"
          ></ion-skeleton-text>
        </p>
        <p>
          <ion-skeleton-text
            :animated="true"
            style="width: 30%"
          ></ion-skeleton-text>
        </p>
      </ion-label>
    </ion-item>
  </ion-list>
</template>

<script>
import { defineComponent } from 'vue';
import { IonList, IonItem, IonLabel, IonSkeletonText } from '@ionic/vue';

export default defineComponent({
  name: 'Skeleton',
  components: {
    IonList,
    IonItem,
    IonLabel,
    IonSkeletonText,
  },
});
</script>

<style scoped></style>
