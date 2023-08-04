<template>
  <ion-card class="card-info">
    <ion-card-content class="content">
      <ion-row class="ion-align-items-center">
        <ion-icon :icon="icon" class="ion-margin-end icon" v-if="icon" />
        <ion-label class="title">{{ title }}</ion-label>
      </ion-row>

      <ion-row class="description-row">
        <ion-label class="description">
          {{ description }}
        </ion-label>
      </ion-row>
      <ion-row class="description-row" v-if="subdescription">
        <ion-label class="description">
          {{ subdescription }}
        </ion-label>
      </ion-row>
    </ion-card-content>
  </ion-card>
</template>

<script>
import { IonCard, IonCardContent, IonRow, IonIcon, IonLabel } from '@ionic/vue';

export default {
  name: 'CardInfo',
  components: {
    IonCard,
    IonCardContent,
    IonRow,
    IonIcon,
    IonLabel,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    subdescription: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss">
.card-info {
  .content {
    .icon {
      width: 24px;
      height: 24px;
    }
    .title {
      font-weight: 600;
      font-size: 14px;
      line-height: 17px;
      color: #000000;
    }
  }

  .description-row {
    margin-top: 8px;

    .description {
      font-weight: 400;
      font-size: 14px;
      line-height: 140%;
      color: #000000;
    }
  }
}
</style>
