<template>
  <ion-card class="address">
    <ion-card-content class="content">
      <ion-list>
        <ion-item lines="none">
          <ion-label class="title">{{ title }}</ion-label>
        </ion-item>

        <ion-item lines="none">
          <ion-row class="ion-align-items-start ion-nowrap">
            <ion-col class="icon-col">
              <ion-icon
                icon="../assets/icon/location-profile.svg"
                class="ion-margin-end icon"
              ></ion-icon>
            </ion-col>
            <ion-col class="text-col">
              <ion-label class="text"
                >г. Владивосток, ул. Енисейская, 23Д пом. 102
              </ion-label>
              <div>
                <a
                  herf="#"
                  class="link-view-card"
                  @click="$router.push({ name: 'Map' })"
                  >Посмотреть на карте</a
                >
              </div>
            </ion-col>
          </ion-row>
        </ion-item>

        <ion-item lines="none">
          <ion-row class="ion-align-items-center">
            <ion-col class="icon-col">
              <ion-icon
                icon="../assets/icon/alarm-profile.svg"
                class="ion-margin-end icon"
              ></ion-icon>
            </ion-col>
            <ion-col class="text-col">
              <ion-label class="text">пн-вс: 09:00-20:00</ion-label>
            </ion-col>
          </ion-row>
        </ion-item>
      </ion-list>
    </ion-card-content>
  </ion-card>
</template>

<script>
import {
  IonCol,
  IonCard,
  IonCardContent,
  IonLabel,
  IonItem,
  IonList,
  IonIcon,
  IonRow,
} from '@ionic/vue';

export default {
  name: 'Address',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  components: {
    IonCol,
    IonCard,
    IonCardContent,
    IonLabel,
    IonItem,
    IonList,
    IonIcon,
    IonRow,
  },
};
</script>

<style lang="scss">
.address {
  .title {
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color: #000000;
    text-transform: none;
  }

  .content {
    padding-left: 0;
    padding-top: 0;
    padding-bottom: 0;

    .icon-col {
      width: 32px;
      display: contents;

      .icon {
        width: 24px;
        height: 24px;
      }
    }

    .text-col {
      .text {
        font-size: 14px;
        line-height: 17px;
        color: #000000;
        text-decoration: none;
        white-space: pre-wrap;
      }

      .link-view-card {
        font-weight: 300;
        font-size: 12px;
        line-height: 130%;
        color: #6f6f6f;
      }
    }
  }
}
</style>
