<template>
  <Content class="info-wrapper">
    <div class="vector">
      <img :src="icon" />
    </div>
    <div class="text">
      <p class="title">{{ title }}</p>
      <p class="description">{{ description }}</p>
    </div>
  </Content>
</template>

<script>
import { defineComponent } from 'vue';
import Content from './Content.vue';

export default defineComponent({
  name: 'Info',
  props: {
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    button: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update'],
  components: {
    Content,
  },
});
</script>

<style scoped lang="scss">
.info-wrapper {
  .vector {
    background: url('../../assets/image/vector.png');
    background-repeat: no-repeat;
    width: 160px;
    height: 145px;
    margin: 50px auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .text {
    margin: 0 27px;

    .title {
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      text-align: center;
      margin: 0;
    }

    .description {
      font-weight: 400;
      font-size: 14px;
      line-height: 135%;
      text-align: center;
    }
  }
}
</style>
