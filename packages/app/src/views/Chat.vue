<template>
  <ion-page id="chat">
    <Header :title="$t('CHAT')" back />
    <Content white-color>
      <Info
        :title="$t('CHAT-EMPTY')"
        :description="$t('CHAT-EMPTY-DESCRIPTION')"
        icon="assets/icon/empty-chat.svg"
      />
    </Content>
    <ion-row
      class="ion-padding-start ion-nowrap ion-padding-end row-input-message"
    >
      <div class="box">
        <input type="text" :placeholder="$t('MESSAGE')" class="input" />
        <ion-buttons class="button-icon">
          <ion-button>
            <ion-icon icon="assets/icon/clip.svg" class="icon"></ion-icon>
          </ion-button>
        </ion-buttons>
      </div>
      <ion-buttons>
        <ion-button class="send-button">
          <ion-icon icon="assets/icon/send.svg"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-row>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonRow, IonButtons, IonButton, IonIcon } from '@ionic/vue';
import Header from '@/components/ui/Header.vue';
import Content from '@/components/ui/Content.vue';
import Info from '@/components/ui/Info.vue';

export default defineComponent({
  name: 'Chat',
  components: {
    Info,
    Content,
    Header,
    IonPage,
    IonRow,
    IonButtons,
    IonButton,
    IonIcon,
  },
});
</script>

<style lang="scss">
#chat ion-grid ion-content::part(background) {
  --background: #ffffff;
}

#chat ion-refresher ion-refresher-content {
  background: #ffffff;
}

#chat {
  .row-input-message {
    width: 100%;
    position: relative;
    bottom: 30px;
    display: flex;

    .box {
      display: flex;
      align-items: center;
      position: relative;
      width: 100%;

      .input {
        width: 90%;
        background: #efefef;
        border-radius: 5px;
        height: 24px;
        border: none;
        outline: none;
        padding: 5px;
        font-size: 12px;
      }

      .input::placeholder {
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;
        color: #bbbbbb;
      }

      .button-icon {
        position: absolute;
        right: 40px;

        .icon {
          width: 15px;
        }
      }
    }

    .send-button {
      background: var(--ion-color-primary);
      width: 25px;
      height: 25px;
      border-radius: 5px;
    }
  }
}
</style>
