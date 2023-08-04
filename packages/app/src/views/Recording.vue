<template>
  <ion-page id="recording">
    <Header :title="$t('RECORDING-DOCTOR')" contact />
    <ion-content :fullscreen="true">
      <CardInfo
        v-if="previous_recording.date && previous_recording.time"
        :title="$t('RECORDING-DOCTOR-TITLE')"
        :description="formatDate(previous_recording.date, 'DD MMMM YYYY')"
        :subdescription="previous_recording.time"
      />

      <ion-row
        v-if="previous_recording.date && previous_recording.time"
        class="ion-justify-content-center ion-align-items-center"
      >
        <ion-label class="title-new">{{ $t('NEW-RECORDING') }}</ion-label>
      </ion-row>

      <ion-row class="ion-margin">
        <ion-label class="ion-margin-bottom title">{{
          $t('SELECT-DATE')
        }}</ion-label>
        <ion-datetime
          :value="date"
          presentation="date"
          locale="ru-RU"
          size="cover"
          ref="calendar"
          :min="minDate"
          :is-date-enabled="isWeekday"
          :first-day-of-week="1"
          @ionChange="selectDate"
        >
        </ion-datetime>
      </ion-row>

      <ion-row class="ion-margin time" v-if="date">
        <ion-label class="ion-margin-bottom title">{{
          $t('SELECT-TIME')
        }}</ion-label>
        <TimeSelect
          v-if="!loading"
          @select="selectTime"
          :time="time"
          :reserved="reserved"
          :times="times"
        />
        <Skeleton v-if="loading" />
      </ion-row>

      <ion-row class="ion-padding" v-if="date && time">
        <ion-label class="ion-margin-bottom title">{{
          $t('SELECT-SERVICE')
        }}</ion-label>
        <Segment
          :title-left="$t('SPECTACLE-CORRECTION-SELECTION')"
          :title-right="$t('SELECTION-CONTACT-CORRECTION')"
          @change="handlerSegment($event)"
        />
      </ion-row>

      <Button
        :title="$t('CONTINUE')"
        id="next-step"
        class="button-next"
        @click="next"
        :disabled="handlerDisabledButton"
      ></Button>
    </ion-content>
  </ion-page>
</template>

<script lang="js">
import {defineComponent} from 'vue';
import {IonPage, IonContent, IonDatetime, IonLabel, IonRow} from '@ionic/vue';
import Header from '@/components/ui/Header.vue';
import TimeSelect from '@/components/TimeSelect.vue';
import Button from '@/components/ui/Button.vue';
import Segment from '@/components/ui/Segment.vue';
import Skeleton from "@/components/ui/Skeleton.vue";
import CardInfo from "@/components/CardInfo.vue";
import {mapGetters, mapMutations} from "vuex";
import {checkDate, getTime} from "@/api/recording";
import {formatDate} from "@/helpers/formatter";


export default defineComponent({
  name: 'Recording',
  components: {
    CardInfo,
    Skeleton,
    Segment,
    Button,
    TimeSelect,
    IonContent,
    IonPage,
    Header,
    IonLabel,
    IonDatetime,
    IonRow,
  },
  data() {
    return {
      date: null,
      minDate: this.$moment(new Date()).format('YYYY-MM-DD'),
      time: null,
      service: 'Подбор очковой коррекции',
      disabled: false,
      reserved: [],
      times: [],
      loading: false
    }
  },
  computed: {
    ...mapGetters(['previous_recording']),
    handlerDisabledButton() {
      return !(this.time && this.date && this.service)
    }
  },
  watch: {
    previous_recording(oldVal, newVal) {
      if (newVal) {
        this.$refs.calendar.$el.reset()
        this.time = null
        this.date = null
      }
    }
  },
  methods: {
    ...mapMutations(['SET_DATE', 'SET_TIME', 'SET_SERVICE']),
    formatDate,
    selectTime(e) {
      this.time = e
    },
    async selectDate(event) {
      this.loading = true
      this.time = null
      this.date = event.target.value
      if (event.target.value) {
        this.reserved = await checkDate(this.$moment(this.date).format('YYYY-MM-DD'))
        this.loading = false
      }

    },
    handlerSegment(event) {
      if (event === 'left') {
        this.service = this.$t('SPECTACLE-CORRECTION-SELECTION')
      } else {
        this.service = this.$t('SELECTION-CONTACT-CORRECTION')
      }
    },
    isWeekday(dateString) {
      const date = new Date(dateString);
      const utcDay = date.getUTCDay();
      return utcDay !== 0 && utcDay !== 6;
    },
    next() {
      if (this.time && this.date && this.service) {
        this.SET_DATE(this.$moment(this.date).format('YYYY-MM-DD'))
        this.SET_TIME(this.time)
        this.SET_SERVICE(this.service)
        this.$router.push({name: 'CheckRecording'})
      }
      if (!this.date) {
        this.$toast([this.$t('SELECT-DATE')], 4000);
      }
      if (!this.time) {
        this.$toast([this.$t('SELECT-TIME')], 4000);
      }

    }
  },
  async mounted() {
    this.time = null
    this.date = null
    this.times = await getTime()
  },
});
</script>

<style lang="scss">
#recording {
  .title {
    font-weight: 500;
    font-size: 14px;
    line-height: 130%;
    color: #000000;
  }

  .time {
    flex-direction: column;
  }

  .button-next {
    margin: 15px 8px;
  }

  .title-new {
    font-weight: 600;
    font-size: 16px;
    line-height: 130%;
    color: #000000;
  }

  ion-datetime {
    --background: #ffffff;
    border-radius: 5px;
    min-height: 250px;
    --font-size: 11px !important;

    &::part(day) {
      font-weight: 400;
      font-size: 11px !important;
      color: #616161 !important;

      &::after {
        padding: 0;
        padding-inline: 0;
      }
    }

    &::part(day-of-week) {
      font-weight: 400;
      font-size: 11px !important;
      color: #616161 !important;
    }
  }
}
</style>
