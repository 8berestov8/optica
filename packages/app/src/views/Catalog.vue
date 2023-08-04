<template>
  <ion-page>
    <Header :title="$t('CATALOG')" />
    <Loading :is-open="loading" v-if="loading" />
    <Content @refresh="refresh" v-if="!loading">
      <div class="container" style="margin: 5px">
        <ion-row class="ion-nowrap ion-justify-content-between search">
          <ion-searchbar
            class="search"
            :placeholder="$t('CATALOG-SEARCH')"
            @ionFocus="$router.push({ name: 'Search' })"
          ></ion-searchbar>
          <ion-buttons style="padding-bottom: 6px; padding-right: 10px">
            <ion-button class="filter" @click="isFilter = true">
              <ion-icon
                icon="assets/icon/filter.svg"
                class="icon-filter"
              ></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-row>
        <ion-row
          class="ion-margin-start ion-nowrap filter-element"
          v-if="filter"
        >
          <FilterElement
            :options="filter.type"
            parent="type"
            v-if="filter.type.length"
            @close="close"
          />
          <FilterElement
            :options="filter.period"
            parent="period"
            v-if="filter.period.length"
            @close="close"
          />
          <FilterElement
            :options="filter.sphere"
            parent="sphere"
            type
            v-if="Object.keys(filter.sphere).length"
            @close="close"
          />
          <FilterElement
            :options="filter.radius"
            parent="radius"
            type
            v-if="Object.keys(filter.radius).length"
            @close="close"
          />

          <FilterElement
            :options="filter.add"
            parent="add"
            type
            v-if="Object.keys(filter.add).length"
            @close="close"
          />
          <FilterElement
            :options="filter.ax"
            parent="ax"
            type
            v-if="Object.keys(filter.ax).length"
            @close="close"
          />
          <FilterElement
            :options="filter.cylinder"
            parent="cylinder"
            type
            v-if="Object.keys(filter.cylinder).length"
            @close="close"
          />
          <FilterElement
            :options="filter.dominant"
            parent="dominant"
            type
            v-if="Object.keys(filter.dominant).length"
            @close="close"
          />
        </ion-row>

        <div
          class="wrapper"
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
          <Product
            v-for="categorie in categories"
            :key="categorie.id"
            :title="categorie.title"
            :price="categorie.price"
            :img="categorie.image"
            :discount="categorie.discount"
            :type="categorie.type"
            class="product"
            @click="
              $router.push({
                name: 'Categorie',
                params: {
                  id: categorie.id,
                },
              })
            "
          />
        </div>

        <div
          class="wrapper"
          v-if="
            filter.period.length ||
            filter.type.length ||
            Object.keys(filter.sphere).length ||
            Object.keys(filter.radius).length ||
            Object.keys(filter.add).length ||
            Object.keys(filter.ax).length ||
            Object.keys(filter.cylinder).length ||
            Object.keys(filter.dominant).length
          "
        >
          <Product
            v-for="product in products"
            :key="product.id"
            :short_title="product.short_title"
            :price="product.price"
            :img="product.image"
            :discount="product.discount"
            class="product"
            @click="
              $router.push({
                name: 'Categorie',
                params: {
                  id: product.categorie,
                },
              })
            "
          />
        </div>
      </div>
      <FilterModal :show="isFilter" @hide="hide" />
    </Content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonPage,
  IonRow,
  IonButton,
  IonIcon,
  IonButtons,
  IonSearchbar,
} from '@ionic/vue';
import Header from '@/components/ui/Header.vue';
import Product from '@/components/Product.vue';
import FilterModal from '@/components/FilterModal.vue';
import FilterElement from '@/components/FilterElement.vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import Content from '@/components/ui/Content.vue';
import Loading from '@/components/ui/Loading.vue';

export default defineComponent({
  name: 'Catalog',
  components: {
    Loading,
    Content,
    FilterElement,
    FilterModal,
    Product,
    Header,
    IonPage,
    IonRow,
    IonIcon,
    IonButton,
    IonButtons,
    IonSearchbar,
  },
  data() {
    return {
      isFilter: false,
    };
  },
  computed: {
    ...mapGetters(['filter', 'products', 'loading', 'categories']),
  },
  async mounted() {
    this.SET_FILTER({
      type: [],
      period: [],
      sphere: {},
      radius: {},
      add: {},
      ax: {},
      cylinder: {},
      dominant: {},
    });
  },
  methods: {
    ...mapMutations([
      'SET_FILTER',
      'SET_META_PRODUCTS',
      'SET_TYPE',
      'SET_RADIUS',
      'SET_RADIUS',
      'SET_RADIUS',
      'SET_LOADING',
    ]),
    ...mapActions([
      'getProducts',
      'getTypes',
      'getRadius',
      'getSphere',
      'getAdds',
      'getAxes',
      'getCylinders',
      'getDominants',
      'getPeriod',
      'filterProducts',
      'getCategories',
    ]),
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async refresh(complete = () => {}) {
      try {
        await this.getCategories();
        await this.getPeriod();
        await this.getSphere();
        await this.getRadius();
        await this.getTypes();
        await this.getAdds();
        await this.getAxes();
        await this.getCylinders();
        await this.getDominants();
      } finally {
        complete();
      }
    },
    hide() {
      this.isFilter = false;
    },
    close(el: any) {
      this.SET_LOADING(true);
      const a = { ...this.filter };

      if (
        el.parent === 'sphere' ||
        el.parent === 'radius' ||
        el.parent === 'add' ||
        el.parent === 'ax' ||
        el.parent === 'cylinder' ||
        el.parent === 'dominant'
      ) {
        for (let key in a[el.parent]) {
          delete a[el.parent][key];
        }
        //Отправляем на фильтрацию
        this.SET_FILTER(a);
        this.filterProducts();
        this.SET_LOADING(false);
      }

      if (el.parent === 'type' || el.parent === 'period') {
        a[el.parent] = a[el.parent].filter((e: any) => e.id !== el.value.id);
        //Отправляем на фильтрацию
        this.SET_FILTER(a);
        this.filterProducts();
        this.SET_LOADING(false);
      }
    },
  },
});
</script>

<style lang="scss">
.search {
  .searchbar-input-container .sc-ion-searchbar-ios {
    height: 30px !important;
    font-size: 12px !important;
    --background: #ffffff;
  }

  .filter {
    background: #ffffff;
    height: 24px !important;
    width: 24px !important;
    border-radius: 5px !important;

    .icon-filter {
      height: 12px;
      width: 13px;
    }
  }
}

.filter-element {
  overflow-y: auto;
}

.wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 8px;

  .product:after {
    --background: #deeeea;
  }
}
</style>
