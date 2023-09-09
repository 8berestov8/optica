<template>
  <ion-page id="record-history">
    <Header back :title="$t('HISTORY-VISITS')" />
    <Loading v-if="loading" />
    <Content v-if="!loading" @refresh="refresh" scroll>
      <Info
        v-if="!history.length"
        icon="assets/icon/empty-history.svg"
        :title="$t('EMPTY-HISTIRY-VISITS')"
      />
      <ion-list class="list" v-if="history.length">
        <ion-item
          v-for="(item, index) in history"
          :key="index"
          class="ion-margin-end"
        >
          <ion-col>
            <ion-label class="title"
              >{{ $t('MESSAGE FROM') }} {{ formatDate(item.date, 'LL') }} ({{
                item.time
              }})
            </ion-label>
            <ion-label class="text"
              >{{ $t('DOCTOR') }}: {{ item.doctor }}</ion-label
            >
            <ion-label class="text"
              >{{ $t('SERVICE') }}: {{ item.service }}</ion-label
            >
          </ion-col>
        </ion-item>
      </ion-list>
    </Content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonList, IonItem, IonLabel, IonCol } from '@ionic/vue';
import Content from '@/components/ui/Content.vue';
import Header from '@/components/ui/Header.vue';
import Info from '@/components/ui/Info.vue';
import Loading from '@/components/ui/Loading.vue';
import { getRecordHistory } from '@/api/recording';
import { formatDate } from '@/helpers/formatter';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'RecordHistory',
  components: {
    Loading,
    Header,
    Content,
    Info,
    IonPage,
    IonList,
    IonItem,
    IonLabel,
    IonCol,
  },
  data() {
    return {
      loading: false,
      history: [],
    };
  },
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async refresh(complete = () => {}) {
      try {
        this.history = await getRecordHistory(this.user.id);
      } finally {
        complete();
      }
    },
    formatDate,
  },
  async mounted() {
    this.loading = true;
    this.history = await getRecordHistory(this.user.id);
    this.loading = false;
  },
});
</script>

<style lang="scss">
#record-history {
  ion-content {
    --background: #ffffff;
  }

  .list {
    height: 100%;

    .title {
      margin-top: 8px;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      color: #000000;
    }

    .text {
      margin: 8px 0;
      font-weight: 400;
      font-size: 12px;
      line-height: 15px;
      color: #737373;
    }
  }
}
</style>
