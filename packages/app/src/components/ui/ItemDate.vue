<template>
  <ion-popover trigger="click-trigger" trigger-action="click" show-backdrop>
    <ion-datetime
      :value="modelValue"
      :presentation="presentation"
      locale="ru-RU"
      :show-default-buttons="true"
      done-text="Выбрать"
      cancel-text="Отмена"
      @ionChange="changeDate"
    ></ion-datetime>
  </ion-popover>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPopover, IonDatetime } from '@ionic/vue';

export default defineComponent({
  name: 'ItemDate',
  props: {
    modelValue: {
      type: String,
      default: null,
    },
    format: {
      type: String,
      default: 'YYYY-MM-DD',
    },
    formatTime: {
      type: String,
      default: 'HH:mm',
    },
    presentation: {
      type: String,
      default: 'date',
    },
  },
  emits: ['update:modelValue', 'ionChange'],
  components: {
    IonPopover,
    IonDatetime,
  },
  methods: {
    changeDate(e) {
      if (!e.detail.value) {
        return;
      }
      let d = null;
      if (this.presentation === 'time') {
        d = e.detail.value;
      } else {
        d = this.$moment(e.detail.value).format(this.format);
      }
      this.$emit('update:modelValue', d);
      this.$nextTick(() => {
        this.$emit('ionChange', d);
      });
    },
  },
});
</script>

<style lang="scss">
ion-popover {
  --width: 300px !important;
}
ion-popover::part(content) {
  bottom: none;
}
</style>
