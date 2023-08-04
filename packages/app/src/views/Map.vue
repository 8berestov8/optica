<template>
  <ion-page>
    <Header back :title="$t('LOCATION')" />
    <ion-content :scroll-y="false">
      <div class="map">
        <yandex-map
          :coords="[lat, lng]"
          :controls="['zoomControl', 'geolocationControl']"
          :zoom="18"
        >
          <ymap-marker
            marker-id="123"
            :coords="[lat, lng]"
            :marker-events="['click']"
            :icon="markerIcon"
          ></ymap-marker>
        </yandex-map>
        <div class="info-box">
          <span class="text">{{ $t('MAP-TEXT') }}</span>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import Header from '@/components/ui/Header.vue';
import { yandexMap, ymapMarker } from 'vue-yandex-maps';

export default defineComponent({
  name: 'Map',
  components: {
    Header,
    IonPage,
    IonContent,
    yandexMap,
    ymapMarker,
  },
  data() {
    return {
      lat: 43.168753,
      lng: 131.934991,
      markerIcon: {
        layout: 'default#imageWithContent',
        imageHref: 'assets/icon/marker.svg',
        imageSize: [24, 28],
        imageOffset: [0, 0],
        contentOffset: [0, 15],
      },
    };
  },
});
</script>

<style scoped lang="scss">
.map {
  width: 100%;
  height: 100%;

  .ymap-container {
    height: 100%;
    z-index: 1;
  }
  .info-box {
    height: 70px;
    background: #ffffff;
    box-shadow: 0px 2px 16px rgba(209, 209, 209, 0.25);
    position: absolute;
    z-index: 99999;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .text {
      font-size: 14px;
      line-height: 17px;
    }
  }
}
</style>
