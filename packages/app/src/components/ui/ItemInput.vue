<template>
  <ion-item class="item" :lines="lines">
    <slot></slot>

    <span
      v-if="error && typeof error === 'string' && error.length > 0"
      class="error"
      >{{ error }}</span
    >
    <span
      v-else-if="success && typeof success === 'string' && success.length > 0"
      class="success"
      >{{ success }}</span
    >
  </ion-item>
</template>
<script>
import { IonItem } from '@ionic/vue';

export default {
  name: 'ItemInput',
  components: {
    IonItem,
  },
  props: {
    label: {
      type: String,
      default: '',
    },
    lines: {
      type: String,
      default: 'none',
    },
    error: {
      type: [String, Boolean],
      default: false,
    },
    success: {
      type: [String, Boolean],
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    hint: {
      type: String,
      default: null,
    },
  },
  methods: {},
};
</script>
<style scoped>
.error {
  color: var(--ion-color-danger) !important;
  font-size: 12px;
  right: 0;
  position: absolute;
  bottom: 0px;
}
.success {
  color: var(--ion-color-success) !important;
  font-size: 12px;
}
.item {
  padding-right: 10px;
}
.bold {
  font-weight: bold;
}
.hint {
  position: absolute;
  right: 0;
  top: 0;
}
</style>
