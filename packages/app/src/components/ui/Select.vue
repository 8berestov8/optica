<template>
  <div class="custom-select" @blur="hide">
    <div class="selected" :class="{ open: open }" @click="show">
      {{ selected }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div v-for="(option, i) of options" :key="i" @click="select(option)">
        {{ option.title }}
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Select',
  props: {
    modelValue: {
      type: Object,
      default: null,
    },
    options: {
      type: Array,
      required: true,
      default: () => [],
    },
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
  },
  emits: ['isOpen', 'update:modelValue'],
  data() {
    return {
      open: false,
    };
  },
  computed: {
    selected() {
      return this.modelValue.title ? this.modelValue.title : this.placeholder;
    },
  },
  methods: {
    show() {
      this.open = !this.open;
      this.$emit('isOpen', this.open);
    },
    hide() {
      this.open = false;
      this.$emit('isOpen', this.open);
    },
    select(option) {
      this.open = false;
      if (typeof option !== 'string') {
        this.$emit('update:modelValue', option);
      }
      this.$emit('isOpen', this.open);
    },
  },
});
</script>

<style scoped>
.custom-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  height: 30px;
  line-height: 30px;
  border-radius: 10px;
}

.custom-select .selected {
  background-color: #ffffff;
  border-radius: 6px;
  border: 1px solid #e7e7e7;
  color: #a9a9a9;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.custom-select .selected.open {
  border: 1px solid #e7e7e7;
  border-radius: 10px;
}

.custom-select .selected:after {
  position: absolute;
  content: '';
  top: 40%;
  right: 1em;
  width: 10px;
  height: 10px;
  background: url('../../assets/icon/check-mark.svg') no-repeat;
}

.custom-select .items {
  color: #a9a9a9;
  margin-top: 10px;
  overflow: auto;
  border: 1px solid #e7e7e7;
  border-radius: 10px;
  background-color: #ffffff;
  height: 138px;
}

.custom-select .items div {
  color: #a9a9a9;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
  display: block;
}

.custom-select .items div:hover {
  background-color: #ffffff;
}

.selectHide {
  display: none;
}
</style>
