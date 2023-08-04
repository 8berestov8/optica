<template>
  <ion-page id="check-data">
    <Loading v-if="loading" />
    <Header :title="$t('DATA-CHECKING')" />
    <ion-content :scroll-y="false" class="content" v-if="!loading">
      <ion-list class="ion-margin-end list">
        <ion-label class="ion-margin title">{{
          $t('CONTACT-DETAILS')
        }}</ion-label>
        <ItemInput lines :error="errorFields.phone" class="ion-margin-top">
          <ion-row>
            <span class="label">{{ $t('PHONE-NUMBER') }}*</span>
            <input
              disabled
              inputmode="tel"
              ref="phone"
              class="input"
              v-model="fields.phone"
              v-maska="{
                mask: '+7 (###) ###-##-##',
              }"
            />
          </ion-row>
        </ItemInput>
        <ItemInput lines :error="errorFields.firstname">
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

        <ItemDate v-model="fields.birthday" />
      </ion-list>

      <Button :title="$t('SAVE')" class="button" @click="saveUser" />

      <ion-row class="ion-margin-start">
        <ion-text class="text"
          >{{ $t('AGREEMENT-TEXT') }}
          <a href="#">{{ $t('PERSONAL-DATA') }}</a></ion-text
        >
      </ion-row>
      <ion-row class="ion-margin">
        <ion-text class="text">{{ $t('REQUIRED-TEXT') }} </ion-text>
      </ion-row>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import {
  IonPage,
  IonContent,
  IonInput,
  IonList,
  IonRow,
  IonText,
  IonLabel,
  IonIcon,
} from '@ionic/vue';
import Header from '@/components/ui/Header.vue';
import ItemInput from '@/components/ui/ItemInput.vue';
import Button from '@/components/ui/Button.vue';
import ItemDate from '@/components/ui/ItemDate.vue';
import Loading from '@/components/ui/Loading.vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { formatDate, formatPhone } from '@/helpers/formatter';
import { clearFields, checkFields } from '@/helpers/from';
import { sendRecord } from '@/api/recording';

export default defineComponent({
  name: 'CheckData',
  components: {
    Loading,
    ItemDate,
    Button,
    ItemInput,
    Header,
    IonPage,
    IonContent,
    IonInput,
    IonList,
    IonRow,
    IonText,
    IonLabel,
    IonIcon,
  },
  data() {
    return {
      fields: {
        id: 0,
        firstname: null,
        lastname: null,
        patronymic: null,
        phone: null,
        birthday: null,
        email: null,
      },
      loading: false,
      errorFields: {},
      requiredFields: ['phone', 'firstname', 'lastname', 'patronymic'],
    };
  },
  computed: {
    ...mapGetters(['user', 'doctor', 'time', 'date', 'service']),
  },
  methods: {
    ...mapActions(['updateUser']),
    ...mapMutations(['SET_USER']),
    formatDate,
    formatPhone,
    clearFields,
    checkFields,
    handlerPhone(event) {
      this.fields.phone = event;
    },
    async saveUser() {
      if (!this.checkFields()) {
        this.loading = true;
        this.SET_USER(this.fields);
        this.$router.replace({ name: 'Profile' });
        await this.updateUser(this.fields);
        this.clearFields();

        await sendRecord({
          date: this.date,
          reserved: true,
          doctor: this.doctor.id,
          optic: this.doctor.optica.data.id,
          recording: this.time.id,
          service: this.service,
          user: this.user.id,
        });
        this.loading = false;
        this.$router.replace({ name: 'OrderRecording' });
      }
    },
  },
  mounted() {
    this.fields = {
      id: this.user.id,
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      patronymic: this.user.patronymic,
      phone: this.user.phone,
      birthday: this.user.birthday,
    };
  },
});
</script>

<style scoped lang="scss">
#check-data {
  .content {
    --background: #ffffff;

    .list {
      margin-top: 35px;

      .title {
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;
        color: #000000;
      }

      .label {
        font-weight: 400;
        font-size: 11px;
        line-height: 15px;
        color: #a8a8a8;
      }

      .input {
        border: none;
        width: 100%;
        background: #ffffff;
        position: relative;
        color: #646464;
      }

      .input:focus {
        outline: none;
      }

      .icon {
        margin-bottom: 4px;
      }
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

    .button {
      margin: 10px 16px 0 8px;
      left: 0;
      right: 0;
    }
  }
}

ion-popover {
  --width: 300px !important;
}
</style>
