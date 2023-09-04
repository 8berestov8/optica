<template>
  <ion-page id="params">
    <Header :title="$t('OPTIONS')" contact back />
    <Loading v-if="loading" />
    <ion-content v-if="!loading" class="params-content">
      <ion-row class="ion-margin">
        <ion-label>{{ $t('OPTIONS-TITLE') }}</ion-label>
      </ion-row>
      <ion-row class="ion-padding">
        <Segment
          :title-left="$t('IDENTICAL')"
          :title-right="$t('DIFFERENT')"
          :value="segment"
          @change="activeSegment"
        />
      </ion-row>

      <div>
        <ion-row class="ion-margin">
          <ion-col
            style="padding-left: 0"
            class="ion-margin-end"
            :class="{ sphereRadiusClass: isSphere }"
            v-if="sphere.length"
          >
            <ion-title class="text">{{ $t('SPHERE') }}</ion-title>
            <Select
              :options="sphere"
              :placeholder="$t('SELECT')"
              class="ion-margin-top"
              @isOpen="openSphere"
              v-model="fields.sphere"
            />
            <span class="required" v-if="errorFields.sphere">{{
              errorFields.sphere
            }}</span>
          </ion-col>
          <ion-col
            style="padding-right: 0"
            :class="{ sphereRadiusClass: isRadius }"
            v-if="radius.length"
          >
            <ion-title class="text">{{ $t('RADIUS-CURVATURE') }}</ion-title>
            <Select
              :options="radius"
              :placeholder="$t('SELECT')"
              class="ion-margin-top"
              @isOpen="openRadius"
              v-model="fields.radius"
            />
            <span class="required" v-if="errorFields.radius">{{
              errorFields.radius
            }}</span>
          </ion-col>
        </ion-row>
        <ion-row class="ion-margin">
          <ion-col
            style="padding-left: 0"
            v-if="adds.length"
            :class="[
              { axAddClass: isAdd },
              axes.length ? 'ion-margin-end' : '',
            ]"
          >
            <ion-title class="text">{{ $t('ADDS') }}</ion-title>
            <Select
              :options="adds"
              :placeholder="$t('SELECT')"
              class="ion-margin-top"
              @isOpen="openAdd"
              v-model="fields.add"
            />
            <span class="required" v-if="errorFields.add">{{
              errorFields.add
            }}</span>
          </ion-col>
          <ion-col
            style="padding-right: 0"
            v-if="axes.length"
            :class="{ axAddClass: isAx }"
          >
            <ion-title class="text">{{ $t('AXES') }}</ion-title>
            <Select
              :options="axes"
              :placeholder="$t('SELECT')"
              class="ion-margin-top"
              @isOpen="openAx"
              v-model="fields.ax"
            />
            <span class="required" v-if="errorFields.ax">{{
              errorFields.ax
            }}</span>
          </ion-col>
        </ion-row>
        <ion-row class="ion-margin">
          <ion-col
            style="padding-left: 0"
            :class="{ cylinderClass: isCylinder }"
            v-if="cylinders.length"
          >
            <ion-title class="text">{{ $t('CYLINDERS') }}</ion-title>
            <Select
              :options="cylinders"
              :placeholder="$t('SELECT')"
              class="ion-margin-top"
              @isOpen="openCylinder"
              v-model="fields.cylinder"
            />
            <span class="required" v-if="errorFields.cylinder">{{
              errorFields.cylinder
            }}</span>
          </ion-col>
          <ion-col
            style="padding-left: 0"
            :class="{ dominantClass: isDominant }"
            v-if="dominants.length"
          >
            <ion-title class="text">{{ $t('DOMINANT') }}</ion-title>
            <Select
              :options="dominants"
              :placeholder="$t('SELECT')"
              class="ion-margin-top"
              @isOpen="openDominant"
              v-model="fields.dominant"
            />
            <span class="required" v-if="errorFields.dominant">{{
              errorFields.dominant
            }}</span>
          </ion-col>
        </ion-row>
        <ion-row
          class="ion-margin ion-justify-content-start ion-align-items-center"
        >
          <ion-label class="text">{{ $t('QUANTITY') }}</ion-label>
          <div class="box ion-margin-start">
            <ion-button size="small" class="button" @click="countOneMinus">
              <ion-icon :icon="minus"></ion-icon>
            </ion-button>
            <ion-label>{{ countOne }}</ion-label>
            <ion-button size="small" class="button" @click="countOnePlus">
              <ion-icon :icon="plus"></ion-icon>
            </ion-button>
          </div>
        </ion-row>
      </div>

      <div v-if="different" class="ion-margin-top ion-padding-top">
        <ion-row class="ion-margin">
          <ion-col
            style="padding-left: 0"
            class="ion-margin-end"
            :class="{ sphereRadiusClassTwo: isSphereTwo }"
            v-if="sphere.length"
          >
            <ion-title class="text">{{ $t('SPHERE') }}</ion-title>
            <Select
              :options="sphere"
              :placeholder="$t('SELECT')"
              class="ion-margin-top"
              @isOpen="openSphereTwo"
              v-model="fieldsTwo.sphere"
            />
            <span class="required" v-if="errorFieldsTwo.sphere">{{
              errorFieldsTwo.sphere
            }}</span>
          </ion-col>
          <ion-col
            style="padding-right: 0"
            :class="{ sphereRadiusClassTwo: isRadiusTwo }"
            v-if="radius.length"
          >
            <ion-title class="text">{{ $t('RADIUS-CURVATURE') }}</ion-title>
            <Select
              :options="radius"
              :placeholder="$t('SELECT')"
              class="ion-margin-top"
              @isOpen="openRadiusTwo"
              v-model="fieldsTwo.radius"
            />
            <span class="required" v-if="errorFieldsTwo.radius">{{
              errorFieldsTwo.radius
            }}</span>
          </ion-col>
        </ion-row>
        <ion-row class="ion-margin">
          <ion-col
            style="padding-left: 0"
            v-if="adds.length"
            :class="[
              { axAddClassTwo: isAddTwo },
              axes.length ? 'ion-margin-end' : '',
            ]"
          >
            <ion-title class="text">{{ $t('ADDS') }}</ion-title>
            <Select
              :options="adds"
              :placeholder="$t('SELECT')"
              class="ion-margin-top"
              @isOpen="openAddTwo"
              v-model="fieldsTwo.add"
            />
            <span class="required" v-if="errorFieldsTwo.add">{{
              errorFieldsTwo.add
            }}</span>
          </ion-col>
          <ion-col
            style="padding-right: 0"
            v-if="axes.length"
            :class="{ axAddClassTwo: isAxTwo }"
          >
            <ion-title class="text">{{ $t('AXES') }}</ion-title>
            <Select
              :options="axes"
              :placeholder="$t('SELECT')"
              class="ion-margin-top"
              @isOpen="openAxTwo"
              v-model="fieldsTwo.ax"
            />
            <span class="required" v-if="errorFieldsTwo.ax">{{
              errorFieldsTwo.ax
            }}</span>
          </ion-col>
        </ion-row>
        <ion-row class="ion-margin">
          <ion-col
            style="padding-left: 0"
            :class="{ cylinderClassTwo: isCylinderTwo }"
            v-if="cylinders.length"
          >
            <ion-title class="text">{{ $t('CYLINDERS') }}</ion-title>
            <Select
              :options="cylinders"
              :placeholder="$t('SELECT')"
              class="ion-margin-top"
              @isOpen="openCylinderTwo"
              v-model="fieldsTwo.cylinder"
            />
            <span class="required" v-if="errorFieldsTwo.cylinder">{{
              errorFieldsTwo.cylinder
            }}</span>
          </ion-col>
          <ion-col
            style="padding-left: 0"
            :class="{ dominantClassTwo: isDominantTwo }"
            v-if="dominants.length"
          >
            <ion-title class="text">{{ $t('DOMINANT') }}</ion-title>
            <Select
              :options="dominants"
              :placeholder="$t('SELECT')"
              class="ion-margin-top"
              @isOpen="openDominantTwo"
              v-model="fieldsTwo.dominant"
            />
            <span class="required" v-if="errorFieldsTwo.dominant">{{
              errorFieldsTwo.dominant
            }}</span>
          </ion-col>
        </ion-row>
        <ion-row
          class="ion-margin ion-justify-content-start ion-align-items-center"
        >
          <ion-label class="text">{{ $t('QUANTITY') }}</ion-label>
          <div class="box ion-margin-start">
            <ion-button size="small" class="button" @click="countTwoMinus">
              <ion-icon :icon="minus"></ion-icon>
            </ion-button>
            <ion-label>{{ countTwo }}</ion-label>
            <ion-button size="small" class="button" @click="countTwoPlus">
              <ion-icon :icon="plus"></ion-icon>
            </ion-button>
          </div>
        </ion-row>
      </div>

      <ion-row class="row">
        <Button :title="$t('APPLY')" class="button" @click="apply" />
      </ion-row>
    </ion-content>
    <Popover button-ok="OK" @handler="closePopover" />
  </ion-page>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import {
  IonPage,
  IonRow,
  IonLabel,
  IonContent,
  IonCol,
  IonTitle,
  IonButton,
  IonIcon
} from '@ionic/vue';
import Header from '@/components/ui/Header.vue';
import Segment from '@/components/ui/Segment.vue';
import Select from '@/components/ui/Select.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { addOutline, removeOutline } from 'ionicons/icons';
import Button from '@/components/ui/Button.vue';
import { discountPrice } from '@/helpers/discountPrice';
import Popover from '@/components/ui/Popover.vue';
import Loading from '@/components/ui/Loading.vue';
import { getMetaProducts } from '@/api/products';
import { checkSelect, checkSelectTwo } from '@/helpers/from';

export default defineComponent({
  name: 'Params',
  components: {
    Popover,
    Button,
    Segment,
    Select,
    Header,
    IonPage,
    IonRow,
    IonLabel,
    IonContent,
    IonCol,
    IonTitle,
    IonButton,
    IonIcon,
    Loading
  },
  props: {
    id: {
      type: String || Number,
      default: ''
    }
  },
  data() {
    return {
      isAx: false,
      isAdd: false,
      isRadius: false,
      isSphere: false,
      isDominant: false,
      isCylinder: false,
      isAxTwo: false,
      isAddTwo: false,
      isRadiusTwo: false,
      isSphereTwo: false,
      isDominantTwo: false,
      isCylinderTwo: false,
      radius: [],
      sphere: [],
      fields: {
        radius: {},
        sphere: {},
        add: {},
        ax: {},
        cylinder: {},
        dominant: {},
      },
      fieldsTwo: {
        radius: {},
        sphere: {},
        add: {},
        ax: {},
        cylinder: {},
        dominant: {}
      },
      adds: [],
      axes: [],
      cylinders: [],
      dominants: [],
      plus: addOutline,
      minus: removeOutline,
      different: false,
      segment: 'left',
      countOne: 1,
      countTwo: 1,
      product: {},
      errorFields: {},
      errorFieldsTwo: {}
    };
  },
  async mounted() {
    this.SET_LOADING(true);
    const meta = await getMetaProducts(this.id);
    await this.getMeta(meta);
    this.SET_LOADING(false);
  },
  computed: {
    ...mapGetters(['products', 'loading']),
    requiredFields() {
      const a = []
      a.push(this.radius.length && !Object.keys(this.fields.radius).length ? 'radius' : '')
      a.push(this.sphere.length && !Object.keys(this.fields.sphere).length ? 'sphere' : '')
      a.push(this.adds.length && !Object.keys(this.fields.add).length ? 'add' : '')
      a.push(this.axes.length && !Object.keys(this.fields.ax).length ? 'ax' : '')
      a.push(this.cylinders.length && !Object.keys(this.fields.cylinder).length ? 'cylinder' : '')
      a.push(this.dominants.length && !Object.keys(this.fields.dominant).length ? 'dominant' : '')
      return a
    },
    requiredFieldsTwo() {
      const a = []
      a.push(this.radius.length && !Object.keys(this.fieldsTwo.radius).length ? 'radius' : '')
      a.push(this.sphere.length && !Object.keys(this.fieldsTwo.sphere).length ? 'sphere' : '')
      a.push(this.adds.length && !Object.keys(this.fieldsTwo.add).length ? 'add' : '')
      a.push(this.axes.length && !Object.keys(this.fieldsTwo.ax).length ? 'ax' : '')
      a.push(this.cylinders.length && !Object.keys(this.fieldsTwo.cylinder).length ? 'cylinder' : '')
      a.push(this.dominants.length && !Object.keys(this.fieldsTwo.dominant).length ? 'dominant' : '')
      return a
    },
  },
  methods: {
    ...mapMutations(['SET_POPOVER', 'SET_ORDER_PRODUCT_DETAILS', 'SET_BASKET_COUNT', 'SET_TOTAL_AMOUNT', 'SET_TOTAL_DISCOUNT', 'SET_LOADING', 'SET_PRODUCTS']),
    ...mapActions(['getProduct']),
    checkSelect,
    checkSelectTwo,
    async apply() {
      if (!this.different && !this.checkSelect()) {
        const product  = await this.getProduct({
          categorie: this.id,
          radius: this.fields.radius,
          sphere: this.fields.sphere,
          cylinder: this.fields.cylinder,
          add: this.fields.add,
          ax: this.fields.ax,
          dominant: this.fields.dominant
        });

        const a = {
          product: product.id,
          categorie: product.categorie,
          radius:product?.radius[0]?.id,
          sphere: product?.sphere[0]?.id,
          cylinder: product?.cylinder[0]?.id,
          add: product?.add[0]?.id,
          ax: product?.ax[0]?.id,
          dominant: product?.dominant[0]?.id,
          product_count: this.countOne,
          product_amount: Number(product.price) * this.countOne,
          product_discount: discountPrice(product.price, product.discount ?? 0) * this.countOne
        };

        this.SET_PRODUCTS(product)
        this.SET_ORDER_PRODUCT_DETAILS(a);
        this.SET_BASKET_COUNT();
        this.SET_TOTAL_AMOUNT();
        this.SET_TOTAL_DISCOUNT();
        this.$router.replace({ name: 'Basket' });

      } else if (this.different && !this.checkSelect() && !this.checkSelectTwo()) {
        const product = await this.getProduct({
          categorie: this.id,
          radius: this.fields.radius,
          sphere: this.fields.sphere,
          cylinder: this.fields.cylinder,
          add: this.fields.add,
          ax: this.fields.ax,
          dominant: this.fields.dominant
        });


        const productTwo = await this.getProduct({
          categorie: this.id,
          radius: this.fieldsTwo.radius,
          sphere: this.fieldsTwo.sphere,
          cylinder: this.fieldsTwo.cylinder,
          add: this.fieldsTwo.add,
          ax: this.fieldsTwo.ax,
          dominant: this.fieldsTwo.dominant
        });
        const a = {
          product: product.id,
          categorie: product.categorie,
          radius:product?.radius[0]?.id,
          sphere: product?.sphere[0]?.id,
          cylinder: product?.cylinder[0]?.id,
          add: product?.add[0]?.id,
          ax: product?.ax[0]?.id,
          dominant: product?.dominant[0]?.id,
          product_count: this.countOne,
          product_amount: Number(product.price) * this.countOne,
          product_discount: discountPrice(product.price, product.discount ?? 0) * this.countOne
        };

        const b = {
          product: productTwo.id,
          categorie: productTwo.categorie,
          radius:productTwo?.radius[0]?.id,
          sphere: productTwo?.sphere[0]?.id,
          cylinder: productTwo?.cylinder[0]?.id,
          add: productTwo?.add[0]?.id,
          ax: productTwo?.ax[0]?.id,
          dominant: productTwo?.dominant[0]?.id,
          product_count: this.countOne,
          product_amount: Number(productTwo.price) * this.countOne,
          product_discount: discountPrice(productTwo.price, productTwo.discount ?? 0) * this.countOne
        };

        this.SET_PRODUCTS(product)
        this.SET_PRODUCTS(productTwo)
        this.SET_ORDER_PRODUCT_DETAILS(a);
        this.SET_ORDER_PRODUCT_DETAILS(b);
        this.SET_BASKET_COUNT();
        this.SET_TOTAL_AMOUNT();
        this.SET_TOTAL_DISCOUNT();
        this.$router.replace({ name: 'Basket' });
      }
    },
    closePopover() {
      this.SET_POPOVER({ show: false, message: [] });
    },
    countOnePlus() {
      this.countOne++;
    },
    countOneMinus() {
      if (this.countOne >= 1) {
        this.countOne--;
      }
    },
    countTwoPlus() {
      this.countTwo++;
    },
    countTwoMinus() {
      if (this.countTwo > 1) {
        this.countTwo--;
      }
    },
    activeSegment(val) {
      if (val === 'right') {
        this.different = true;
      } else {
        this.different = false;
      }
      this.segment = val;
    },
    openSphere(e) {
      this.isSphere = e;
    },
    openRadius(e) {
      this.isRadius = e;
    },
    openCylinder(e) {
      this.isCylinder = e;
    },
    openAx(e) {
      this.isAx = e;
    },
    openAdd(e) {
      this.isAdd = e;
    },
    openDominant(e) {
      this.isDominant = e;
    },
    openSphereTwo(e) {
      this.isSphereTwo = e;
    },
    openRadiusTwo(e) {
      this.isRadiusTwo = e;
    },
    openCylinderTwo(e) {
      this.isCylinderTwo = e;
    },
    openAxTwo(e) {
      this.isAxTwo = e;
    },
    openAddTwo(e) {
      this.isAddTwo = e;
    },
    openDominantTwo(e) {
      this.isDominantTwo = e;
    },
    getMeta(meta) {
      this.radius = meta.radiuses;
      this.sphere = meta.spheres;
      this.adds = meta.adds;
      this.axes = meta.axis;
      this.cylinders = meta.cylinders;
      this.dominants = meta.dominants;
    }
  }
});
</script>

<style scoped lang="scss">
#params {
  ion-content {
    --background: #ffffff;
  }

  .params-content {
    .text {
      text-align: start;
      display: contents;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
    }

    .required {
      color: red;
      font-size: 12px;
      margin: 5px;
    }
    .box {
      background: rgba(77, 172, 151, 0.3);
      border-radius: 2px;
      width: 84px;
      height: 32px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
    }

    .button {
      --background: none;
      color: #1e2023;
      --background-activated: none;
    }

    .button:focus {
      --background: none;
    }

    .sphereRadiusClass {
      margin-bottom: 170px;
    }

    .axAddClass {
      margin-bottom: 170px;
    }

    .cylinderClass {
      margin-bottom: 170px;
    }
    .dominantClass {
      margin-bottom: 170px;
    }
    .sphereRadiusClassTwo {
      margin-bottom: 170px;
    }

    .axAddClassTwo {
      margin-bottom: 170px;
    }

    .cylinderClassTwo {
      margin-bottom: 170px;
    }

    .dominantClassTwo {
      margin-bottom: 170px;
    }
    .row {
      position: relative;
      left: 0;
      right: 0;
      margin: 0 8px;

      .button {
        width: 100%;
      }
    }
  }
}
</style>
