<template>
  <ion-page id="profile">
    <Header :title="$t('PROFILE')" contact/>
    <Loading v-if="loading"/>
    <Content v-if="!loading" @refresh="refresh">
      <ion-card class="contact" v-if="token">
        <ion-card-content class="content">
          <ion-list>
            <ion-item>
              <ion-row class="user-info">
                <ion-label
                    class="user-name"
                    style="display: flex; align-items: center"
                >{{ `${user.firstname} ${user.lastname}` }}
                  <ion-buttons>
                    <ion-button
                        @click="
                        $router.push({
                          name: 'EditProfile',
                        })
                      "
                    >
                      <ion-icon
                          size="small"
                          slot="icon-only"
                          icon="assets/icon/edit.svg"
                      ></ion-icon>
                    </ion-button>
                  </ion-buttons>
                </ion-label>
                <ion-label class="user-phone">
                  {{ formatPhone(user.phone) }}
                </ion-label>
              </ion-row>
              <ion-row></ion-row>
            </ion-item>
            <ion-item>
              <ion-row class="item-row">
                <ion-col class="icon-col">
                  <ion-icon
                      icon="assets/icon/my-order.svg"
                      class="ion-margin-end icon"
                  ></ion-icon>
                </ion-col>
                <ion-col
                    class="text-col ion-justify-content-between ion-align-items-center"
                    style="display: flex"
                    @click="$router.push({ name: 'OrderHistory' })"
                >
                  <ion-label class="text">{{ $t('MY-ORDERS') }}</ion-label>
                  <ion-icon icon="assets/icon/arrow.svg"></ion-icon>
                </ion-col>
              </ion-row>
            </ion-item>
            <ion-item lines="none">
              <ion-row class="item-row">
                <ion-col class="icon-col">
                  <ion-icon
                      icon="assets/icon/my-record.svg"
                      class="ion-margin-end icon"
                  ></ion-icon>
                </ion-col>
                <ion-col
                    class="text-col ion-justify-content-between ion-align-items-center"
                    style="display: flex"
                    @click="$router.push({ name: 'RecordHistory' })"
                >
                  <ion-label class="text">{{ $t('MY-VISITS') }}</ion-label>
                  <ion-icon icon="assets/icon/arrow.svg"></ion-icon>
                </ion-col>
              </ion-row>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>

      <Address :title="$t('OPTICS-ADDRESS')"/>

      <ion-card class="contact">
        <ion-card-content class="content">
          <ion-list>
            <ion-item lines="none">
              <ion-label class="title">{{ $t('CONNECT') }}</ion-label>
            </ion-item>

            <ion-item>
              <ion-row class="item-row">
                <ion-col class="icon-col">
                  <ion-icon
                      icon="assets/icon/call-profile.svg"
                      class="icon"
                  ></ion-icon>
                </ion-col>
                <ion-col class="text-col">
                  <a
                      href="tel:+79502822722"
                      class="ion-margin-start text"
                      style="color: #17a1fa"
                  >{{ $t('PHONE') }}</a
                  >
                </ion-col>
              </ion-row>
            </ion-item>

            <ion-item lines="none">
              <ion-row class="item-row">
                <ion-col class="icon-col">
                  <ion-icon
                      icon="assets/icon/message-profile.svg"
                      class="ion-margin-end icon"
                  ></ion-icon>
                </ion-col>
                <ion-col
                    class="text-col ion-justify-content-between ion-align-items-center"
                    style="display: flex"
                    @click="chat"
                >
                  <ion-label class="text">{{ $t('WRITE-TO-CHAT') }}</ion-label>
                  <ion-icon icon="assets/icon/arrow.svg"></ion-icon>
                </ion-col>
              </ion-row>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>

      <ion-row class="row" v-if="!token">
        <ion-row class="ion-margin swiper-slide-shadow-bottom">
          <ion-label class="text-no-auth">{{ $t('PROFILE-TEXT') }}</ion-label>
        </ion-row>
        <Button
            :title="$t('TO-ENTER')"
            class="auth-button"
            @click="
            $router.push({ name: 'Auth', params: { redirect: 'Profile' } })
          "
        />
      </ion-row>

      <ion-row
          class="ion-margin-bottom ion-margin ion-justify-content-between"
          v-if="token"
      >
        <ion-buttons>
          <ion-button class="logout-button" @click="logout">{{
              $t('LOGOUT')
            }}
          </ion-button>
        </ion-buttons>
        <ion-buttons>
          <ion-button class="delete-button" @click="presentAlert(user.id)">{{
              $t('DELETE-ACCOUNT')
            }}
          </ion-button>
        </ion-buttons>
      </ion-row>
    </Content>
  </ion-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {
  IonPage,
  IonCard,
  IonCardContent,
  IonRow,
  IonIcon,
  IonLabel,
  IonCol,
  IonList,
  IonItem,
  IonButtons,
  IonButton,
  alertController
} from '@ionic/vue';
import Header from '@/components/ui/Header.vue';
import Content from '@/components/ui/Content.vue';
import Button from '@/components/ui/Button.vue';
import {mapActions, mapGetters, mapMutations} from 'vuex';
import Loading from '@/components/ui/Loading.vue';
import Address from '@/components/Address.vue';
import {formatPhone} from '../helpers/formatter';
import {removeUser} from "@/api/user";

export default defineComponent({
  name: 'Profile',
  components: {
    Address,
    Loading,
    Button,
    Content,
    Header,
    IonPage,
    IonCard,
    IonCardContent,
    IonRow,
    IonIcon,
    IonLabel,
    IonCol,
    IonList,
    IonItem,
    IonButtons,
    IonButton,
  },
  data() {
    return {
      loading: false,
      isOpenAlert: false
    };
  },
  computed: {
    ...mapGetters(['user', 'token']),
  },
  methods: {
    formatPhone,
    ...mapMutations(['SET_TOKEN', 'SET_USER']),
    ...mapActions(['getUser']),
    chat() {
      const win: Window = window;
      win.location = 'https://wa.me/79502822722';
    },
    async logout() {
      this.SET_TOKEN('');
      localStorage.removeItem('jwt');
      localStorage.removeItem('user');
    },
    async remove(id: any) {
      this.loading = true
      await removeUser(id)
      localStorage.removeItem('user')
      localStorage.removeItem('jwt')
      this.SET_TOKEN('')
      this.SET_USER({})
      this.loading = false
      this.$router.replace({name: 'Profile'})
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async refresh(complete = () => {
    }) {
      try {
        await this.getUser(this.user.id);
      } finally {
        complete();
      }
    },
    async presentAlert(id: any) {
      const alert = await alertController.create({
        header: this.$t('REMOVE'),
        message: this.$t('REMOVE-MESSAGE'),
        buttons: [
          {
            text: this.$t('CANCEL'),
            role: 'cancel',
            handler: () => {
              console.log('cancel')
            },
          },
          {
            text: this.$t('OK'),
            role: 'confirm',
            handler: () => {
              console.log('ok')
              this.remove(id)
            },
          },
        ],
      });

      await alert.present();
      await alert.onDidDismiss();
    }
  },
  async mounted() {
    this.loading = true;
    this.loading = false;
  },
});
</script>

<style scoped lang="scss">
#profile {
  .contact {
    .title {
      font-weight: 600;
      font-size: 14px;
      line-height: 17px;
      color: #000000;
      text-transform: none;
    }

    .user-info {
      flex-direction: column;

      .user-name {
        font-weight: 600;
        font-size: 16px;
        line-height: 20px;
        margin: 10px 0 4px 0;
      }

      .user-phone {
        font-weight: 400;
        font-size: 12px;
        line-height: 130%;
        color: #a0a0a0;
        margin: 4px 0 10px 0;
      }
    }

    .content {
      padding-left: 0;
      padding-top: 0;
      padding-bottom: 0;

      .item-row {
        width: 100%;
      }

      .icon-col {
        width: 32px;
        display: contents;

        .icon {
          width: 24px;
          height: 24px;
        }
      }

      .text-col {
        .text {
          font-size: 14px;
          line-height: 17px;
          color: #000000;
          text-decoration: none;
          white-space: pre-wrap;
        }

        .link-view-card {
          font-weight: 300;
          font-size: 12px;
          line-height: 130%;
          color: #6f6f6f;
        }
      }
    }
  }

  .row {
    .text-no-auth {
      font-weight: 300;
      font-size: 14px;
      line-height: 130%;
      text-align: center;
    }

    .auth-button {
      margin: 0 10px;
      width: 100%;
    }
  }

  .logout-button {
    font-weight: 400;
    font-size: 12px;
    line-height: 130%;
    color: #a0a0a0;
  }

  .delete-button {
    font-weight: 400;
    font-size: 12px;
    line-height: 130%;
    color: red;
  }
}
</style>
