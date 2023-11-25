<style lang="scss" scoped>
  .container {
    height: 300px;
    white-space: pre-wrap;
  }
</style>
<template>
  <vue-splitter
    class="container"
    v-model:percent="modelPercent"
    :initial-percent="initialPercent"
    :is-horizontal="isHorizontal"
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
import { computed, ref } from 'vue'
import VueSplitter from '../src/vue-splitter.vue'
import { GenLorum } from './Helpers'

const props = withDefaults(defineProps<{
  isHorizontal?: boolean
  percent?: number,
  initialPercent?: number | string,
}>(), {
  isHorizontal: false,
  initialPercent: 50
})

const emit = defineEmits<{
  (event: 'update:percent', value: number): void
}>()

const percent = ref(50)

const modelPercent = computed<number>({
  get() {
    return !isNaN(Number(props.percent)) ? Number(props.percent) : percent.value
  },
  set(value) {
    emit('update:percent', value)
    percent.value = value
  }
})

const lorumipsum = GenLorum()

</script>