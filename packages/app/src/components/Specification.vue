<template>
  <ion-col class="ion-margin" style="padding: 0">
    <ion-row v-if="manufacturer">
      <ion-col>
        <ion-label class="title">{{ $t('MANUFACTURER') }}</ion-label>
      </ion-col>
      <ion-col>
        <ion-title class="text">{{ manufacturer }}</ion-title>
      </ion-col>
    </ion-row>

    <ion-row class="ion-margin-top" v-if="type">
      <ion-col>
        <ion-label class="title">{{ $t('LENS-TYPE') }}</ion-label>
      </ion-col>
      <ion-col>
        <ion-title class="text">{{ $t(type) }}</ion-title>
      </ion-col>
    </ion-row>

    <ion-row class="ion-margin-top" v-if="brand">
      <ion-col>
        <ion-label class="title">{{ $t('BRAND') }}</ion-label>
      </ion-col>
      <ion-col>
        <ion-title class="text">{{ brand }}</ion-title>
      </ion-col>
    </ion-row>

    <ion-row class="ion-margin-top" style="position: relative" v-if="period">
      <ion-col>
        <ion-label class="title">{{ $t('REPLACEMENT-PERIOD') }}</ion-label>
        <ion-buttons class="btn-question-period">
          <ion-button @click="presentAlert">
            <ion-icon
              icon="assets/icon/question.svg"
              slot="icon-only"
              class="icon"
            />
          </ion-button>
        </ion-buttons>
      </ion-col>
      <ion-col>
        <ion-title class="text">{{
          $tc('COUNT-REPLACEMENT-PERIOD', Number(period))
        }}</ion-title>
      </ion-col>
    </ion-row>

    <ion-row class="ion-margin-top" v-if="material">
      <ion-col>
        <ion-label class="title">{{ $t('MATERIAL') }}</ion-label>
      </ion-col>
      <ion-col>
        <ion-title class="text">{{ material }}</ion-title>
      </ion-col>
    </ion-row>
  </ion-col>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonRow,
  IonCol,
  IonLabel,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  alertController,
} from '@ionic/vue';

export default defineComponent({
  name: 'Specification',
  components: {
    IonRow,
    IonCol,
    IonLabel,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
  },
  props: {
    manufacturer: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    brand: {
      type: String,
      default: '',
    },
    period: {
      type: String,
      default: '',
    },
    material: {
      type: String,
      default: '',
    },
  },
  methods: {
    async presentAlert() {
      const alert = await alertController.create({
        message: this.$t('REPLACEMENT-PERIOD-MESSAGE'),
        buttons: [
          {
            text: this.$t('OK'),
            role: 'confirm',
            handler: () => {
              console.log('ok');
            },
          },
        ],
      });

      await alert.present();
      await alert.onDidDismiss();
    },
  },
});
</script>

<style scoped lang="scss">
.title {
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  color: #6f6f6f;
}

.text {
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  text-align: start;
  margin: 0;
  padding: 0;
}

.btn-question-period {
  position: absolute;
  margin: 0 auto;
  top: -15px;
  left: 86px;
}

.btn-question-radius {
  position: absolute;
  margin: 0 auto;
  top: -15px;
  left: 114px;
}

.icon {
  width: 15px;
  height: 15px;
}
</style>
