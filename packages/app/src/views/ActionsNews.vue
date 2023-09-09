<template>
  <ion-page>
    <Header :title="$t('ACTION')" back />
    <Content>
      <div class="wrapper">
        <div class="image-box">
          <img :src="item.url" class="image" />
        </div>
        <div class="text-box">
          <div class="header">
            <ion-icon icon="assets/icon/sale.svg" class="icon" />
            <p class="title">
              {{ item.title }}
              <!-- {{ $t('ACTION-TITLE') }} -->
            </p>
          </div>

          <span class="description">
            {{ item.description }}
            <!-- {{ $t('ACTION-DESCRIPTION') }} -->
          </span>
        </div>

        <ion-row class="ion-justify-content-center">
          <Button
            :title="$t('TO-CATALOG')"
            class="custom-btn"
            @click="
              $router.push({
                name: 'Catalog',
              })
            "
          />
        </ion-row>
      </div>
    </Content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonIcon, IonRow } from '@ionic/vue';
import Header from '@/components/ui/Header.vue';
import Button from '@/components/ui/Button.vue';
import { mapGetters } from 'vuex';
import Content from '@/components/ui/Content.vue';

export default defineComponent({
  name: 'ActionsNews',
  components: {
    Button,
    IonPage,
    Header,
    IonIcon,
    IonRow,
    Content,
  },
  data() {
    return {
      item: {
        title: '',
        description: '',
        url: '',
      },
    };
  },
  computed: {
    ...mapGetters(['actions_news']),
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    async handlerActionNews() {
      this.item = await this.actions_news.find((an: any) => an.id == this.id);
    },
  },
  mounted() {
    this.handlerActionNews();
  },
});
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;

  .image-box {
    margin: 16px 20px;

    .image {
      width: 100%;
      height: 100%;
    }
  }

  .text-box {
    margin: 0 20px;
    flex: 2;

    .header {
      display: flex;
      margin-bottom: 10px;

      .icon {
        width: 20px;
      }

      .title {
        margin: 0 10px;
        font-weight: 600;
        font-size: 14px;
      }
    }

    .description {
      font-size: 14px;
    }
  }
  .custom-btn {
    margin-bottom: 40px;
  }
}
</style>
