<template>
  <ion-card class="card">
    <img v-if="!slider" :src="img" class="image" />
    <swiper
      v-if="slider"
      ref="swiper"
      :options="slideOpts"
      :modules="modules"
      :pagination="true"
      :autoplay="true"
      class="swiper"
    >
      <swiper-slide
        v-for="(slide, index) in slider_data"
        :key="index"
        @click="$emit('open-slide', slide.id)"
      >
        <img :src="slide.url" class="image" />
      </swiper-slide>
    </swiper>
    <ion-card-header class="header-card">
      <ion-card-subtitle class="title">{{ title }}</ion-card-subtitle>
    </ion-card-header>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonCard, IonCardHeader, IonCardSubtitle } from '@ionic/vue';
import { IonicSlides } from '@ionic/vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import {
  Controller,
  Pagination,
  Autoplay,
  Keyboard,
  Scrollbar,
  Zoom,
} from 'swiper';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/keyboard';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/zoom';
import '@ionic/vue/css/ionic-swiper.css';

export default defineComponent({
  name: 'Card',
  props: {
    title: {
      type: String,
      default: '',
    },
    img: {
      type: String,
      default: '',
    },
    slider: {
      type: Boolean,
      default: false,
    },
    slider_data: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['open-slide'],
  components: {
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      slideOpts: {
        initialSlide: 1,
        speed: 400,
      },
      modules: [
        Pagination,
        Controller,
        Autoplay,
        Keyboard,
        Scrollbar,
        Zoom,
        IonicSlides,
      ],
    };
  },
});
</script>

<style lang="scss">
.card {
  .image {
    width: 100% !important;
    height: 175px !important;
    object-fit: cover !important;
  }

  .header-card {
    padding: 10px 10px 10px 16px;

    .title {
      font-size: 14px;
      text-transform: initial;
      color: #000000;
      font-weight: 500;
    }
  }
}

.swiper-pagination {
  bottom: 10 !important;
  .swiper-pagination-bullet {
    background: gray !important;
  }
}
</style>
