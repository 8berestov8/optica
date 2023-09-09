<template>
  <ion-page id="order-history">
    <Header back :title="$t('HISTORY-ORDER')" />
    <Loading v-if="loading" />
    <Content id="order-history" @refresh="refresh" v-if="!loading" scroll>
      <Info
        v-if="!history.length"
        icon="assets/icon/empty-cart.svg"
        :title="$t('EMPTY-HISTORY-ORDER')"
      />
      <CardOrder
        v-for="(item, index) in history"
        :key="index"
        :date="item.date"
        :order="item.id"
        :count="item.count"
        :price="item.price"
        :status="item.status"
        :pickup="pickupHandler(item.deliverTo)"
        @click="
          $router.push({ name: 'OrderItemHistory', params: { id: item.id } })
        "
      />
    </Content>
  </ion-page>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import { IonPage } from '@ionic/vue';
import Header from '@/components/ui/Header.vue';
import Content from '@/components/ui/Content.vue';
import Info from '@/components/ui/Info.vue';
import CardOrder from '@/components/CardOrder.vue';
import Loading from "@/components/ui/Loading.vue";
import { getOrderHistory } from '@/api/order';
import { mapGetters, mapMutations } from 'vuex';

export default defineComponent({
  name: 'OrderHistory',
  components: {
    CardOrder,
    IonPage,
    Header,
    Content,
    Info,
    Loading
  },
  data() {
    return {
      history: [],
    };
  },
  computed: {
    ...mapGetters(['user', 'loading']),

  },
  methods: {
    ...mapMutations(['SET_LOADING']),
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async refresh(complete = () => {}) {
      try {
        this.history = await getOrderHistory(this.user.id);
      } finally {
        complete();
      }
    },
    pickupHandler (event) {
      return event  ? this.$t('COURIER') : this.$t('PICKUP')
    }
  },

  async mounted() {
    this.SET_LOADING(true)
    this.history = await getOrderHistory(this.user.id);
    this.SET_LOADING(false)
  },
});
</script>

<style lang="scss">
#order-history {
  ion-content {
    --background: #ffffff;
  }
}
</style>
