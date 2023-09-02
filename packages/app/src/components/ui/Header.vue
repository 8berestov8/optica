<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start" class="button-box" v-if="back">
        <ion-button @click.prevent="onBack">
          <ion-icon :icon="chevronBackOutline" />
        </ion-button>
      </ion-buttons>

      <ion-title class="title" v-if="!custom">{{ title }}</ion-title>

      <div class="box" v-if="custom">
        <ion-icon icon="assets/icon/logo_brand.svg" class="logo" />
        <span class="custom-title">
          {{ title }}
        </span>
      </div>

      <slot name="search"></slot>

      <ion-buttons slot="end" class="button-box" v-if="contact">
        <ion-button class="location" @click="$router.push({ name: 'Map' })">
          <ion-icon icon="assets/icon/location.svg" class="icon-svg" />
        </ion-button>
        <ion-button @click="call">
          <ion-icon icon="assets/icon/call.svg" />
        </ion-button>
        <ion-button @click="chat">
          <ion-icon icon="assets/icon/message.svg" />
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonButtons,
  IonButton,
} from '@ionic/vue';
import { chevronBackOutline } from 'ionicons/icons';

export default defineComponent({
  name: 'Header',
  props: {
    title: {
      type: String,
      default: '',
    },
    custom: {
      type: Boolean,
      default: false,
    },
    back: {
      type: Boolean,
      default: false,
    },
    contact: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonIcon,
    IonButtons,
    IonButton,
  },
  data: () => ({
    chevronBackOutline,
  }),
  methods: {
    onBack() {
      this.$router.back();
    },
    call() {
      const win: Window = window;
      win.location = 'tel:+79502822722';
    },
    chat() {
      const win: Window = window;
      win.location = 'https://wa.me/79502822722';
    },
  },
});
</script>

<style scoped lang="scss">
.box {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .logo {
    margin-left: 20px;
    width: 20px;
    height: 20px;
  }

  .custom-title {
    margin-left: 10px;
    color: var(--ion-color-primary);
    width: 130px;
    font-size: 12px;
    font-weight: 400;
  }
}

.title {
  font-size: 14px;
  font-weight: 600;
}

.button-box {
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
