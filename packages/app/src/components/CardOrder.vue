<template>
  <ion-card class="card">
    <ion-card-content class="content">
      <ion-label class="title"
        >{{ $t('ORDER-NUMBER') }} {{ order }} {{ $t('FROM') }}
        {{ formatDate(date, 'LL') }}
      </ion-label>
      <ion-row class="container-text">
        <ion-label class="ion-margin-end text"
          >{{ $tc('COUNT-ORDER', count) }}
        </ion-label>
        <ion-label class="ion-margin-end text"
          >{{ price }} {{ $t('RUBLE-SIGN') }}
        </ion-label>
        <ion-label class="text" style="border: none">{{ pickup }}</ion-label>
      </ion-row>
      <Badge :status="status" />
    </ion-card-content>
  </ion-card>
</template>

<script>
import { defineComponent } from 'vue';
import { IonCard, IonCardContent, IonLabel, IonRow } from '@ionic/vue';
import { formatDate } from '@/helpers/formatter';
import Badge from '@/components/ui/Badge.vue';

export default defineComponent({
  name: 'CardOrder',
  props: {
    order: {
      type: Number,
      default: 0,
    },
    date: {
      type: String,
      default: '',
    },
    count: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    },
    pickup: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      default: '',
    },
  },
  components: {
    Badge,
    IonCard,
    IonCardContent,
    IonLabel,
    IonRow,
  },
  methods: {
    formatDate,
  },
});
</script>

<style lang="scss">
.card {
  .content {
    padding: 10px;

    .title {
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      color: #000000;
    }

    .container-text {
      margin-top: 8px;

      .text {
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;
        color: #737373;
        border-right: 1px solid #737373;
        padding-right: 16px;
      }
    }
  }

  ion-item::part(native) {
    padding: 0;
  }

  ion-badge {
    --padding-bottom: 5px;
    --background: #4dac97;
  }
}
</style>
