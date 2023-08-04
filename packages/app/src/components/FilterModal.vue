<template>
  <ion-modal
    :is-open="show"
    :initial-breakpoint="0.9"
    @willPresent="onChange"
    @didDismiss="$emit('hide')"
    class="filter-modal"
    ref="modal"
  >
    <ion-content :scroll-y="true">
      <ion-col>
        <ion-row class="ion-justify-content-center">
          <ion-icon icon="assets/icon/line-menu.svg" class="show-hide-icon" />
          <ion-title class="title">{{ $t('FILTERS') }}</ion-title>
        </ion-row>
        <ion-row class="ion-margin">
          <ion-title class="text">{{ $t('REPLACEMENT-PERIOD') }}</ion-title>
        </ion-row>

        <ion-row class="ion-margin">
          <MultipleButton
            :options="period"
            :checked="filter.period"
            :flag="true"
            v-model="filter.period"
          />
        </ion-row>

        <ion-row class="ion-margin" style="position: relative">
          <ion-title class="text">{{ $t('LENS-TYPE') }}</ion-title>
          <ion-buttons class="btn-question">
            <ion-button @click="openPopover">
              <ion-icon
                icon="assets/icon/question.svg"
                slot="icon-only"
                class="icon-for-type"
              />
            </ion-button>
          </ion-buttons>
        </ion-row>
        <ion-row class="ion-margin">
          <MultipleButton
            :options="type"
            :checked="filter.type"
            v-model="filter.type"
          />
        </ion-row>

        <ion-row class="ion-margin">
          <ion-col
            style="padding-left: 0"
            class="ion-margin-end"
            :class="{ sphereRadius: isSphere }"
          >
            <ion-title class="text">{{ $t('SPHERE') }}</ion-title>
            <Select
              :options="sphere"
              :placeholder="$t('SELECT')"
              class="ion-margin-top"
              @isOpen="openShpere"
              v-model="filter.sphere"
            />
          </ion-col>
          <ion-col style="padding-right: 0" :class="{ sphereRadius: isRadius }">
            <ion-title class="text">{{ $t('RADIUS-CURVATURE') }}</ion-title>
            <Select
              :options="radius"
              :placeholder="$t('SELECT')"
              class="ion-margin-top"
              @isOpen="openRadius"
              v-model="filter.radius"
            />
          </ion-col>
        </ion-row>
        <ion-row class="ion-margin">
          <ion-col
            style="padding-left: 0"
            class="ion-margin-end"
            v-if="adds.length"
            :class="{ axAdd: isAdd }"
          >
            <ion-title class="text">{{ $t('ADDS') }}</ion-title>
            <Select
              :options="adds"
              :placeholder="$t('SELECT')"
              class="ion-margin-top"
              @isOpen="openAdd"
              v-model="filter.add"
            />
          </ion-col>
          <ion-col
            style="padding-right: 0"
            v-if="axes.length"
            :class="{ axAdd: isAx }"
          >
            <ion-title class="text">{{ $t('AXES') }}</ion-title>
            <Select
              :options="axes"
              :placeholder="$t('SELECT')"
              class="ion-margin-top"
              @isOpen="openAx"
              v-model="filter.ax"
            />
          </ion-col>
        </ion-row>
        <ion-row class="ion-margin">
          <ion-col
            style="padding-left: 0"
            :class="{ cylinderDominant: isCylinder }"
            class="ion-margin-end"
            v-if="cylinders.length"
          >
            <ion-title class="text">{{ $t('CYLINDERS') }}</ion-title>
            <Select
              :options="cylinders"
              :placeholder="$t('SELECT')"
              class="ion-margin-top"
              @isOpen="openCylinder"
              v-model="filter.cylinder"
            />
          </ion-col>
          <ion-col
            style="padding-left: 0"
            :class="{ cylinderDominant: isDominant }"
            v-if="dominants.length"
          >
            <ion-title class="text">{{ $t('DOMINANT') }}</ion-title>
            <Select
              :options="dominants"
              :placeholder="$t('SELECT')"
              class="ion-margin-top"
              @isOpen="openDominant"
              v-model="filter.dominant"
            />
          </ion-col>
        </ion-row>
      </ion-col>

      <ion-row
        :class="{ openSelect: isCylinder || isDominant }"
        class="ion-justify-content-center"
        v-if="
          !(
            filter.period.length ||
            filter.type.length ||
            Object.keys(filter.sphere).length ||
            Object.keys(filter.radius).length ||
            Object.keys(filter.add).length ||
            Object.keys(filter.ax).length ||
            Object.keys(filter.cylinder).length ||
            Object.keys(filter.dominant).length
          )
        "
      >
        <Button title="Закрыть" @click="$emit('hide')" class="closeBtn" />
      </ion-row>

      <ion-row
        class="ion-margin ion-justify-content-between"
        :class="{ openSelect: isCylinder || isDominant }"
        v-if="
          !!(
            filter.period.length ||
            filter.type.length ||
            Object.keys(filter.sphere).length ||
            Object.keys(filter.radius).length ||
            Object.keys(filter.add).length ||
            Object.keys(filter.ax).length ||
            Object.keys(filter.cylinder).length ||
            Object.keys(filter.dominant).length
          )
        "
      >
        <ion-buttons>
          <ion-button
            fill="solid"
            style="color: #ffffff"
            class="action-button"
            @click="apply"
            >{{ $t('APPLY') }}
          </ion-button>
        </ion-buttons>
        <ion-buttons>
          <ion-button fill="outline" class="action-button" @click="clear"
            >{{ $t('RESET') }}
          </ion-button>
        </ion-buttons>
      </ion-row>
    </ion-content>
  </ion-modal>
  <Popover :button-ok="$t('OK')" @handler="closePopover" />
</template>

<script lang="js">
import {defineComponent} from 'vue';
import {
  IonModal,
  IonContent,
  IonRow,
  IonTitle,
  IonButtons,
  IonButton,
  IonCol,
  IonIcon,
} from '@ionic/vue';
import Select from '@/components/ui/Select.vue';
import Button from '@/components/ui/Button.vue'
import Popover from "@/components/ui/Popover.vue";
import MultipleButton from "@/components/ui/MultipleButton.vue";
import {mapActions, mapGetters, mapMutations} from "vuex";

export default defineComponent({
  name: 'Filter',
  props: {
    show: {
      type: Boolean,
      default: false,
    },

  },
  emits: ['hide'],
  components: {
    Select,
    MultipleButton,
    Button,
    IonModal,
    IonContent,
    IonRow,
    IonTitle,
    IonButtons,
    IonButton,
    IonCol,
    IonIcon,
    Popover
  },
  data: () => ({
    isRadius: false,
    isSphere: false,
    isAdd: false,
    isAx: false,
    isCylinder: false,
    isDominant: false,
    filter: {
      type: [],
      period: [],
      sphere: {},
      radius: {},
      add: {},
      ax: {},
      cylinder: {},
      dominant: {},
    },
  }),

  computed: {
    ...mapGetters({
      store_filter: 'filter',
      type: 'type',
      radius: 'radius',
      sphere: 'sphere',
      period: 'period',
      adds: 'adds',
      axes: 'axes',
      cylinders: 'cylinders',
      dominants: 'dominants'
    }),
  },

  methods: {
    ...mapMutations(['SET_POPOVER', 'SET_FILTER',]),
    ...mapActions(['filterProducts']),
    onChange() {
      this.filter = {...this.store_filter}
    },
    openSelect(e) {
      this.isActive = e;
    },
    openRadius(e) {
      this.isRadius = e
    },
    openShpere(e) {
      this.isSphere = e
    },
    openCylinder(e) {
      this.isCylinder = e
    },
    openAx(e) {
      this.isAx = e
    },
    openAdd(e) {
      this.isAdd = e
    },
    openDominant(e) {
      this.isDominant = e
    },
    closePopover( ) {
      this.SET_POPOVER({show: false, message: []})
    },
    openPopover() {
      const messages = []
      this.type.map((el) => {
        messages.push(el.description)
      })
      this.SET_POPOVER({show: true, message: messages})
    },
    apply() {
      this.$emit('hide')
      this.SET_FILTER(this.filter)
      this.filterProducts()
      this.$refs.modal.$el.dismiss();
    },
    clear() {
      this.filter.type = []
      this.filter.period = []
      this.filter.sphere = {}
      this.filter.radius = {}
      this.filter.add = {},
      this.filter.ax = {},
      this.filter.cylinder = {},
      this.filter.dominant = {},
      this.SET_FILTER({
        type: [],
        period: [],
        sphere: {},
        radius: {},
        add: {},
        ax: {},
        cylinder: {},
        dominant: {},
      })

    }
  },
});
</script>

<style lang="scss">
.filter-modal {
  ion-content {
    --background: #ffffff !important;
  }

  .buttons {
    margin: 8px;
  }

  .show-hide-icon {
    width: 46px;
    height: 3px;
    margin-top: -5px;
    margin-bottom: 10px;
  }

  .title {
    display: contents;
    font-size: 14px;
    font-weight: 600;
  }

  .text {
    text-align: start;
    display: contents;
    font-size: 14px;
    font-weight: 500;
  }

  ion-button {
    color: #000000;
  }

  .btn {
    width: 100%;
  }

  .select {
    width: 150px;

    .icon-check-mark {
      width: 8px;
      height: 4px;
    }
  }

  .action-button {
    width: 150px;
    height: 40px;
    border-radius: 5px;
    font-weight: 600;
    font-size: 14px;
    margin-top: 30px;
  }

  .closeBtn {
    margin: 0 8px;
  }

  .active {
    background: #005944;
  }

  .btn-question {
    position: absolute;
    margin: 0 auto;
    left: 60px;
    top: -17px;

    .icon-for-type {
      width: 15px;
      height: 15px;
    }
  }

  .sphereRadius {
    margin-bottom: 170px;
  }

  .axAdd {
    margin-bottom: 170px;
  }

  .cylinderDominant {
    margin-bottom: 170px;
  }

  .openSelect {
    margin-bottom: 250px;
  }
}

.button-outline {
  border: 1px solid #e7e7e7 !important;
  border-radius: 10px !important;
}

.button-native {
  border: none !important;
}
</style>
