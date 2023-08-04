<template>
  <ion-page>
    <Header :title="$t('MY-DETAILS')" back />
    <Loading v-if="loading" />
    <ion-content id="my-data">
      <ion-list class="ion-margin-end">
        <ItemInput lines :error="errorFields.firstname" class="ion-margin-top">
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

      <Button :title="$t('SAVE')" class="button" @click="saveUser" />
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonContent, IonList, IonInput, IonIcon } from '@ionic/vue';
import Header from '@/components/ui/Header.vue';
import Button from '@/components/ui/Button.vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import Loading from '@/components/ui/Loading.vue';
import ItemInput from '@/components/ui/ItemInput.vue';
import { checkFields, clearFields } from '@/helpers/from';
import ItemDate from '@/components/ui/ItemDate.vue';
import { formatDate } from '@/helpers/formatter';

export default defineComponent({
  name: 'EditProfile',
  components: {
    ItemDate,
    ItemInput,
    Loading,
    Button,
    Header,
    IonPage,
    IonContent,
    IonList,
    IonInput,
    IonIcon,
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
      requiredFields: ['firstname', 'lastname', 'patronymic'],
    };
  },
  mounted() {
    this.fields = {
      id: this.user.id,
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      patronymic: this.user.patronymic,
      phone: this.user.phone,
      birthday: this.user.birthday,
      email: this.user.email,
    };
  },
  methods: {
    formatDate,
    checkFields,
    clearFields,
    ...mapMutations(['SET_USER']),
    ...mapActions(['updateUser']),
    async saveUser() {
      if (!this.checkFields()) {
        this.loading = true;
        this.SET_USER(this.fields);
        this.$router.replace({ name: 'Profile' });
        await this.updateUser(this.fields);
        this.loading = false;
        this.clearFields();
      }
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
  computed: {
    ...mapGetters(['user']),
  },
});
</script>

<style scoped lang="scss">
#my-data {
  --background: #ffffff;

  .icon {
    margin-bottom: 4px;
  }

  .button {
    margin: 0 10px;
    position: fixed;
    bottom: 30px;
    left: 0;
    right: 0;
  }
}
</style>
