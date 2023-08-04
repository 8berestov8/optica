<template>
  <ion-page id="order-recording">
    <ion-content :scroll-y="false">
      <div class="vector">
        <img src="assets/icon/check.svg" />
      </div>
      <div class="text">
        <p class="title">{{ $t('YOU-SUCCESSFULL-RECORDING') }}</p>
      </div>

      <div class="info">
        <ion-col class="col1">
          <ion-row class="ion-margin title">{{ $t('DATE') }}</ion-row>
          <ion-row class="ion-margin title">{{ $t('TIME') }}</ion-row>
          <ion-row class="ion-margin title">{{ $t('DOCTOR') }}</ion-row>
          <ion-row class="ion-margin title">{{ $t('ADDRESS') }}</ion-row>
        </ion-col>
        <ion-col class="col2">
          <ion-row class="ion-margin description">{{
            formatDate(handlerDate, 'LL')
          }}</ion-row>
          <ion-row class="ion-margin description">{{ handlerTime }}</ion-row>
          <ion-row class="ion-margin description">{{ handlerDoctor }}</ion-row>
          <ion-row class="ion-margin description">{{
            `г. ${handlerOpticAddress.city}, ул. ${handlerOpticAddress.street}, ${handlerOpticAddress.number} пом. ${handlerOpticAddress.apartment}`
          }}</ion-row>
        </ion-col>
      </div>

      <ion-row class="ion-justify-content-center button-wrapper">
        <Button :title="$t('TO-MAIN')" class="button" @click="toRecording" />
      </ion-row>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonContent, IonCol, IonRow } from '@ionic/vue';
import { mapGetters, mapMutations } from 'vuex';
import { formatDate } from '@/helpers/formatter';
import Button from '@/components/ui/Button.vue';

export default defineComponent({
  name: 'OrderRecording',
  components: {
    Button,
    IonPage,
    IonContent,
    IonCol,
    IonRow,
  },
  computed: {
    ...mapGetters(['date', 'time', 'doctor', 'optic_address']),
    handlerDate() {
      return this.date;
    },
    handlerTime() {
      return this.time.time;
    },
    handlerDoctor() {
      return this.doctor.name;
    },
    handlerOpticAddress() {
      return this.optic_address;
    },
  },
  methods: {
    formatDate,
    ...mapMutations(['SET_PREVIOUS_RECORDING']),
    toRecording() {
      this.$router.replace({ name: 'Recording' });
      this.SET_PREVIOUS_RECORDING({
        date: this.handlerDate,
        time: this.handlerTime,
      });
    },
  },
});
</script>

<style lang="scss">
#order-recording {
  ion-content {
    --background: #ffffff;
  }
  .vector {
    background: url('../assets/image/vector.png');
    background-repeat: no-repeat;
    width: 160px;
    height: 145px;
    margin: 50px auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .text {
    .title {
      font-weight: 500;
      font-size: 16px;
      line-height: 130%;
      text-align: center;
      color: #000000;
    }
  }

  .info {
    display: flex;

    .col1 {
      .title {
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: #737373;
      }
    }

    .col2 {
      flex: 3;

      .description {
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: #000000;
      }
    }
  }

  .button-wrapper {
    width: 100%;
    bottom: 60px;
    position: absolute;

    .button {
      width: 100%;
      margin: 0 8px;
    }
  }
}
</style>
