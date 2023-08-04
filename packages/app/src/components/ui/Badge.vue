<template>
  <ion-item lines="none" :style="{'--background': background}">
    <ion-badge slot="start" class="badge" :style="handlerStatus">{{ status }}</ion-badge>
  </ion-item>
</template>

<script>
import {defineComponent} from "vue";
import {IonItem, IonBadge} from "@ionic/vue";

export default defineComponent({
  name: "Badge",
  components: {
    IonItem,
    IonBadge
  },
  props: {
    status: {
      type: String,
      default: ''
    },
    background: {
      type: String,
      default: '#ffffff'
    },
  },
  computed: {
    handlerStatus() {
      return this.status === 'Получен' ? {background: this.background, color: '#000000'} : this.status === 'Отменен' ? {
        background: '#C90433', border: 'none'
      } : {background: '#4DAC97'}
    }
  }
})
</script>

<style scoped>
.badge {
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: #FFFFFF;
  border: 1px solid #4DAC97;
  border-radius: 10px;
}
</style>
