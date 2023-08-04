<template>
  <ion-buttons class="btn">
    <ion-button fill="solid" class="custom-btn" :disabled="disabled">{{
      title
    }}</ion-button>
  </ion-buttons>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonButton, IonButtons } from '@ionic/vue';

export default defineComponent({
  name: 'Button',
  props: {
    title: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    IonButton,
    IonButtons,
  },
});
</script>

<style scoped lang="scss">
.custom-btn {
  width: 100%;
  height: 41px;
  border-radius: 5px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  margin: 30px 7px;
}
.custom-btn:hover {
  --background: #00795d;
}
</style>
