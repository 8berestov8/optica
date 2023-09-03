<template>
  <ion-page>
    <Header :title="$t('AUTH')" back />
    <ion-content :scroll-y="false" id="auth">
      <ion-list class="list">
        <ion-row class="ion-margin-start ion-margin-end ion-margin-top">
          <ion-label class="text">{{ $t('AUTH-TITLE-EMAIL') }}</ion-label>
        </ion-row>
        <ion-row>
          <ion-item class="input-item">
            <input
              for="email"
              type="email"
              ref="email"
              class="input"
              required
              v-model="email"
              @change="handlerEmail($event.target.value)"
            />
          </ion-item>
          <ion-label class="ion-margin-start data-text" v-if="!msgEmail"
            >Поле обязательно для заполнения*</ion-label
          >
          <ion-label
            class="required ion-margin-start ion-margin-end"
            v-if="msgEmail"
            >Введите правельный емайл</ion-label
          >
        </ion-row>

        <div class="ion-margin"></div>
        <div class="ion-margin"></div>

        <ion-row
          class="ion-margin-start ion-margin-end"
          style="margin-top: 50px"
        >
          <ion-label class="text">{{ $t('AUTH-TITLE-PHONE') }}</ion-label>
        </ion-row>
        <ion-row>
          <ion-item class="input-item">
            <input
              inputmode="tel"
              ref="phone"
              class="input"
              v-model="phone"
              v-maska="{
                mask: '+7 (###) ###-##-##',
              }"
              @change="handlerPhone"
              @focus="phone === '' ? (phone = '+7 (') : null"
            />
          </ion-item>
          <ion-label class="ion-margin-start data-text" v-if="!msgPhone"
            >Поле обязательно для заполнения*</ion-label
          >
          <ion-label
            class="required ion-margin-start ion-margin-end"
            v-if="msgPhone"
            >Введите правельный номер телефона</ion-label
          >
        </ion-row>

        <ion-row class="row">
          <Button
            :title="$t('GET-THE-CODE')"
            :disabled="disabled"
            class="button-code"
            @click="send"
          />
          <ion-label class="ion-margin-start ion-margin-end data-text"
            >{{ $t('AGREEMENT-TEXT') }}
            <a href="#">{{ $t('PERSONAL-DATA') }}</a>
          </ion-label>
        </ion-row>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import {
  IonPage,
  IonContent,
  IonList,
  IonRow,
  IonLabel,
  IonItem,
} from '@ionic/vue';
import Header from '@/components/ui/Header.vue';
import Button from '@/components/ui/Button.vue';
import { mapActions } from 'vuex';

export default defineComponent({
  name: 'Auth',
  components: {
    Button,
    Header,
    IonPage,
    IonContent,
    IonList,
    IonRow,
    IonLabel,
    IonItem,
  },
  data() {
    return {
      phone: process.env.NODE_ENV === 'development' ? '77778888888' : '',
      email: '',
      msgEmail: false,
      msgPhone: false,
    };
  },
  computed: {
    redirect() {
      return this.$route.params.redirect;
    },
    disabled() {
      return !this.msgEmail && !this.msgPhone ? false : true;
    },
  },
  methods: {
    ...mapActions(['sendPhone']),
    handlerPhone() {
      this.phone.length === 18
        ? (this.msgPhone = false)
        : (this.msgPhone = true);
    },
    handlerEmail(email) {
      if (
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          email
        )
      ) {
        this.msgEmail = false;
      } else {
        this.msgEmail = true;
      }
    },
    setFocus() {
      this.$refs.email.focus();
    },
    send() {
      const phone = this.phone.replace(/[^0-9,.]/g, '');

      this.sendPhone({ phone, email: this.email });

      this.$router.replace({
        name: 'CheckSms',
        params: { redirect: this.redirect },
      });

      localStorage.setItem('phone', phone);
      localStorage.setItem('email', this.email);
    },
  },
  mounted() {
    setTimeout(() => {
      this.$nextTick(() => this.setFocus());
    }, 1000);
  },
});
</script>

<style scoped lang="scss">
#auth {
  .list {
    height: 100%;

    .text {
      font-weight: 500;
      font-size: 14px;
      line-height: 130%;
    }
  }
  .required {
    color: red;
  }

  .input-item {
    width: 94%;

    .input {
      border: none;
      width: 100%;
      background: none;
    }

    .input:focus {
      outline: none;
    }
  }

  .row {
    position: absolute;
    bottom: 30px;
    justify-content: center;
    width: 100%;
    display: flex;

    .button-code {
      width: 100%;
      margin: 0 5px;
    }
  }
  .data-text {
    font-weight: 400;
    font-size: 12px;
    line-height: 130%;
    color: #6f6f6f;

    a {
      color: #097ac6;
      text-decoration: none;
    }
  }
}
</style>
