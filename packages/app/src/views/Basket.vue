<template>
  <ion-page id="basket">
    <Header :title="$t('BASKET')" />
    <Info
      v-if="!order_product_details.length"
      :title="$t('BASKET-EMPTY')"
      :description="$t('BASKET-EMPTY-DESCRIPTION')"
      icon="assets/icon/empty-basket.svg"
    />
    <Content
      scroll
      v-if="order_product_details.length"
      :style="
        !order_product_details.length
          ? { background: '#ffffff' }
          : { '--background': '#ecebeb' }
      "
    >
      <ion-row class="ion-justify-content-end ion-margin">
        <ion-buttons>
          <ion-button class="clear-button" @click="presentAlert">
            <ion-icon icon="assets/icon/clear-basket.svg" class="icon" />
            <span>{{ $t('EMPTY-BASKET') }}</span>
          </ion-button>
        </ion-buttons>
      </ion-row>

      <ion-row
        class="ion-margin-top wrapper"
        v-for="(order, index) in orders"
        :key="order.id"
      >
        <ion-card class="card">
          <ion-card-content class="card-content">
            <ion-row>
              <ion-col style="flex: 1">
                <img :src="order.image[0].url" />
              </ion-col>
              <ion-col class="ion-margin-start" style="flex: 2">
                <ion-row>
                  <ion-label class="title">{{ `${order.title}` }} </ion-label>
                </ion-row>
                <ion-row class="ion-margin-top">
                  <ion-label class="label"
                    >{{ $t('SPHERE') }}
                    <span class="text">{{
                      order.sphere.title
                    }}</span></ion-label
                  >
                  <ion-label class="ion-margin-start label"
                    >{{ $t('RADIUS') }}
                    <span class="text">{{
                      order.radius.title
                    }}</span></ion-label
                  >
                </ion-row>
                <ion-row class="ion-margin-top row-price">
                  <ion-label class="price">{{ `${order.price} ₽` }}</ion-label>
                  <div class="box ion-margin-start">
                    <ion-button
                      size="small"
                      class="button"
                      @click="countMinus(index, order.product_count)"
                    >
                      <ion-icon :icon="minus" class="icon"></ion-icon>
                    </ion-button>
                    <ion-label>{{ `${order.product_count}` }}</ion-label>
                    <ion-button
                      size="small"
                      class="button"
                      @click="countPlus(index)"
                    >
                      <ion-icon :icon="plus" class="icon"></ion-icon>
                    </ion-button>
                  </div>
                </ion-row>
              </ion-col>
            </ion-row>
          </ion-card-content>
        </ion-card>
      </ion-row>
      <ion-row class="basket-info-wrapper">
        <ion-card class="basket-info-card">
          <ion-card-content class="basket-info-card-content">
            <ion-row class="ion-align-items-center">
              <ion-icon icon="assets/icon/purchases.svg" class="icon" />
              <ion-label class="title">{{ $t('YOUR-PURCHASES') }}</ion-label>
            </ion-row>
            <ion-row class="ion-margin-top">
              <ion-label class="text"
                >{{ $t('TOTAL-GOODS') }}:
                <span class="value">{{ basket_count }}</span></ion-label
              >
            </ion-row>
            <ion-row style="margin-top: 8px">
              <ion-label class="text"
                >{{ $t('TOTAL-PAYABLE') }}:
                <span class="value">{{ `${total_discount} ₽` }}</span>
                <span class="discount" v-if="total_discount !== total_amount">{{
                  `${total_amount} ₽`
                }}</span>
              </ion-label>
            </ion-row>
          </ion-card-content>
        </ion-card>
      </ion-row>
      <Button
        :title="$t('TO-ORDER')"
        @click.prevent="toOrder"
        class="order-button"
      />
    </Content>
    <Content v-if="!order_product_details.length">
      <ion-grid :fixed="true" class="button-container">
        <ion-row class="ion-align-items-end ion-justify-content-between">
          <ion-col class="align-self-end">
            <Button
              :title="$t('TO-CATALOG')"
              @click="$router.push({ path: PATH_CATALOG })"
              class="catalog-button"
            />
          </ion-col>
        </ion-row>
      </ion-grid>
    </Content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import {
  IonPage,
  IonCard,
  IonRow,
  IonCardContent,
  IonCol,
  IonLabel,
  IonIcon,
  IonButton,
  IonButtons,
  alertController,
  IonGrid,
} from '@ionic/vue';
import { mapGetters, mapMutations } from 'vuex';
import { addOutline, removeOutline } from 'ionicons/icons';
import Header from '@/components/ui/Header.vue';
import Info from '@/components/ui/Info.vue';
import Button from '@/components/ui/Button.vue';
import Content from '@/components/ui/Content.vue';
import { PATH_CATALOG } from '@/router/constants';

export default defineComponent({
  name: 'Basket',
  components: {
    Button,
    Info,
    Header,
    IonPage,
    IonCard,
    IonRow,
    IonCardContent,
    IonCol,
    IonLabel,
    IonIcon,
    IonButton,
    IonButtons,
    Content,
    IonGrid,
  },
  data() {
    return {
      PATH_CATALOG,
      plus: addOutline,
      minus: removeOutline,
    };
  },
  watch: {
    order_product_details(newVal, oldVal) {
      console.log(newVal, oldVal);
      if (newVal.length !== newVal.length) {
        this.SET_BASKET_COUNT();
        this.SET_TOTAL_AMOUNT();
        this.SET_TOTAL_DISCOUNT();
      }
    },
  },
  computed: {
    ...mapGetters([
      'order_product_details',
      'basket_count',
      'total_amount',
      'total_discount',
      'products',
      'token',
    ]),
    orders() {
      return this.order_product_details.map((el) => {
        const prods = this.products.find((product) => {
          if (el.product === product.id) {
            return product;
          }
        });
        const a = prods.sphere.find((sph) => sph.id === el.sphere);
        const b = prods.radius.find((rad) => rad.id === el.radius);

        const prod = {
          ...prods,
          sphere: a,
          radius: b,
          product_count: el.product_count,
        };
        return prod;
      });
    },
  },
  methods: {
    ...mapMutations([
      'SET_TOTAL_AMOUNT',
      'SET_TOTAL_DISCOUNT',
      'SET_BASKET',
      'SET_ORDER_PRODUCT_DETAILS_FULL',
      'SET_BASKET_COUNT',
      'SET_POPOVER',
    ]),

    toOrder() {
      if (!this.token) {
        this.$router.push({ name: 'Auth', params: { redirect: 'Pickup' } });
      } else {
        this.$router.push({ name: 'Pickup' });
      }
    },
    changeBasket() {
      this.SET_ORDER_PRODUCT_DETAILS_FULL([]);
      this.SET_BASKET_COUNT();
    },
    async presentAlert() {
      const alert = await alertController.create({
        header: this.$t('REMOVE-BASKET'),
        message: this.$t('EMPTY-BASKET-TEXT'),
        buttons: [
          {
            text: this.$t('CANCEL'),
            role: 'cancel',
            handler: () => {
              console.log('cancel');
            },
          },
          {
            text: this.$t('OK'),
            role: 'confirm',
            handler: () => {
              console.log('ok');
              this.changeBasket();
            },
          },
        ],
      });

      await alert.present();
      await alert.onDidDismiss();
    },
    countMinus(idx, count) {
      console.log(idx);
      const orders = this.order_product_details.map((element, index) => {
        if (idx === index) {
          const product_amount = element.product_amount / element.product_count;
          const product_discount =
            element.product_discount / element.product_count;
          if (element.product_count >= 1) {
            element.product_count--;
          }

          element.product_amount = product_amount * element.product_count;
          element.product_discount = product_discount * element.product_count;
        }
        return element;
      });

      if (count <= 1) {
        orders.splice(idx, 1);
      }

      console.log(orders);
      this.SET_ORDER_PRODUCT_DETAILS_FULL(orders);
      this.SET_BASKET_COUNT();
      this.SET_TOTAL_AMOUNT();
      this.SET_TOTAL_DISCOUNT();
    },
    countPlus(idx) {
      const orders = this.order_product_details.map((element, index) => {
        if (idx === index) {
          const product_amount = element.product_amount / element.product_count;
          const product_discount =
            element.product_discount / element.product_count;
          if (element.product_count >= 1) {
            element.product_count++;
          }

          element.product_amount = product_amount * element.product_count;
          element.product_discount = product_discount * element.product_count;
        }
        return element;
      });
      this.SET_ORDER_PRODUCT_DETAILS_FULL(orders);
      this.SET_BASKET_COUNT();
      this.SET_TOTAL_AMOUNT();
      this.SET_TOTAL_DISCOUNT();
    },
  },
  mounted() {
    setTimeout(() => {
      this.SET_BASKET_COUNT();
      this.SET_TOTAL_AMOUNT();
      this.SET_TOTAL_DISCOUNT();
    }, 1000);
  },
});
</script>

<style lang="scss">
#basket {
  ion-content {
    --background: #ffffff;
  }

  .clear-button {
    color: #097ac6;
    font-weight: 400;
    font-size: 12px;
    line-height: 130%;

    .icon {
      width: 13px;
      margin-right: 6px;
    }
  }

  .button-container {
    bottom: 0;
    position: absolute;
  }

  .order-button {
    margin: 0 8px;
  }

  .catalog-button {
    background: #ffffff;
  }

  .wrapper {
    .card {
      width: 100%;
      margin-bottom: 0;

      .card-content {
        padding: 12px;

        .label {
          font-weight: 400;
          font-size: 12px;
          line-height: 130%;
          color: #6f6f6f;

          .text {
            font-weight: 400;
            font-size: 12px;
            line-height: 130%;
            color: #1f1f1f;
          }
        }

        .title {
          font-weight: 400;
          font-size: 14px;
          line-height: 135%;
          color: #000000;
        }

        .row-price {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .price {
            font-weight: 500;
            font-size: 14px;
            line-height: 17px;
            color: #000000;
          }

          .box {
            border: 1px solid #4dac97;
            border-radius: 2px;
            width: 84px;
            height: 32px;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
          }

          .button {
            --background: none;
            color: #1e2023;
            --background-activated: none;

            &::part(native) {
              padding: 7px 9px 7px 9px;
            }

            .icon {
              color: #005944;
            }
          }

          .button:hover {
            --background: none;
          }
        }
      }
    }
  }

  .basket-info-wrapper {
    .basket-info-card {
      width: 100%;

      .basket-info-card-content {
        background: rgba(77, 172, 151, 0.21);
        border-radius: 5px;

        .icon {
          width: 24px;
          height: 24px;
        }

        .title {
          font-weight: 600;
          font-size: 14px;
          line-height: 17px;
          color: #000000;
          margin-left: 5px;
        }

        .text {
          font-weight: 400;
          font-size: 14px;
          line-height: 130%;
          color: #5e5e5e;

          .value {
            font-weight: 600;
            font-size: 14px;
            line-height: 130%;
            color: #000000;
          }

          .discount {
            font-weight: 400;
            font-size: 14px;
            line-height: 17px;
            text-decoration-line: line-through;
            color: #969696;
            margin-left: 10px;
          }
        }
      }
    }
  }
}
</style>
