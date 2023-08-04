<template>
  <ul class="multiple-buttons">
    <div v-if="!type">
      <li v-for="(option, index) in options" :key="index">
        <label>
          <span>
            {{ $t(option.title) }}
            <img
              src="../assets/icon/close.svg"
              class="img"
              @click="close(option)"
            />
          </span>
        </label>
        <label v-if="type">
          <span>
            {{ options.title }}
            <img src="../assets/icon/close.svg" class="img" />
          </span>
        </label>
      </li>
    </div>

    <li v-if="type && Object.keys(options).length">
      <label>
        <span>
          {{ options.title }}
          <img
            src="../assets/icon/close.svg"
            class="img"
            @click="close(options)"
          />
        </span>
      </label>
    </li>
  </ul>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FilterElement',
  props: {
    options: {
      type: Object,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {},
    },
    type: {
      type: Boolean,
      default: false,
    },
    parent: {
      type: String,
      default: '',
    },
  },
  emits: ['close'],
  methods: {
    close(value) {
      const a = {
        parent: this.parent,
        value: value,
      };
      this.$emit('close', a);
    },
  },
});
</script>

<style scoped lang="scss">
.multiple-buttons {
  padding: 0;
  margin: 0;

  div {
    display: flex;
  }
}

ul {
  list-style: none;
  display: flex;

  li {
    margin: 0 10px 0 0;
    width: max-content;
  }

  label {
    background: #005944;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-bottom: 10px;
    color: #ffffff;

    span {
      padding: 10px;
      user-select: none;
      white-space: nowrap;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .img {
        margin-left: 5px;
      }
    }
  }

  input[type='checkbox'] {
    visibility: hidden;
    display: none;
  }
}
</style>
