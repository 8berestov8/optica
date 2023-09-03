<template>
  <ion-page>
    <Header back>
      <template #search>
        <ion-row class="ion-align-items-center">
          <ion-searchbar
            ref="inputRef"
            :placeholder="$t('CATALOG-SEARCH')"
            class="searchbar"
            v-model="search"
          ></ion-searchbar>
        </ion-row>
      </template>
    </Header>
    <ion-content :fullscreen="true" id="search">
      <Info
        v-if="search.length && !onProducts.length"
        icon="assets/icon/empty.svg"
        :title="$t('SEARCH-EMPTY')"
        :description="$t('SEARCH-EMPTY-DESCRIPTION')"
        @update="update"
      />
      <ion-list class="ion-margin-top list">
        <ion-item
          v-for="catalogie in onProducts"
          :key="catalogie.id"
          @click="
            $router.push({
              name: 'Categorie',
              params: { id: catalogie.id },
            })
          "
        >
          <ion-thumbnail slot="start">
            <ion-img :src="catalogie.image[0].thumbnailUrl" />
          </ion-thumbnail>

          <ion-row class="ion-wrap">
            <!-- <ion-label class="title"> {{ product.title }}</ion-label> -->
            <ion-label class="title">
              {{ catalogie.title }} {{ $t(catalogie.type) }}</ion-label
            >
          </ion-row>
        </ion-item>
      </ion-list>
      <Button
        :title="$t('TO-CATALOG')"
        v-if="search.length && !onProducts.length"
        class="button"
        @click="$router.push({ name: 'Catalog' })"
      />
    </ion-content>
  </ion-page>
</template>

<script lang="js">
import {defineComponent} from 'vue';
import {
  IonPage,
  IonSearchbar,
  IonRow,
  IonList,
  IonItem,
  IonContent,
  IonImg,
  IonThumbnail,
  IonLabel
} from '@ionic/vue';
import Header from '@/components/ui/Header.vue';
import Info from '@/components/ui/Info.vue';
import {mapGetters} from "vuex";
import Button from "@/components/ui/Button.vue";
import {searchProducts} from '@/api/products'

export default defineComponent({
  name: 'Search',
  components: {
    Button,
    Info,
    Header,
    IonPage,
    IonSearchbar,
    IonRow,
    IonList,
    IonItem,
    IonContent,
    IonImg,
    IonThumbnail,
    IonLabel
  },
  data() {
    return {
      search: '',
      products: []
    };
  },
  mounted() {
    setTimeout(() => this.$refs.inputRef.$el.setFocus(), 20);
  },
  computed: {
    ...mapGetters(['products', 'categories']),
    onProducts() {
      return this.search.length
          ? this.searchProducts()
          : this.categories;
    },

  },
  methods: {
    update() {
      this.$router.push({name: 'Catalog'});
      this.search = '';
    },
    searchProducts() {
      searchProducts(this.search).then((data)=> {
        console.log(data);
         this.products = data
      })
      return this.products
    }
  },
});
</script>

<style lang="scss">
.searchbar {
  padding-bottom: 0 !important;
  height: 30px !important;
  border-radius: 5px;

  .searchbar-input-container {
    height: 30px !important;
  }

  .searchbar-input {
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: #000000;
  }
}

#search {
  .list {
    .title {
      text-align: start;
      padding: 0;
      font-weight: 400;
      font-size: 12px;
      line-height: 135%;
    }
  }

  .button {
    position: relative;
    bottom: 60px;
  }
}
</style>
