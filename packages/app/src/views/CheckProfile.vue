<template>
  <ion-page id="check-profile">
    <Header :title="$t('DATA-CHECKING')" />
    <ion-content class="container">
      <ion-list class="ion-margin-end">
        <ion-item lines="none">
          <ion-label class="title">{{ $t('CONTACT-DETAILS') }}</ion-label>
        </ion-item>
        <ion-item class="input-wrp">
          <input
            placeholder=" "
            id="phone"
            v-model="fields.phone"
            v-maska="{
              mask: '+7 (###) ###-##-##',
            }"
            class="input"
            @keyup="changePhone"
            @focus="fields.phone === '' ? (fields.phone = '+7 (') : null"
          />
          <span position="floating" class="label floating-label" for="phone"
            >{{ $t('PHONE-NUMBER') }}*
          </span>
        </ion-item>

        <ItemInput :error="errorFields.firstname">
          <ion-input
            v-model="fields.firstname"
            label-placement="floating"
            :label="$t('FIRSTNAME-REQUIRED')"
          ></ion-input>
        </ItemInput>

        <ItemInput lines :error="errorFields.lastname">
          <ion-input
            v-model="fields.lastname"
            label-placement="floating"
            :label="$t('LASTNAME-REQUIRED')"
          ></ion-input>
        </ItemInput>

        <ItemInput lines :error="errorFields.patronymic">
          <ion-input
            v-model="fields.patronymic"
            label-placement="floating"
            :label="$t('PATRONYMIC-REQUIRED')"
          ></ion-input>
        </ItemInput>

        <ItemInput lines id="click-trigger" class="ion-align-items-end">
          <ion-input
            :value="formatDate(fields.birthday, 'DD.MM.YYYY')"
            disabled
            label-placement="floating"
            :label="$t('DATE-BIRTH')"
          ></ion-input>
          <ion-icon icon="assets/icon/calendar-courier.svg" class="icon" />
        </ItemInput>
      </ion-list>

      <Button :title="$t('SAVE')" class="button" :disabled="disabled" />
      <ion-row>
        <ion-label class="ion-margin label data-text"
          >{{ $t('AGREEMENT-TEXT') }}
          <a href="#">{{ $t('PERSONAL-DATA') }}</a></ion-label
        >
      </ion-row>
      <ion-row>
        <ion-label class="ion-margin label note"
          >{{ $t('REQUIRED-TEXT') }}
        </ion-label>
      </ion-row>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonRow,
} from '@ionic/vue';
import Header from '@/components/ui/Header.vue';
import { mapGetters } from 'vuex';
import Button from '@/components/ui/Button.vue';

export default defineComponent({
  name: 'CheckProfile',
  components: {
    Button,
    Header,
    IonPage,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonRow,
  },
  data() {
    return {
      fields: {
        phone: '',
        firstname: '',
        lastname: '',
        patronymic: '',
        birthday: '',
      },
      disabled: true,
      errorFields: {},
      requiredFields: ['phone', 'firstname', 'lastname', 'patronymic'],
    };
  },
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    changePhone() {
      this.fields.phone.length === 18
        ? (this.disabled = false)
        : (this.disabled = true);
    },
  },
  mounted() {
    this.fields = {
      phone: this.user.phone,
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      patronymic: this.user.patronymic,
      birthday: this.user.birthday,
    };
  },
});
</script>

<style scoped lang="scss">
#check-profile {
  .container {
    --background: #ffffff;

    .title {
      font-weight: 600;
      font-size: 14px;
      line-height: 17px;
    }

    .label {
      font-weight: 400;
      font-size: 12px;
      line-height: 15px;
      color: #bbbbbb;
    }

    .data-text {
      font-size: 10px;
      margin-top: 0;

      a {
        color: #097ac6;
        text-decoration: none;
      }
    }

    .input {
      border: none;
      width: 100%;
    }

    .input:focus {
      outline: none;
    }

    .note {
      font-size: 10px;
      margin-top: 0;
    }

    .button {
      margin: 0 10px;
    }

    .input-wrp {
      --min-height: 68px;
      align-items: end;
    }

    .input-wrp .input {
      width: 100%;
      outline: none;
      border: none;
      box-shadow: none !important;
      background-color: transparent;
      height: 34px;
      padding-bottom: 8px;
    }

    .input-wrp .floating-label {
      position: absolute;
      pointer-events: none;
      transition: 0.3s ease all;
      padding-bottom: 8px;
    }

    .input-wrp input:not(:placeholder-shown) ~ .floating-label,
    .input-wrp input:focus ~ .floating-label {
      bottom: 50%;
      left: 0;
      font-size: 10px;
      opacity: 1;
    }
  }
}
</style>
