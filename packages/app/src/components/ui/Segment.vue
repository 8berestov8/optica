<template>
  <ion-segment
    :value="handlerValue"
    @ionChange="changeSegment($event)"
    class="segment-container"
    ref="segment"
  >
    <ion-segment-button value="left" class="segment">
      <ion-label class="label">{{ titleLeft }}</ion-label>
    </ion-segment-button>
    <ion-segment-button value="right" class="segment">
      <ion-label class="label">{{ titleRight }}</ion-label>
    </ion-segment-button>
  </ion-segment>
</template>

<script>
import { defineComponent } from 'vue';
import { IonSegment, IonSegmentButton, IonLabel } from '@ionic/vue';

export default defineComponent({
  name: 'Segment',
  props: {
    value: {
      type: String,
      default: 'left',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    titleLeft: {
      type: String,
      default: '',
    },
    titleRight: {
      type: String,
      default: '',
    },
  },
  emits: ['change'],
  components: {
    IonSegment,
    IonSegmentButton,
    IonLabel,
  },
  computed: {
    handlerValue() {
      return this.value;
    },
  },
  methods: {
    changeSegment(event) {
      this.$emit('change', event.detail.value);

      if (this.disabled) {
        this.$refs.segment.$el.value = 'left';
      } else {
        this.$refs.segment.$el.value = this.handlerValue;
      }
    },
  },
});
</script>

<style lang="scss">
.segment-container {
  --background: #ffffff;
  border: 1px solid #005944;

  .segment {
    --border-color: #fffff;
    --indicator-box-shadow: none;
    margin: 0;
    padding: 0;

    .label {
      white-space: pre-wrap;
      font-weight: 300;
      font-size: 12px;
      line-height: 15px;
      text-align: center;
    }
  }

  .segment-button-checked {
    color: #ffffff;
  }
}

ion-segment-button::part(indicator-background) {
  background: #005944 !important;
  color: #ffffff;
}

ion-segment-button::part(indicator) {
  padding-inline: 0;
}
</style>
