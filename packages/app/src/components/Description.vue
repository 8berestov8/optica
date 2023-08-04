<template>
  <ion-col class="ion-margin" style="padding: 0">
    <ion-row>
      <ion-label class="text">{{ text }}</ion-label>
    </ion-row>
  </ion-col>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonRow, IonCol, IonLabel } from '@ionic/vue';
export default defineComponent({
  props: {
    text: {
      type: String,
      default: '',
    },
  },
  components: {
    IonRow,
    IonCol,
    IonLabel,
  },
});
</script>

<style lang="scss" scoped>
.text {
  white-space: break-spaces;
}
</style>
