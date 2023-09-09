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
            @ionClear="clear"
          ></ion-searchbar>
        </ion-row>
      </template>
    </Header>
    <Loading v-if="loading" />
    <Content id="search" ref="Content" v-if="!loading" scroll>
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
              params: { id: catalogie.categorie_id },
            })
          "
        >
          <ion-thumbnail slot="start">
            <ion-img :src="catalogie?.image[0]?.thumbnailUrl" />
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
    </Content>
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
  IonImg,
  IonThumbnail,
  IonLabel
} from '@ionic/vue';
import Header from '@/components/ui/Header.vue';
import Loading from '@/components/ui/Loading.vue';
import Info from '@/components/ui/Info.vue';
import {mapGetters} from "vuex";
import Button from "@/components/ui/Button.vue";
import Content from '@/components/ui/Content.vue';

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
    IonImg,
    IonThumbnail,
    IonLabel,
    Loading,
    Content
  },
  data() {
    return {
      search: '',
      loading: false,
      isEnd: false,
      loadingScroll: false,
      page: 1,
    };
  },
  mounted() {
    setTimeout(() => this.$refs.inputRef.$el.setFocus(), 20);
  },
  computed: {
    ...mapGetters(['filter_products', 'categories']),
    onProducts() {
      return this.search.length
          ? this.categories.filter((categorie) =>
          categorie.title.toLowerCase().includes(this.search.toLowerCase())
          )
          : this.categories;
    },

  },
  methods: {
    update() {
      this.$router.push({name: 'Catalog'});
      this.search = '';
    },
    clear() {
      this.search = ''
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
