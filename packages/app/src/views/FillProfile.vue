<template>
  <ion-page id="fill-profile">
    <Header :title="$t('FILL-PROFILE')" />
    <Loading v-if="loading" :is-open="loading" />
    <ion-content class="content">
      <ion-list class="ion-margin-end">
        <ion-item lines="none">
          <ion-label class="label">{{ $t('FILL-PROFILE-TEXT') }} </ion-label>
        </ion-item>

        <ItemInput lines>
          <ion-input
            v-model="fields.firstname"
            label-placement="floating"
            :label="$t('FIRSTNAME')"
          ></ion-input>
        </ItemInput>

        <ItemInput lines>
          <ion-input
            v-model="fields.lastname"
            label-placement="floating"
            :label="$t('LASTNAME')"
          ></ion-input>
        </ItemInput>

        <ItemInput lines>
          <ion-input
            v-model="fields.patronymic"
            label-placement="floating"
            :label="$t('PATRONYMIC')"
          ></ion-input>
        </ItemInput>

        <ItemInput lines id="click-trigger" class="ion-align-items-end">
          <ion-input
            :value="formatDate(fields.birthday)"
            label-placement="floating"
            :label="$t('DATE-BIRTH')"
            disabled
          ></ion-input>
          <ion-icon icon="assets/icon/calendar-courier.svg" class="icon" />
        </ItemInput>
        <ItemDate v-model="fields.birthday" />

        <ItemInput lines :error="errorFields.email">
          <ion-input
            v-model="fields.email"
            type="email"
            label-placement="floating"
            :label="$t('EMAIL')"
            @ionChange="validateEmail"
          ></ion-input>
        </ItemInput>
      </ion-list>
      <ion-row class="ion-justify-content-around button">
        <Button :title="$t('FURTHER')" class="btn" @click="saveUser" />
        <Button :title="$t('FILL-LATER')" class="btn another" @click="later" />
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
  IonInput,
  IonLabel,
  IonRow,
  IonIcon,
} from '@ionic/vue';
import Header from '@/components/ui/Header.vue';
import Button from '@/components/ui/Button.vue';
import Loading from '@/components/ui/Loading.vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { formatDate } from '@/helpers/formatter';
import ItemInput from '@/components/ui/ItemInput.vue';
import ItemDate from '@/components/ui/ItemDate.vue';

export default defineComponent({
  name: 'FillProfile',
  components: {
    ItemInput,
    Loading,
    Button,
    Header,
    IonPage,
    IonContent,
    IonList,
    IonItem,
    IonInput,
    IonLabel,
    IonRow,
    IonIcon,
    ItemDate,
  },
  data() {
    return {
      fields: {
        id: 0,
        firstname: '',
        lastname: '',
        patronymic: '',
        phone: '',
        birthday: '',
        email: '',
      },
      loading: false,
      errorFields: {},
    };
  },
  computed: {
    ...mapGetters(['user']),
    redirect() {
      return this.$route.params.redirect;
    },
  },
  methods: {
    formatDate,
    ...mapMutations(['SET_USER']),
    ...mapActions(['updateUser']),
    saveUser() {
      this.loading = true;
      this.SET_USER(this.fields);
      this.$router.replace({ name: this.redirect });
      this.updateUser(this.fields);
      this.loading = false;
    },
    later() {
      this.$router.replace({ name: this.redirect });
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
  },
  mounted() {
    this.fields = {
      id: this.user?.id,
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      patronymic: this.user.patronymic,
      phone: this.user.phone,
      birthday: this.user.birthday,
      email: this.user.email,
    };
  },
});
</script>

<style lang="scss">
#fill-profile {
  .content {
    --background: #ffffff;

    .label {
      font-weight: 400;
      font-size: 14px;
      line-height: 140%;
      color: #000000;
      white-space: pre-wrap;
    }

    .icon {
      margin-bottom: 4px;
    }

    .button {
      position: fixed;
      bottom: 30px;
      flex-wrap: nowrap;
      width: 100%;
      left: 0;
      right: 0;
      margin: 0;
      display: flex;

      .btn {
        width: 40%;
      }

      .another {
        .custom-btn {
          --background: #ffffff;
          border: 1px solid #00795d;
          color: #000000;
        }
      }
    }
  }
}
</style>
