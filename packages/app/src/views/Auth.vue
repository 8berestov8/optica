<template>
  <ion-page>
    <Header :title="$t('AUTH')" back/>
    <ion-content :scroll-y="false" id="auth">
      <ion-list class="list">
        <ion-row class="ion-margin">
          <ion-label class="text">{{ $t('AUTH-TITLE') }}</ion-label>
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
                @keyup="handlerPhone"
                @focus="phone === '' ? (phone = '+7 (') : null"
            />
          </ion-item>
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
import {defineComponent} from 'vue';
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
import {mapActions} from 'vuex';

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
      phone: process.env.NODE_ENV === 'development' ? '77778888888': '',
      disabled: true,
    };
  },
  computed: {
    redirect() {
      return this.$route.params.redirect;
    },
  },
  methods: {
    ...mapActions(['sendPhone']),
    handlerPhone() {
      this.phone.length === 18
          ? (this.disabled = false)
          : (this.disabled = true);
    },
    setFocus() {
      this.$refs.phone.focus();
    },
    send() {
      const phone = this.phone.replace(/[^0-9,.]/g, '');
      this.sendPhone({phone});

      this.$router.replace({
        name: 'CheckSms',
        params: {redirect: this.redirect},
      });

      localStorage.setItem('phone', phone);
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
}
</style>
