<template>
  <ion-page>
    <Header back :title="$t('PRODUCT-TITLE')" />
    <Loading v-if="loading" />
    <Content v-if="!loading">
      <ion-list class="container">
        <ion-row class="ion-margin wrapper" style="position: relative">
          <div class="discount" v-if="categorie.discount">
            <p class="discount-text">{{ `-${categorie.discount}%` }}</p>
          </div>
          <swiper
            ref="swiper"
            :options="slideOpts"
            :modules="modules"
            :pagination="true"
            :autoplay="true"
            class="swiper"
          >
            <swiper-slide v-for="(image, index) in categorie.image" :key="index">
              <img :src="image.url" class="image" />
            </swiper-slide>
          </swiper>
        </ion-row>
        <ion-row class="ion-margin">
          <ion-row class="row">
            <ion-label class="title">{{ categorie.title }}</ion-label>
          </ion-row>
          <ion-row class="ion-margin-top row">
            <ion-label class="price">от {{ discountPrice }} ₽</ion-label>
            <ion-label v-if="categorie.discount" class="ion-margin-start old-price"
              >{{ categorie.price }} ₽
            </ion-label>
          </ion-row>
        </ion-row>
        <ion-row class="ion-justify-content-between">
          <ion-label
            :class="['text', { active: specification }, 'ion-margin']"
            @click="
              () => {
                specification = true;
                description = false;
                delivery = false;
              }
            "
            >{{ $t("CHARACTERISTICS") }}
          </ion-label>
          <ion-label
            :class="['text', { active: description }, 'ion-margin']"
            @click="
              () => {
                specification = false;
                description = true;
                delivery = false;
              }
            "
            >{{ $t("DESCRIPTION") }}
          </ion-label>
          <ion-label
            :class="['text', { active: delivery }, 'ion-margin']"
            @click="
              () => {
                specification = false;
                description = false;
                delivery = true;
              }
            "
            >{{ $t("DELIVERY") }}
          </ion-label>
        </ion-row>
        <ion-row>
          <Specification
            v-if="specification"
            :manufacturer="categorie.manufacturer"
            :type="categorie.type"
            :brand="categorie.brand"
            :period="categorie.period"
            :material="categorie.material"
          />
          <Description v-if="description" :text="categorie.description" />
          <Delivery v-if="delivery" :text="categorie.delivery" />
        </ion-row>

        <ion-row class="ion-justify-content-center">
          <Button
            :title="$t('ADD-TO-CART')"
            class="custom-btn"
            @click="addInCart(categorie)"
          />
        </ion-row>
      </ion-list>
    </Content>
  </ion-page>
</template>

<script lang="js">
import {defineComponent} from 'vue';
import {IonPage, IonRow, IonList, IonLabel} from '@ionic/vue';
import {Swiper, SwiperSlide} from 'swiper/vue';
import {
  Controller,
  Pagination,
  Autoplay,
  Keyboard,
  Scrollbar,
  Zoom,
} from 'swiper';
import {IonicSlides} from '@ionic/vue';
import Header from '@/components/ui/Header.vue';
import Specification from '@/components/Specification.vue';
import Description from '@/components/Description.vue';
import Delivery from '@/components/Delivery.vue';
import Button from "@/components/ui/Button.vue";
import { mapGetters} from "vuex";


import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/keyboard';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/zoom';
import '@ionic/vue/css/ionic-swiper.css';
import Loading from "@/components/ui/Loading.vue";
import {discountPrice} from "@/helpers/discountPrice";
import Content from '@/components/ui/Content.vue';



export default defineComponent({
  name: 'Product',
  props: {
    id: {
      type: String,
      default: null,
    },
  },
  components: {
    Loading,
    Button,
    Header,
    IonPage,
    IonRow,
    IonList,
    Swiper,
    SwiperSlide,
    IonLabel,
    Specification,
    Description,
    Delivery,
    Content
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
      specification: true,
      description: false,
      delivery: false,
      categorie: [],
      loading: false
    };
  },
  async mounted() {
    this.loading = true
    this.categorie = await this.categories.find((el) => el.id == this.id)
    this.loading = false
  },
  computed: {
    ...mapGetters(['categories']),
    discountPrice() {
      return this.categorie.discount
          ? discountPrice(this.categorie.price, this.categorie.discount)
          : this.categorie.price;
    },
  },
  methods: {
    addInCart(categorie) {
      this.$router.push({name: 'Params', params: {id: categorie.id}})
    }
  },
});
</script>

<style scoped lang="scss">
.container {
  height: 100%;
  overflow-y: auto;

  .wrapper {
    .discount {
      width: 40px;
      height: 21px;
      background: #c90433;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      right: 26px;
      top: 15px;
      z-index: 99999;

      .discount-text {
        font-weight: 600;
        font-size: 12px;
        line-height: 15px;
        text-align: center;
        color: #ffffff;
      }
    }

    .swiper {
      .image {
        width: 100%;
      }
    }
  }

  .row {
    width: 100%;

    .title {
      font-size: 14px;
    }

    .price {
      font-weight: 600;
      font-size: 14px;
      line-height: 17px;
    }

    .old-price {
      font-weight: 400;
      font-size: 12px;
      line-height: 15px;
      text-decoration-line: line-through;
      color: #969696;
    }
  }

  .text {
    font-size: 14px;
    line-height: 130%;
  }

  .active {
    font-weight: 500;
    font-size: 14px;
    line-height: 130%;
    color: #005944;
    text-decoration: underline;
    text-underline-offset: 7px;
  }

  .custom-btn {
    margin-bottom: 40px;
  }
}

.swiper-pagination {
  bottom: 0 !important;
  .swiper-pagination-bullet {
    background: gray !important;
  }
}

.swiper-horizontal > .swiper-pagination-bullets {
  bottom: 0 !important;
}
</style>
