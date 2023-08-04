<template>
  <ion-page id="pickup">
    <Header :title="$t('CHECKOUT')" back />
    <Loading v-if="loading" />
    <ion-content v-if="!loading">
      <ion-row class="ion-padding-top ion-padding-start ion-padding-end">
        <Segment
          :title-left="$t('PICKUP')"
          :title-right="$t('COURIER')"
          @change="handlerSegment($event)"
          :disabled="handlerAmountDiscount"
          :value="this.handler"
        />
      </ion-row>
      <Address :title="$t('PICKUP-ADDRESS')" v-if="handler === 'left'" />

      <ion-card class="delivery" v-if="handler === 'right'">
        <ion-card-content class="content">
          <ion-row class="ion-align-items-center">
            <ion-icon
              icon="assets/icon/delivery.svg"
              class="ion-margin-end icon"
            />
            <ion-label class="title">{{ $t('DELIVERY-ADDRESS') }}</ion-label>
          </ion-row>

          <ItemInput lines :error="errorFields.street">
            <ion-input
              v-model="address.street"
              label-placement="floating"
              :label="$t('STREET-HOUSE-REQUIRED')"
            ></ion-input>
          </ItemInput>

          <ion-row class="ion-nowrap">
            <ItemInput lines>
              <ion-input
                v-model="address.apartment"
                label-placement="floating"
                :label="$t('APARTMENT')"
                type="tel"
              ></ion-input>
            </ItemInput>
            <ItemInput lines class="ion-margin-start">
              <ion-input
                v-model="address.entrance"
                label-placement="floating"
                :label="$t('ENTRANCE')"
                type="tel"
              ></ion-input>
            </ItemInput>
            <ItemInput lines class="ion-margin-start">
              <ion-input
                v-model="address.floor"
                label-placement="floating"
                :label="$t('FLOOR')"
                type="tel"
              ></ion-input>
            </ItemInput>
          </ion-row>

          <ItemInput lines>
            <ion-input
              v-model="address.comment"
              label-placement="floating"
              :label="$t('COMMENT-COURIER')"
            ></ion-input>
          </ItemInput>

          <ItemInput lines="none" class="ion-margin-top">
            <ion-checkbox
              v-model="address.rememberAddress"
              labelPlacement="end"
              justify="start"
            >
              <ion-label class="checkbox-title">{{
                $t('REMEMBER-ADDRESS')
              }}</ion-label>
            </ion-checkbox>
          </ItemInput>
        </ion-card-content>
      </ion-card>

      <CardInfo
        :title="$t('DATE-RECEIVING')"
        :icon="handlerIconCalendar"
        description="16 октября - ориентировочная дата получения. Мы дополнительно сообщим вам о доставке."
      />

      <CardInfo
        :title="$t('PAYMENT')"
        :icon="handlerIconPayment"
        :description="$t('PAYMENT-DESCRIPTION')"
      />

      <ion-list class="contact-form">
        <ion-row class="ion-margin-top ion-margin-start">
          <ion-label class="title">{{ $t('CONTACT-DETAILS') }}</ion-label>
        </ion-row>
        <ItemInput lines :error="errorFields.firstname">
          <ion-input
            v-model="fields.firstname"
            :error="errorFields.firstname"
            label-placement="floating"
            :label="$t('FIRSTNAME-REQUIRED')"
            required
          ></ion-input>
        </ItemInput>

        <ItemInput lines :error="errorFields.lastname">
          <ion-input
            v-model="fields.lastname"
            label-placement="floating"
            :label="$t('LASTNAME-REQUIRED')"
            required
          ></ion-input>
        </ItemInput>

        <ItemInput lines :error="errorFields.patronymic">
          <ion-input
            v-model="fields.patronymic"
            label-placement="floating"
            :label="$t('PATRONYMIC-REQUIRED')"
            required
          ></ion-input>
        </ItemInput>

        <ItemInput lines id="click-trigger" class="ion-align-items-end">
          <ion-input
            :value="formatDate(fields.birthday)"
            label-placement="floating"
            :label="$t('DATE-BIRTH')"
          ></ion-input>
          <ion-icon
            icon="assets/icon/calendar-courier.svg"
            class="icon-calendar"
          />
        </ItemInput>
        <ItemDate v-model="fields.birthday" />

        <ItemInput lines :error="errorFields.email">
          <ion-input
            v-model="fields.email"
            type="email"
            label-placement="floating"
            :label="$t('EMAIL')"
          ></ion-input>
        </ItemInput>
        <Button
          :title="$t('CHECKOUT-ORDER')"
          class="button-checkout"
          @click="send"
        />

        <ion-row class="ion-margin">
          <ion-text class="text"
            >{{ $t('AGREEMENT-TEXT') }}
            <a href="#">{{ $t('PERSONAL-DATA') }}</a></ion-text
          >
        </ion-row>
        <ion-row class="ion-margin ion-padding-bottom">
          <ion-text class="text">{{ $t('REQUIRED-TEXT') }} </ion-text>
        </ion-row>
      </ion-list>
    </ion-content>
    <Popover :button-ok="$t('OK')" @handler="closePopover" />
  </ion-page>
</template>

<script lang="js">
import {
  IonPage,
  IonContent,
  IonRow,
  IonList,
  IonCard,
  IonCardContent,
  IonIcon,
  IonLabel,
  IonInput,
  IonCheckbox,
  IonText,
} from '@ionic/vue';
import {mapActions, mapGetters, mapMutations} from 'vuex';
import Header from '@/components/ui/Header.vue';
import Segment from '@/components/ui/Segment.vue';
import Address from '@/components/Address.vue';
import CardInfo from '@/components/CardInfo.vue';
import Button from '@/components/ui/Button.vue';
import ItemInput from "@/components/ui/ItemInput.vue";
import Popover from "@/components/ui/Popover.vue";
import Loading from "@/components/ui/Loading.vue";
import ItemDate from "@/components/ui/ItemDate.vue";
import {checkFields, clearFields, checkFieldsAddress} from "@/helpers/from";
import {sendOrderDetails, sendOrder} from "@/api/order";
import {updateAddress} from "@/api/address";
import {formatDate} from "@/helpers/formatter";


export default {
  name: 'Pickup',
  components: {
    ItemDate,
    ItemInput,
    Popover,
    Button,
    CardInfo,
    Address,
    Segment,
    Header,
    IonPage,
    IonContent,
    IonRow,
    IonList,
    IonCard,
    IonCardContent,
    IonIcon,
    IonLabel,
    IonInput,
    IonCheckbox,
    IonText,
    Loading
  },
  mounted() {
    this.fields.firstname = this.handlerUser.firstname;
    this.fields.lastname = this.handlerUser.lastname;
    this.fields.patronymic = this.handlerUser.patronymic;
    this.fields.birthday = this.handlerUser.birthday;
    this.fields.email = this.handlerUser.email;
    this.SET_BASKET_USER(this.handlerUser.id);
  },
  data() {
    return {
      handler: 'left',
      loading: false,
      address: {
        id: '',
        street: '',
        apartment: '',
        entrance: '',
        floor: '',
        comment: '',
        rememberAddress: false,
      },
      fields: {
        firstname: null,
        lastname: null,
        patronymic: null,
        birthday: null,
        email: null,
      },
      errorFields: {},
      requiredFields: ['firstname', 'lastname', 'patronymic'],
      requiredFieldsAddress: ['street']
    };
  },
  computed: {
    ...mapGetters(['user', 'basket']),
    handlerIconCalendar() {
      return this.handler === 'left'
          ? 'assets/icon/calendar-pickup.svg'
          : 'assets/icon/calendar-courier.svg';
    },
    handlerIconPayment() {
      return this.handler === 'left'
          ? 'assets/icon/payment-pickup.svg'
          : 'assets/icon/payment-courier.svg';
    },
    handlerAmountDiscount() {
      return this.basket.total_discount < 2000
    },
    handlerUser() {
      return this.user
    }
  },
  watch: {
    async created() {
      this.emptyFields = {...this.fields};
    },
  },
  methods: {
    checkFields,
    clearFields,
    checkFieldsAddress,
    formatDate,
    ...mapMutations(['SET_POPOVER', 'SET_USER', 'SET_BASKET_USER', 'SET_BASKET', 'SET_ORDER']),
    ...mapActions(['updateUser', 'saveAddress', 'getAddress']),
    created() {
      this.emptyFields = {...this.fields};
    },
    validateEmail() {
      if (
          // eslint-disable-next-line
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.fields.email)
      ) {
        this.errorFields.email = '';
      } else {
        this.errorFields.email = this.$t('INCORRECT-EMAIL');
      }
    },
    async handlerAddress() {
      this.loading = true
      this.getAddress({
        type: 'user',
        id: this.user.id
      }).then((address) => {
        address.map(({id, attributes}) => {
          this.id = id
          this.address.street = attributes.street
          this.address.apartment = attributes.apartment;
          this.address.entrance = attributes.entrance;
          this.address.floor = attributes.floor
        })
        this.loading = false
      }).catch((e) => {
        this.loading = false
        console.error(e)
      })
    },
    async send() {
      this.loading = true
      if (this.handler === 'left' && !this.checkFields()) {
        const user = {...this.handlerUser}
        user.firstname = this.fields.firstname
        user.lastname = this.fields.lastname
        user.patronymic = this.fields.patronymic
        user.birthday = this.fields.birthday
        user.email = this.fields.email

        this.SET_USER(user)
        await this.updateUser(user)
        await sendOrderDetails(this.basket.order_product_details).then((data) => {
          sendOrder({
            order_details: data,
            order: this.basket,
          }).then(({data}) => {
            this.SET_ORDER(data.id)
            this.$router.replace({name: 'Order'})
            this.clearBasket()
            this.loading = false
          }).catch((e) => {
            this.loading = false
            console.error(e)
          })
        }).catch((e) => {
          console.error(e)
        })
      }
      if (this.handler === 'right' && !this.checkFields() && !this.checkFieldsAddress()) {
        const user = {...this.handlerUser}
        user.firstname = this.fields.firstname
        user.lastname = this.fields.lastname
        user.patronymic = this.fields.patronymic
        user.birthday = this.fields.birthday
        user.email = this.fields.email

        this.SET_USER(user)
        await this.updateUser(user)
        await sendOrderDetails(this.basket.order_product_details).then((data) => {
          sendOrder({
            order_details: data,
            order: this.basket,
          }).then(({data}) => {
            this.SET_ORDER(data.id)
            const params = {
              type: 'order',
              street: this.address.street,
              apartment: this.address.apartment,
              entrance: this.address.entrance,
              floor: this.address.floor,
              order: data.id
            }
            this.saveAddress(params)
            if (this.address.rememberAddress) {
              if (!this.id) {
                const params = {
                  type: 'user',
                  street: this.address.street,
                  apartment: this.address.apartment,
                  entrance: this.address.entrance,
                  floor: this.address.floor,
                  user: this.handlerUser.id
                }
                this.saveAddress(params)
              }
              if (this.id) {
                const params = {
                  id: this.id,
                  street: this.address.street,
                  apartment: this.address.apartment,
                  entrance: this.address.entrance,
                  floor: this.address.floor,
                  user: this.handlerUser.id
                }
                updateAddress(params)
              }
            }
            this.$router.replace({name: 'Order'})
            this.clearBasket()
            this.loading = false
          }).catch((e) => {
            console.error(e)
          })
        }).catch((e) => {
          console.error(e)
        })
      }
    },
    clearBasket() {
      this.SET_BASKET({
        order_product_details: [],
        count: 0,
        total_amount: 0,
        total_discount: 0,
        user: 0,
      })
      this.clearFields();
    },
    async handlerSegment(event) {

      if (event === 'right' && this.handlerAmountDiscount) {
        this.SET_POPOVER({
          show: true,
          message: [
            this.$t('PICKUP-MESSAGE')
          ],
        });
      } else {
        this.handler = event
        if (this.handler === 'right') {
          await this.handlerAddress()
        }
      }
    },
    closePopover() {
      this.SET_POPOVER({
        show: false,
        message: [],
      });
    },
  },

};
</script>

<style lang="scss">
#pickup {
  .delivery {
    ion-item {
      --padding-start: 0;
    }

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

    .checkbox-title {
      font-weight: 400;
      font-size: 12px;
      line-height: 15px;
      color: #000000;
    }

    ion-checkbox {
      --border-radius: 5px !important;
    }
  }

  .contact-form {
    .title {
      font-weight: 600;
      font-size: 14px;
      line-height: 17px;
      color: #000000;
    }
    .icon-calendar {
      margin-bottom: 4px;
    }

    input {
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: #000000;
    }
  }

  .button-checkout {
    margin: 0 2px 0 8px;
  }

  .text {
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: #6f6f6f;

    a {
      color: #097ac6;
      text-decoration: none;
    }
  }
}
</style>
