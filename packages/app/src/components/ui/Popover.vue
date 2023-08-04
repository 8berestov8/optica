<template>
  <ion-modal :is-open="popover.show" class="popover" :animated="false">
    <div id="box">
      <div v-if="popover.message.length">
        <p
          class="text"
          v-for="(message, index) in popover.message"
          :key="index"
        >
          {{ message }}
        </p>
      </div>

      <div class="btn-wrapper">
        <ion-buttons class="ion-margin-end">
          <ion-button class="btn-cancel" @click="cancel">{{
            buttonCancel
          }}</ion-button>
        </ion-buttons>
        <ion-buttons>
          <ion-button class="btn-ok" @click="ok">{{ buttonOk }}</ion-button>
        </ion-buttons>
      </div>
    </div>
  </ion-modal>
</template>

<script>
import { defineComponent } from 'vue';
import { IonButtons, IonButton, IonModal } from '@ionic/vue';
import { mapGetters, mapMutations } from 'vuex';

export default defineComponent({
  name: 'Popover',
  components: {
    IonButtons,
    IonButton,
    IonModal,
  },
  props: {
    buttonOk: {
      type: String,
      default: '',
    },
    buttonCancel: {
      type: String,
      default: '',
    },
  },
  emits: ['handler'],
  computed: {
    ...mapGetters(['popover']),
  },
  methods: {
    ...mapMutations(['SET_POPOVER']),
    ok() {
      this.$emit('handler', 'ok');
    },
    cancel() {
      this.$emit('handler', 'cancel');
    },
  },
});
</script>

<style lang="scss">
.popover {
  --background: rgba(37, 32, 32, 0.5);
}

#box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  z-index: 999999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--ion-background-color, #fff);
  width: 90%;
  border-radius: 10px;
  flex-direction: column;

  .text {
    font-weight: 600;
    font-size: 12px;
    margin: 10px 10px;
    line-height: 140%;
    color: #000000;
  }

  .btn-wrapper {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-right: 16px;
    margin-bottom: 6px;

    .btn-ok {
      font-weight: 500;
      font-size: 12px;
      color: #17a1fa;
      line-height: 15px;
      text-transform: uppercase;
    }
    .btn-cancel {
      font-weight: 500;
      font-size: 12px;
      line-height: 15px;
      color: #c90433;
      text-transform: uppercase;
    }
  }
}
</style>
