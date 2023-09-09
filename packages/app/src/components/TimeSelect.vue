<template>
  <ion-grid id="time-select-wrapper">
    <ion-row class="ion-justify-content-evenly time-container">
      <ion-col
        class="time-item"
        v-for="(item, index) in times"
        :key="index"
        :class="[handlerClass(item), handlerReservedTime(item)]"
        @click="selectTime(item)"
      >
        {{ item.time }}
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="js">
import {defineComponent} from 'vue';
import {IonGrid, IonRow, IonCol} from '@ionic/vue';

export default defineComponent({
  name: 'TimeSelect',
  components: {
    IonGrid,
    IonRow,
    IonCol,
  },
  props: {
    time: {
      type: Object,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: ()=>{}
    },
    times: {
      type: Array,
      default: () => []
    },
    reserved: {
      type: Array,
      default: () => []
    }
  },
  emits: ['select'],
  data() {
    return {};
  },
  computed: {
    handlerTime() {
      return this.time
    },

  },
  methods: {
    handlerClass(event) {
      return this.handlerTime === event ? 'active' : 'selectable'
    },
    selectTime(e) {
      if(!this.handlerReserv(e)) {
        this.$emit('select', e);
      }
    },
    handlerReservedTime(event) {
      return this.reserved.map((e) => e === event.time ? 'not-selectable' : '')
    },
    handlerReserv (event) {
      return this.reserved.find((e) => e === event.time)
    }
  },
});
</script>

<style lang="scss">
#time-select-wrapper {
  background: #ffffff;
  border-radius: 5px;
  margin: 0;

  .time-container {
    display: grid;
    grid-template-columns: auto auto auto auto auto;
  }

  .time-item {
    /* Component 5 */

    color: var(--body-color);
    box-sizing: border-box;

    /* Auto layout */

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 5px 10px;
    margin: 5px;
    gap: 10px;

    font-weight: 400;
    font-size: 12px;
    line-height: 15px;

    width: 50px;
    height: 25px;

    background: var(--body-bg);
    border: 1px solid #e7e7e7;
    border-radius: 2px;

    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;

    &:hover,
    &:active,
    &.active {
      background: var(--ion-color-primary);
      color: var(--ion-color-primary-contrast);
    }

    &.not-selectable {
      background: rgba(0, 89, 68, 0.18);
      color: var(--ion-color-primary-contrast);
    }
  }
}
</style>
