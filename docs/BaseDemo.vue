<style lang="scss" scoped>
  .container {
    height: 300px;
    white-space: pre-wrap;
  }
</style>
<template>
  <vue-splitter
    class="container"
    v-model:percent="compPercent"
    :is-horizontal="isHorizontal"
    :initial-percent="initialPercent"
  >
    <template #left-pane>
      <slot name="left-pane">
        {{lorumipsum}}
      </slot>
    </template>
    <template #right-pane>
      <slot name="right-pane">
        {{lorumipsum}}
      </slot>
    </template>
  </vue-splitter>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import VueSplitter from '../src/vue-splitter.vue'
import { GenLorum } from './Helpers'

const props = defineProps({
  isHorizontal: {
    type: Boolean,
    default: false,
  },
  percent: {
    type: Number
  },
  initialPercent: {
    default: null
  }
})
const emit = defineEmits(['update:percent'])

const modelPercent = ref(0)

const compPercent = computed<number>({
  get() {
    return props.percent || modelPercent.value
  },
  set(val) {
    emit('update:percent', val)
    modelPercent.value = val
  }
})

if (props.initialPercent) {
  compPercent.value = props.initialPercent
}

const lorumipsum = GenLorum()
</script>